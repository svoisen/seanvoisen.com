export const base = process.env.URL || "https://seanvoisen.com";
export const title = "Sean Voisen";
export const description = "Writing about design, philosophy, and technology.";
export const author = {
  name: "Sean Voisen"
};
// Read at build time, so the footer's copyright range follows the calendar
// rather than whenever someone last remembered to edit it.
export const currentYear = new Date().getFullYear();
export const locale = "en_US";
export const lang = "en";
export const og = {
  image: "/assets/images/og/sean_voisen_og@1200x630.png",
  width: 1200,
  height: 630
};
