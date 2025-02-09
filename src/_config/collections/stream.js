export const stream = (collection) => {
  return [...collection.getFilteredByGlob('./src/stream/*.md')];
};
