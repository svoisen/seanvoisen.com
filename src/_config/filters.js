import { w3Date, htmlDate, monthYear } from "./filters/dates.js";
import { head, slice, filter, reject } from "./filters/collections.js";
import { postCssFilter } from "./filters/cssnano.js";
import { titlecase } from "./filters/strings.js";
import { stars } from "./filters/ratings.js";
import { navigationItems, directoryItems, getDescription } from "./filters/directory.js";
import { genRSSId } from "./filters/rssId.js";

export default { w3Date, htmlDate, monthYear, head, slice, filter, reject, postCssFilter, titlecase, navigationItems, directoryItems, getDescription, stars, genRSSId };
