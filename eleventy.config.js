import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

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
  eleventyConfig.addPlugin(plugins.cssConfig);
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    preAttributes: { tabindex: 0 }
  });

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
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

  /*
   * collections
   */
  eleventyConfig.addCollection("blog", collections.blog);
  eleventyConfig.addCollection("stream", collections.stream);
  eleventyConfig.addCollection("tags", collections.tags);

  /*
   * layout aliases
   */
  eleventyConfig.addLayoutAlias("base", "base.njk");
  eleventyConfig.addLayoutAlias("page", "page.njk");
  eleventyConfig.addLayoutAlias("post", "page.njk");
  eleventyConfig.addLayoutAlias("home", "home.njk");

  /*
   * passthrough file copy
   */
  ["src/assets/images"].forEach(path => {
    eleventyConfig.addPassthroughCopy(path)
  });

  eleventyConfig.addPassthroughCopy({
    // copy favicon to root
    "src/assets/favicon/*": "/"
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
