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

export const unified = (collection) => {
  const writingPosts = collection.getFilteredByGlob('./src/writing/*.md');
  const streamPosts = collection.getFilteredByGlob('./src/stream/*.md');
  return [...writingPosts, ...streamPosts].sort((a, b) => b.date - a.date);
};

export default { writing, stream, tags, sitemap, notes, unified };


