import { w3Date, htmlDate, monthYear, projectDate } from "./filters/dates.js";
import { head, filter } from "./filters/collections.js";
import { postCssFilter } from "./filters/cssnano.js";
import { titlecase } from "./filters/strings.js";
import { navigationItems, directoryItems, getDescription } from "./filters/directory.js";
import { genRSSId } from "./filters/rssId.js";

export default { w3Date, htmlDate, monthYear, projectDate, head, filter, postCssFilter, titlecase, navigationItems, directoryItems, getDescription, genRSSId };
