import filters from "./src/_config/filters.js";
import collections from "./src/_config/collections.js";
import plugins from "./src/_config/plugins.js";
import images from "./src/_config/images.js";

export default async function(eleventyConfig) {
  /*
   * libraries
   */
  eleventyConfig.setLibrary("md", plugins.markdownLib);

  /*
   * watch targets
   */
  eleventyConfig.addWatchTarget("./src/assets/**/*.{css,js,webp,svg,png,jpg,woff2}");

  /*
   * held back from launch
   *
   * The work section — the /work/ résumé index and the page each role gets —
   * is written but not shipping yet. Ignoring the templates keeps every file
   * in the repo and out of the build: `collections.workHistory` comes back
   * empty, so nothing that reads it can render, and the sitemap, which globs
   * the input directory for its collection, cannot list what was never built.
   *
   * The collection, the layout and the work-list macro are all left
   * registered. They cost nothing while the glob finds no files, and leaving
   * them means bringing the section back is a deletion rather than a rebuild.
   *
   * To bring it back: delete the two `ignores` lines below, uncomment the WORK
   * section in src/pages/home.njk, drop `"inDirectory": false` from the Work
   * entry in src/_data/navigation.json, and restore the résumé link in the
   * last paragraph of src/pages/about.md.
   */
  eleventyConfig.ignores.add("src/work/*.md");
  eleventyConfig.ignores.add("src/pages/work.njk");

  /*
   * plugins
   */
  eleventyConfig.addPlugin(plugins.wordStats, {
    output: function (stats) {
      return stats.text;
    }
  });
  eleventyConfig.addPlugin(plugins.rss);
  eleventyConfig.addPlugin(plugins.syntaxHighlight, {
    preAttributes: { tabindex: 0 }
  });

  eleventyConfig.addPlugin(plugins.eleventyImageTransformPlugin, {
    extensions: 'html',
    ...images.imageOptions,
    htmlOptions: {
      imgAttributes: {
        loading: 'lazy',
        decoding: 'async'
      },
    },
  });

  /*
   * images referenced only by already-delivered newsletter emails
   */
  eleventyConfig.on("eleventy.before", images.generateOrphanedImages);

  /*
   * bundles
   */
  eleventyConfig.addBundle('css', { hoist: true });

  /*
   * filters
   */
  eleventyConfig.addFilter("w3Date", filters.w3Date);
  eleventyConfig.addFilter("htmlDate", filters.htmlDate);
  eleventyConfig.addFilter("monthYear", filters.monthYear);
  eleventyConfig.addFilter("head", filters.head);
  eleventyConfig.addFilter("slice", filters.slice);
  eleventyConfig.addFilter("filter", filters.filter);
  eleventyConfig.addFilter("reject", filters.reject);
  eleventyConfig.addFilter("postcss", filters.postCssFilter);
  eleventyConfig.addFilter("titlecase", filters.titlecase);
  eleventyConfig.addFilter("navigationItems", filters.navigationItems);
  eleventyConfig.addFilter("directoryItems", filters.directoryItems);
  eleventyConfig.addFilter("getDescription", filters.getDescription);
  eleventyConfig.addFilter("stars", filters.stars);
  eleventyConfig.addFilter("genRSSId", filters.genRSSId);

  /*
   * collections
   */
  eleventyConfig.addCollection("writing", collections.writing);
  eleventyConfig.addCollection("thinking", collections.thinking);
  eleventyConfig.addCollection("workHistory", collections.workHistory);
  eleventyConfig.addCollection("tags", collections.tags);
  eleventyConfig.addCollection("sitemap", collections.sitemap);
  eleventyConfig.addCollection("unified", collections.unified);

  /*
   * layout aliases
   */
  eleventyConfig.addLayoutAlias("base", "base.njk");
  eleventyConfig.addLayoutAlias("page", "page.njk");
  eleventyConfig.addLayoutAlias("post", "post.njk");
  eleventyConfig.addLayoutAlias("home", "home.njk");
  eleventyConfig.addLayoutAlias("work", "work.njk");
  eleventyConfig.addLayoutAlias("atom", "atom.njk");

  /*
   * passthrough file copy
   */
  eleventyConfig.addPassthroughCopy({"src/assets/fonts": "assets/fonts"});
  eleventyConfig.addPassthroughCopy({"src/assets/images/og": "assets/images/og"});

  eleventyConfig.addPassthroughCopy({
    "src/assets/favicon/*": "/",
    "_redirects": "/",
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


