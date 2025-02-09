export const blog = (collection) => {
  return [...collection.getFilteredByGlob('./src/blog/*.md')];
};
