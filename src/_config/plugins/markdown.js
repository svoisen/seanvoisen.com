import markdownIt from "markdown-it";
import implicitFigures from "markdown-it-image-figures";
import footnote from "markdown-it-footnote";
import { asidePlugin } from "@humanwhocodes/markdown-it-markua-aside";

export const markdownLib = markdownIt({
  html: true,
  linkify: true,
  typographer: true
}).use(implicitFigures, {
  figcaption: true
}).use(footnote).use(asidePlugin);

// Bare numerals in the reference and the list, not markdown-it-footnote's
// default bracketed "[1]".
markdownLib.renderer.rules.footnote_caption = (tokens, idx) => {
  const { id, subId } = tokens[idx].meta;
  return `${id + 1}${subId > 0 ? `:${subId}` : ""}`;
};
