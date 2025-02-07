import postcss from "postcss";
import cssnano from "cssnano";
import { DateTime } from "luxon";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import markdownIt from "markdown-it";
import implicitFigures from "markdown-it-image-figures";

export default async function(eleventyConfig) {
  const md = markdownIt({
    html: true
  }).use(implicitFigures, {
    figcaption: true
  });

  eleventyConfig.setLibrary("md", md);

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

  eleventyConfig.addPairedShortcode("postcss",
    async code => {
      return await postcss([cssnano]).process(code, { from: undefined }).then(result => result.css);
    });

  /**
   * Filters
   */

  eleventyConfig.addFilter("w3Date", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
  });

  eleventyConfig.addFilter("htmlDate", (dateObj) => {
    // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }

    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addFilter("slice", (array, start, end) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }

    return array.slice(start, end);
  });

  eleventyConfig.addWatchTarget("./css/");

  eleventyConfig.addCollection('blog', (collection) => {
    return [...collection.getFilteredByGlob('./content/blog/*.md')].reverse();
  });

  eleventyConfig.addCollection('stream', (collection) => {
    return [...collection.getFilteredByGlob('./content/stream/*.md')].reverse();
  });

  eleventyConfig.addCollection('tagList', (collection) => {
    let tagSet = new Set();
    collection
      .getAllSorted()
      .forEach(function (item) {
        if ("tags" in item.data) {
          let tags = item.data.tags;
          if (typeof tags === "string") {
            tags = [tags];
          }

          tags = tags.filter(function (item) {
            switch (item) {
              // this list should match the `filter` list in tags.njk
              case "all":
              case "nav":
              case "post":
              case "posts":
                return false;
            }

            return true;
          });

          for (const tag of tags) {
            tagSet.add(tag);
          }
        }
      });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet].sort();
  });

  /**
   * Passthroughs
   */
  eleventyConfig.addPassthroughCopy({
    "./content/assets": "/assets"
  });

  eleventyConfig.addPassthroughCopy({
    "./content/assets/favicon/favicon.ico": "/"
  });

  /**
   * Bundles
   */
  eleventyConfig.addBundle("css", {
    toFileDirectory: "dist"
  });

  eleventyConfig.addBundle("js", {
    toFileDirectory: "dist"
  });

  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    preAttributes: { tabindex: 0 }
  });
}

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
    input: "content",          
    includes: "../_includes",
    data: "../_data", 
    output: "_site"
  },
}
