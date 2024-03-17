export default class SortableTable {
  element;

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createCommonTemplate();
    this.subElements = this.getSubElements(this.element);
  }

  getSubElements(element) {
    const result = {};
    const elements = element.querySelectorAll('[data-element]');
    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }

    return result;
  }

  createCommonTemplate() {
    const productsContainer = document.createElement('div');
    productsContainer.setAttribute('data-element', 'productsContainer');
    productsContainer.classList.add('products-list__container');
    productsContainer.innerHTML = `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.createCellHeaderTemplate()}
          </div>
          <div data-element="body" class="sortable-table__body">
            ${this.createBodyTemplate(this.data)}
          </div>
        </div>
      </div>
    `;
    return productsContainer;
  }

  createCellHeaderTemplate() {
    return this.headerConfig.map(({id, title, sortable}) => {
      return `
        <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
          <span>${title}</span>
          ${title === 'Name' ? `<span data-element="arrow" class="sortable-table__sort-arrow">
            <span class="sort-arrow"></span>
          </span>` : ''}
        </div>
      `;
    }).join('');
  }

  createBodyTemplate(data) {
    return data.map(rowData =>
      `<div class="row">
        ${this.headerConfig.map(config => this.createBodyColumnTemplate(config, rowData)).join('')}
      </div>`
    ).join('');
  }

  createBodyColumnTemplate(config, rowData) {
    if (config.template) {
      return config.template(rowData);
    }
    return `<div class="sortable-table__cell">${rowData[config.id]}</div>`;
  }

  sort(fieldValue, optionValue) {
    const k = optionValue === 'asc' ? 1 : -1;
    if (fieldValue === 'image') {
      return;
    }
    const sortedData = [...this.data].sort((a, b) => {
      const keyA = a[fieldValue];
      const keyB = b[fieldValue];

      const sortType = this.headerConfig.find(headerItem => headerItem.id === fieldValue)?.sortType;

      if (sortType === 'number') {
        return (keyA - keyB) * k;
      } else if (sortType === 'string') {
        return k * keyA.localeCompare(keyB, ['ru', 'en'], {caseFirst: 'upper'});
      }
    });
    this.update(sortedData);
  }

  update(sortedData) {
    this.data = sortedData;
    const { body } = this.subElements;
    body.innerHTML = this.createBodyTemplate(sortedData);
  }

  destroy() {
    this.element.remove();
  }
}
