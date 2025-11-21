import { tags } from "./collections/tags.js";

export const sitemap = (collection) => {
  return collection.getFilteredByGlob("./src/**/*.{md,njk}");
};

export const stream = (collection) => {
  return [...collection.getFilteredByGlob('./src/stream/*.md')];
};

export const notes = (collection) => {
  return [...collection.getFilteredByGlob('./src/notes/*.md')];
};

export const writing = (collection) => {
  return [...collection.getFilteredByGlob('./src/writing/*.md')];
};

export default { writing, stream, tags, sitemap, notes };


