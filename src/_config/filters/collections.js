export const head = (array, n) => {
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }

  if (n < 0) {
    return array.slice(n);
  }

  return array.slice(0, n);
};

export const slice = (array, start, end) => {
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }

  return array.slice(start, end);
};

export const filter = (array, key, value) => {
  return array.filter(item => {
    // Support nested properties like "data.featured"
    const keys = key.split('.');
    let val = item;
    for (const k of keys) {
      val = val?.[k];
    }
    return val === value;
  });
}
