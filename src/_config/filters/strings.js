// Words a topic can be that are read as letters, not as a word.
const ACRONYMS = new Set(["ai", "ui", "ux", "ml"]);

export const titlecase = (str) => {
  return str.replace(
      /\w\S*/g,
      text => ACRONYMS.has(text.toLowerCase())
        ? text.toUpperCase()
        : text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
};
