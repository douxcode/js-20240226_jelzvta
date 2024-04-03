import escapeHtml from './utils/escape-html.js';
import fetchJson from './utils/fetch-json.js';

const IMGUR_CLIENT_ID = '28aaa2e823b03b1';
const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ProductForm {
  element = document.createElement('div');
  subElements = {};
  product;
  constructor (productId = '') {
    this.productId = productId;
    this.element.classList.add('product-form');
    this.render();
    this.getSubElements();
  }
  getSubElements() {
    this.element.querySelectorAll('[data-element]').forEach((element) => {
      this.subElements[element.dataset.element] = element;
    });
  }

  async fetchProductData() {
    if (this.productId) {
      const data = await fetchJson(`${BACKEND_URL}/api/rest/products?id=${this.productId}`);
      if (data && data.length > 0) {
        this.product = data[0];
      }
    }
  }

  async render() {
    await this.fetchProductData();
    const formTemplate = this.createFormTemplate(this.product);
    this.element.innerHTML = formTemplate;
    return this.element;
  }

  createFormTemplate() {
    const {title, description, price, discount, quantity, status} = this.product;
    return `<form data-element="productForm" class="form-grid">
      <div class="form-group form-group__half_left">
        <fieldset>
          <label class="form-label">Название товара</label>
          <input required="" type="text" name="title" class="form-control" value="${escapeHtml(title)}" placeholder="Название товара">
        </fieldset>
      </div>
      <div class="form-group form-group__wide">
        <label class="form-label">Описание</label>
        <textarea required="" class="form-control" name="description" data-element="productDescription" placeholder="Описание товара">${escapeHtml(description)}</textarea>
      </div>
      <div class="form-group form-group__wide" data-element="sortable-list-container">
        <label class="form-label">Фото</label>
        <div data-element="imageListContainer"><ul class="sortable-list"><li class="products-edit__imagelist-item sortable-list__item" style="">
          <input type="hidden" name="url" value="https://i.imgur.com/MWorX2R.jpg">
          <input type="hidden" name="source" value="75462242_3746019958756848_838491213769211904_n.jpg">
          <span>
        <img src="icon-grab.svg" data-grab-handle="" alt="grab">
        <img class="sortable-table__cell-img" alt="Image" src="https://i.imgur.com/MWorX2R.jpg">
        <span>75462242_3746019958756848_838491213769211904_n.jpg</span>
      </span>
          <button type="button">
            <img src="icon-trash.svg" data-delete-handle="" alt="delete">
          </button></li></ul></div>
        <button type="button" name="uploadImage" class="button-primary-outline"><span>Загрузить</span></button>
      </div>
      <div class="form-group form-group__half_left">
        <label class="form-label">Категория</label>
        <select class="form-control" name="subcategory">
          <option value="progulki-i-detskaya-komnata">Детские товары и игрушки &gt; Прогулки и детская комната</option>
          <option value="kormlenie-i-gigiena">Детские товары и игрушки &gt; Кормление и гигиена</option>
          <option value="igrushki-i-razvlecheniya">Детские товары и игрушки &gt; Игрушки и развлечения</option>
          <option value="aktivniy-otdyh-i-ulitsa">Детские товары и игрушки &gt; Активный отдых и улица</option>
          <option value="radioupravlyaemye-modeli">Детские товары и игрушки &gt; Радиоуправляемые модели</option>
          <option value="shkolnye-tovary">Детские товары и игрушки &gt; Школьные товары</option>
          <option value="noutbuki-i-aksessuary">Компьютерная техника &gt; Ноутбуки и аксессуары</option>
          <option value="monitory">Компьютерная техника &gt; Мониторы</option>
          <option value="komplektuyuschie">Компьютерная техника &gt; Комплектующие</option>
          <option value="setevoe-oborudovanie">Компьютерная техника &gt; Сетевое оборудование</option>
          <option value="vstraivaemaya-tehnika">Крупная бытовая техника &gt; Встраиваемая техника</option>
          <option value="stiralnye-mashiny">Крупная бытовая техника &gt; Стиральные машины</option>
          <option value="sushilnye-mashiny">Крупная бытовая техника &gt; Сушильные машины</option>
          <option value="holodilniki">Крупная бытовая техника &gt; Холодильники</option>
          <option value="morozilnye-kamery">Крупная бытовая техника &gt; Морозильные камеры</option>
          <option value="vinnye-shkafy">Крупная бытовая техника &gt; Винные шкафы</option>
          <option value="vytyazhki">Крупная бытовая техника &gt; Вытяжки</option>
          <option value="plity">Крупная бытовая техника &gt; Плиты</option>
          <option value="posudomoechnye-mashiny">Крупная бытовая техника &gt; Посудомоечные машины</option>
          <option value="melkaya-bytovaya-tehnika">Крупная бытовая техника &gt; Мелкая бытовая техника</option>
          <option value="mikrovolnovye-pechi">Крупная бытовая техника &gt; Микроволновые печи</option>
          <option value="elektroduhovki">Крупная бытовая техника &gt; Электродуховки</option>
          <option value="uborochnye-mashiny">Крупная бытовая техника &gt; Уборочные машины</option>
          <option value="paroochistiteli">Крупная бытовая техника &gt; Пароочистители</option>
          <option value="kulery-i-purifayery">Крупная бытовая техника &gt; Кулеры и пурифайеры</option>
          <option value="kuhnya">Мелкая бытовая техника &gt; Кухня</option>
          <option value="bytovye-pribory-dlya-doma">Мелкая бытовая техника &gt; Бытовые приборы для дома</option>
          <option value="krasota-i-gigiena">Мелкая бытовая техника &gt; Красота и гигиена</option>
          <option value="lcd-televizory">ТВ и видеотехника &gt; LCD телевизоры</option>
          <option value="podstavki-i-krepleniya">ТВ и видеотехника &gt; Подставки и крепления</option>
          <option value="mediapleery">ТВ и видеотехника &gt; Медиаплееры</option>
          <option value="tv-tyunery">ТВ и видеотехника &gt; ТВ тюнеры</option>
          <option value="tv-antenny">ТВ и видеотехника &gt; ТВ антенны</option>
          <option value="3d-ochki">ТВ и видеотехника &gt; 3D очки</option>
          <option value="ochki-virtualnoy-realnosti">ТВ и видеотехника &gt; Очки виртуальной реальности</option>
          <option value="proektsionnoe-oborudovanie">ТВ и видеотехника &gt; Проекционное оборудование</option>
          <option value="videokamery-i-aksessuary">ТВ и видеотехника &gt; Видеокамеры и аксессуары</option>
          <option value="dvd/blu-ray-pleery">ТВ и видеотехника &gt; DVD/Blu-ray плееры</option>
        </select>
      </div>
      <div class="form-group form-group__half_left form-group__two-col">
        <fieldset>
          <label class="form-label">Цена ($)</label>
          <input value="${price}" required="" type="number" name="price" class="form-control" placeholder="100">
        </fieldset>
        <fieldset>
          <label class="form-label">Скидка ($)</label>
          <input value="${discount}" required="" type="number" name="discount" class="form-control" placeholder="0">
        </fieldset>
      </div>
      <div class="form-group form-group__part-half">
        <label value="${quantity}" class="form-label">Количество</label>
        <input required="" type="number" class="form-control" name="quantity" placeholder="1">
      </div>
      <div class="form-group form-group__part-half">
        <label class="form-label">Статус</label>
        <select class="form-control" name="status">
          <option value="1">Активен</option>
          <option value="0">Неактивен</option>
        </select>
      </div>
      <div class="form-buttons">
        <button type="submit" name="save" class="button-primary-outline">
          Сохранить товар
        </button>
      </div>
    </form>`;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
