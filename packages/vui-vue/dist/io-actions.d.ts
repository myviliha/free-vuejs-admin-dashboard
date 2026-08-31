import { type IoAction, type IoActionsConfig, type RowId } from "@viliha/vui-core";
import type { FunctionalComponent } from "vue";
/**
 * The Import and Export menus the theme ships, with this edition's glyphs bound.
 *
 * **The lists themselves are `@viliha/vui-core`'s**, so the ids, the labels, what each `accept`s and
 * what each does are shared rather than agreed by coincidence. They do the work in the browser,
 * which is right for a page of rows and wrong the moment the data outgrows it. Point an `onAct` at your
 * API and use `ctx.query` when that happens; the core docblock says more.
 */
/** Exported so `RecordView`'s props can name the icon its Import/Export config carries. */
export type VueIcon = FunctionalComponent<{
    class?: string;
}>;
/** Export: CSV, Excel, JSON, and PDF via the print dialog. */
export declare const defaultExportActions: <T>() => IoAction<T, VueIcon>[];
/** Import: read a CSV or JSON file in the browser and put the rows into the table. */
export declare const defaultImportActions: <T extends {
    id: RowId;
}>(makeEmptyRow: (() => T) | undefined, nextId: () => RowId) => IoAction<T, VueIcon>[];
/** Apply a host's config to a shipped list: an array replaces, a function edits. */
export declare const resolveIoActions: <T>(defaults: IoAction<T, VueIcon>[], config: IoActionsConfig<T, VueIcon> | undefined) => IoAction<T, VueIcon>[];
