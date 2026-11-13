import { DateTime } from "luxon";

export const w3Date = (dateObj) => {
  return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
};

// Displayed dates come in two lengths. Both are set in sentence case on
// purpose — the CSS uppercases them, so screen readers still hear "Nov" as a
// word rather than spelling out N-O-V.

// The full date, for a single post or page: "Nov 9, 2026".
export const htmlDate = (dateObj) => {
  return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('MMM d, yyyy');
};

// Month and year, for the lists of posts (the home page and the archives):
// "Nov 2026". The day matters once you are reading a post, not while you are
// choosing one.
export const monthYear = (dateObj) => {
  return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('MMM yyyy');
};
