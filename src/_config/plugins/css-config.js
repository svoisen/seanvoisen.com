import fs from "node:fs/promises";
import path from "node:path";
import postcss from "postcss";
import cssnano from "cssnano";

export const cssConfig = (eleventyConfig) => {
  eleventyConfig.addTemplateFormats("css");

  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async (inputContent, inputPath) => {
      console.log("RUNNING");
      console.log(inputPath);
      // Ignore CSS in the _includes directory or else we will create an infinite loop
      if (inputPath.endsWith("src/_includes/css/global.css")) {
        return;
      }

      return async () => {
        const result = await postcss([
          cssnano
        ]).process(inputContent, { from: inputPath });

        const outputPath = "src/_includes/css/" + path.basename(inputPath);
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        console.log(inputPath);
        console.log("WRITING", outputPath);
        await fs.writeFile(outputPath, result.css);

        return result.css;
      }
    }
  });
};


