import { DateTime } from "luxon";

export const w3Date = (dateObj) => {
  return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
};

export const htmlDate = (dateObj) => {
  return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('MMM d, yyyy');
};

// For the composed pages, where the day is noise: it matters when you are
// reading a post rather than when you are choosing one, so the home page's
// sections drop it. The archives keep it via htmlDate — the gutter is sized
// to hold a full date, so this is a choice about reading rather than a fit.
export const monthYear = (dateObj) => {
  return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('MMM yyyy');
};
