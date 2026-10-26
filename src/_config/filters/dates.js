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

// A project's date is a year with an optional month, so it reads "Mar 2011"
// when the month is known and "2011" when it is not — never a guessed month.
export const projectDate = (year, month) => {
  if (!month) {
    return String(year);
  }

  return DateTime.fromObject({ year, month }, { zone: "utc" }).toFormat('MMM yyyy');
};
