import { tags } from "./collections/tags.js";

// Every generated page, not every source file. The glob this replaced returned
// one item per template, so `topic.njk` — which paginates the tags into a
// page each — contributed a single entry pointing at the first of them, and
// the other topic pages never reached the sitemap. `getAll()` expands pagination.
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

// Projects carry a year and an optional month rather than a date, because an
// old project rarely has a day to its name. Oldest first like the other two
// collections, so templates reverse all three the same way. A missing month
// sorts as 0, which puts it after the dated projects of its year once reversed.
export const making = (collection) => {
  const sortKey = (item) => item.data.year * 100 + (item.data.month || 0);
  return [...collection.getFilteredByGlob('./src/making/*.md')]
    .sort((a, b) => sortKey(a) - sortKey(b));
};

export const unified = (collection) => {
  const writingPosts = collection.getFilteredByGlob('./src/writing/*.md');
  const thinkingPosts = collection.getFilteredByGlob('./src/thinking/*.md');
  return [...writingPosts, ...thinkingPosts].sort((a, b) => a.date - b.date);
};

export default { writing, thinking, making, tags, sitemap, unified };


