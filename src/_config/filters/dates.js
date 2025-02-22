import { DateTime } from "luxon";

export const w3Date = (dateObj) => {
  return DateTime.fromJSDate(dateObj, { zone: "UTC-8" }).toISO();
};

export const htmlDate = (dateObj) => {
  return DateTime.fromJSDate(dateObj, { zone: "UTC-8" }).toFormat('yyyy-LL-dd');
};
