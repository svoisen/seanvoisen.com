import filters from "./src/_config/filters.js";
import collections from "./src/_config/collections.js";
import plugins from "./src/_config/plugins.js";

export default async function(eleventyConfig) {
  /*
   * libraries
   */
  eleventyConfig.setLibrary("md", plugins.markdownLib);

  /*
   * watch targets
   */
  eleventyConfig.addWatchTarget("./src/assets/**/*.{css,js,webp,svg,png,jpg}");

  /*
   * plugins
   */
  eleventyConfig.addPlugin(plugins.wordStats);
  eleventyConfig.addPlugin(plugins.rss);
  eleventyConfig.addPlugin(plugins.syntaxHighlight, {
    preAttributes: { tabindex: 0 }
  });

  eleventyConfig.addPlugin(plugins.eleventyImageTransformPlugin, {
    extensions: 'html',
    formats: ['webp'],
    widths: ['auto', 1280, 800, 640],
    htmlOptions: {
      imgAttributes: {
        loading: 'lazy',
        decoding: 'async'
      },
    },
  });

  /*
   * bundles
   */
  eleventyConfig.addBundle('css', { hoist: true });

  /*
   * filters
   */
  eleventyConfig.addFilter("w3Date", filters.w3Date);
  eleventyConfig.addFilter("htmlDate", filters.htmlDate);
  eleventyConfig.addFilter("head", filters.head);
  eleventyConfig.addFilter("slice", filters.slice);
  eleventyConfig.addFilter("filter", filters.filter);
  eleventyConfig.addFilter("postcss", filters.postCssFilter);
  eleventyConfig.addFilter("titlecase", filters.titlecase);
  eleventyConfig.addFilter("navigationItems", filters.navigationItems);
  eleventyConfig.addFilter("directoryItems", filters.directoryItems);
  eleventyConfig.addFilter("getDescription", filters.getDescription);
  eleventyConfig.addFilter("stars", filters.stars);

  /*
   * collections
   */
  eleventyConfig.addCollection("blog", collections.blog);
  eleventyConfig.addCollection("stream", collections.stream);
  eleventyConfig.addCollection("tags", collections.tags);
  eleventyConfig.addCollection("sitemap", collections.sitemap);
  eleventyConfig.addCollection("notes", collections.notes);

  /*
   * layout aliases
   */
  eleventyConfig.addLayoutAlias("base", "base.njk");
  eleventyConfig.addLayoutAlias("page", "page.njk");
  eleventyConfig.addLayoutAlias("post", "post.njk");
  eleventyConfig.addLayoutAlias("home", "home.njk");
  eleventyConfig.addLayoutAlias("note", "note.njk");
  eleventyConfig.addLayoutAlias("atom", "atom.njk");

  /*
   * passthrough file copy
   */
  ["src/assets/images"].forEach(path => {
    eleventyConfig.addPassthroughCopy(path)
  });

  eleventyConfig.addPassthroughCopy({
    // copy favicon to root
    "src/assets/favicon/*": "/",
    // copy _redirects file to root
    "_redirects": "/"
  });
}

/*
 * basic config
 */
export const config = {
  templateFormats: [
    "md",
    "njk",
    "html"
  ],

  markdownTemplateEngine: "njk",
  dataTemplateEngine: "njk",
  htmlTemplateEngine: "njk",

  dir: {
    input: "src",          
    output: "dist",
    includes: "_includes",
    data: "_data", 
    layouts: "_layouts"
  }
};


