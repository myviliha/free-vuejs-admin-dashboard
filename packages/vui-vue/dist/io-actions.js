import { ICONS } from "./icons.js";
import { defaultExportActions, defaultImportActions, resolveIoActions } from "@viliha/vui-core";
//#region src/io-actions.ts
var ICON_SET = {
	csv: ICONS.csv,
	excel: ICONS.excel,
	json: ICONS.json,
	pdf: ICONS.pdf
};
/** Export: CSV, Excel, JSON, and PDF via the print dialog. */
var defaultExportActions$1 = () => defaultExportActions(ICON_SET);
/** Import: read a CSV or JSON file in the browser and put the rows into the table. */
var defaultImportActions$1 = (makeEmptyRow, nextId) => defaultImportActions(makeEmptyRow, nextId, ICON_SET);
/** Apply a host's config to a shipped list: an array replaces, a function edits. */
var resolveIoActions$1 = (defaults, config) => resolveIoActions(defaults, config);
//#endregion
export { defaultExportActions$1 as defaultExportActions, defaultImportActions$1 as defaultImportActions, resolveIoActions$1 as resolveIoActions };

