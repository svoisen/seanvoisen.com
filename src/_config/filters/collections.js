export const head = (array, n) => {
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }

  if (n < 0) {
    return array.slice(n);
  }

  return array.slice(0, n);
};

// Support nested properties like "data.title"
const valueAt = (item, key) => key.split('.').reduce((val, k) => val?.[k], item);

export const filter = (array, key, value) => {
  return array.filter(item => valueAt(item, key) === value);
}
