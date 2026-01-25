import { tags } from "./collections/tags.js";

export const sitemap = (collection) => {
  return collection.getFilteredByGlob("./src/**/*.{md,njk}");
};

export const thinking = (collection) => {
  return [...collection.getFilteredByGlob('./src/thinking/*.md')];
};

export const notes = (collection) => {
  return [...collection.getFilteredByGlob('./src/notes/*.md')];
};

export const writing = (collection) => {
  return [...collection.getFilteredByGlob('./src/writing/*.md')];
};

export const moonpointing = (collection) => {
  return [...collection.getFilteredByGlob('./src/moonpointing/*.md')];
};

export const unified = (collection) => {
  const writingPosts = collection.getFilteredByGlob('./src/writing/*.md');
  const thinkingPosts = collection.getFilteredByGlob('./src/thinking/*.md');
  return [...writingPosts, ...thinkingPosts].sort((a, b) => a.date - b.date);
};

export default { writing, thinking, tags, sitemap, notes, unified, moonpointing };


