import markdownIt from "markdown-it";
import implicitFigures from "markdown-it-image-figures";
import { asidePlugin } from "@humanwhocodes/markdown-it-markua-aside";

export const markdownLib = markdownIt({
  html: true,
  linkify: true,
  typographer: true
}).use(implicitFigures, {
  figcaption: true
}).use(asidePlugin);

