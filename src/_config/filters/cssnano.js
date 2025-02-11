import postcss from "postcss";
import cssnano from "cssnano";

export const cssnanoFilter = async (code) => {
  const result = await postcss([
    cssnano
  ]).process(code, { from: undefined });

  return result.css;
}
