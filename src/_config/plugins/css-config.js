import fs from "node:fs/promises";
import path from "node:path";
import postcss from "postcss";
import cssnano from "cssnano";

export const cssConfig = (eleventyConfig) => {
  eleventyConfig.addTemplateFormats("css");

  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async (inputContent, inputPath) => {
      return async () => {
        const result = await postcss([cssnano]).process(inputContent, { from: inputPath });
        return result.css;
      }
    }
  });
};
