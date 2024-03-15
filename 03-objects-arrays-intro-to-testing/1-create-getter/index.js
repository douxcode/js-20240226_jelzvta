/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const paths = path.split('.');
  return function(obj) {
    for (path of paths) {
      if (!obj?.hasOwnProperty(path)) {
        return;
      }
      obj = obj[path];
    }
    return obj;
  };
}
