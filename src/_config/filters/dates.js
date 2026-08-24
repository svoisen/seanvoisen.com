import { DateTime } from "luxon";

export const w3Date = (dateObj) => {
  return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
};

export const htmlDate = (dateObj) => {
  return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('MMM d, yyyy');
};

// For gutters and meta rows, where the day is noise and the space is tight:
// htmlDate's "MMM d, yyyy" does not fit the 96px gutter, and the day matters
// when you are reading a post rather than when you are choosing one.
export const monthYear = (dateObj) => {
  return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('MMM yyyy');
};
