import markdownIt from "markdown-it";
import implicitFigures from "markdown-it-image-figures";

export const markdownLib = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
}).use(implicitFigures, {
  figcaption: true
});

