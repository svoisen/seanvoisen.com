import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import rss from "@11ty/eleventy-plugin-rss";
import { markdownLib } from "./plugins/markdown.js";
import { cssConfig } from "./plugins/css-config.js";

export default { markdownLib, cssConfig, rss, syntaxHighlight, eleventyImageTransformPlugin };


