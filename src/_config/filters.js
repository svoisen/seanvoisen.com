import { w3Date, htmlDate } from "./filters/dates.js";
import { head, slice } from "./filters/collections.js";
import { cssnanoFilter } from "./filters/cssnano.js";
import { titlecase } from "./filters/strings.js";
import { navigationItems, directoryItems, getDescription } from "./filters/directory.js";

export default { w3Date, htmlDate, head, slice, cssnanoFilter, titlecase, navigationItems, directoryItems, getDescription };
