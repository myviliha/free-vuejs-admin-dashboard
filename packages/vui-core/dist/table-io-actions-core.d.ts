/**
 * The Import and Export menus the theme ships, built from the same {@link IoAction} type a host uses.
 * That is the point: the defaults are not a special case in the component, they are one particular
 * list, so replacing them or adding to them is the same API rather than a different one.
 *
 * They do the work in the browser: read the file the person picked, write the file they asked for. That
 * is right for a demo and for small lists, and wrong as soon as the data outgrows the page someone is
 * looking at, because the browser only has that page. When that happens, point the actions at your API
 * and use `ctx.query` to ask for everything that matches.
 *
 * **The four icons are injected**, which is the only reason this could live here: everything else in the
 * file was already framework-free. Each edition passes its own components, and an edition whose menu
 * takes the glyph as a slot passes none. The ids, the labels, the accepts and the handlers are then one
 * list rather than two that agree today.
 *
 * Lifted out of `table-io-actions.tsx` on 2026-08-20 for wave 6 of the Vue parity epic.
 */
import type { IoAction, IoActionsConfig } from "./config-core.js";
/** The four glyphs the shipped menus use, named so each edition can bind its own. */
export type IoIcons<Icon> = {
    csv?: Icon;
    excel?: Icon;
    json?: Icon;
    pdf?: Icon;
};
/** Export: CSV, Excel, JSON, and PDF via the print dialog. */
export declare function defaultExportActions<T, Icon = unknown>(icons?: IoIcons<Icon>): IoAction<T, Icon>[];
/**
 * Import: read a CSV or JSON file in the browser and put the rows into the table. Values are matched to
 * fields by key first, then by label, so a spreadsheet exported from this table imports back into it.
 */
export declare function defaultImportActions<T extends {
    id: string | number;
}, Icon = unknown>(makeEmptyRow: (() => T) | undefined, nextId: () => string | number, icons?: IoIcons<Icon>): IoAction<T, Icon>[];
/** Apply a host's config to a shipped list: an array replaces, a function edits. */
export declare function resolveIoActions<T, Icon = unknown>(defaults: IoAction<T, Icon>[], config: IoActionsConfig<T, Icon> | undefined): IoAction<T, Icon>[];
