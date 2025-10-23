import { DateTime } from "luxon";

export const w3Date = (dateObj) => {
  return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
};

export const htmlDate = (dateObj) => {
  return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('MMM d, yyyy');
};
