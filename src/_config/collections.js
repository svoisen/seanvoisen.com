import { tags } from "./collections/tags.js";

// Every generated page, not every source file. The glob this replaced returned
// one item per template, so `topic.njk` — which paginates the tags into 22
// pages — contributed a single entry pointing at the first of them, and the
// other 21 topic pages never reached the sitemap. `getAll()` expands pagination.
// Feeds, robots and the sitemap itself stay out through
// `eleventyExcludeFromCollections`, and the template filters on
// `excludeFromSitemap` besides.
export const sitemap = (collection) => {
  return collection.getAll();
};

export const thinking = (collection) => {
  return [...collection.getFilteredByGlob('./src/thinking/*.md')];
};

export const writing = (collection) => {
  return [...collection.getFilteredByGlob('./src/writing/*.md')];
};

export const unified = (collection) => {
  const writingPosts = collection.getFilteredByGlob('./src/writing/*.md');
  const thinkingPosts = collection.getFilteredByGlob('./src/thinking/*.md');
  return [...writingPosts, ...thinkingPosts].sort((a, b) => a.date - b.date);
};

export default { writing, thinking, tags, sitemap, unified };


