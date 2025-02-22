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

export const blog = (collection) => {
  return [...collection.getFilteredByGlob('./src/blog/*.md')];
};

export default { blog, stream, tags, sitemap, notes };


