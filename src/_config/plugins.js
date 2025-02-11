import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import rss from "@11ty/eleventy-plugin-rss";
import { markdownLib } from "./plugins/markdown.js";

export default { markdownLib, rss, syntaxHighlight, eleventyImageTransformPlugin };


