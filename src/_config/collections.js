import { blog } from "./collections/blog.js";
import { stream } from "./collections/stream.js";
import { tags } from "./collections/tags.js";

export const sitemap = (collection) => {
  return collection.getFilteredByGlob("./src/**/*.{md,njk}");
};

export default { blog, stream, tags, sitemap };


