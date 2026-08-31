import type { FilterValues } from "./record-field-core.js";
/**
 * Client-side filtering for a record list, and the reconciliation that goes with it.
 *
 * These three functions were a React hook's internals (`use-client-filter.ts`), and every one of them is
 * a pure function over arrays: matching rows against the Filter panel's values, folding an edit or a
 * delete made on a filtered view back onto the full list, and recognising a blank row so a cancelled Add
 * does not land in Trash.
 *
 * They moved when the Vue demo needed the same behaviour. Each edition keeps its own hook or composable,
 * which is four lines of state around these; what neither edition should own is the **rules**, because a
 * Filter panel that matches differently in two demos is two products. Found by review: the Vue screens
 * offered a Filter panel that collected values and matched nothing, and a Trash that could not receive a
 * deletion.
 */
/**
 * Match rows against the Filter panel's collected values.
 *
 * Named `matchFilters` rather than `filterRows`, which `data-table-core` already exports for a different
 * job: that one is the keyword box searching every column, this one is the Filter panel matching a value
 * per field. Two functions with one name in a shared barrel is a coin toss at the call site: contains-match for a
 * text value, includes-match for a multi-select array. Naive on purpose, this
 * is in-memory demo data; a real app runs the query on the server.
 */
export declare function matchFilters<T>(rows: T[], filters: FilterValues<T>): T[];
/** Fold edits/adds/deletes made on the filtered view back into the full list. */
export declare function reconcile<T extends {
    id: number | string;
}>(prev: T[], visible: T[], next: T[]): T[];
/**
 * A row is blank when every field but `id` is empty, which means an un-saved Add that was cancelled.
 *
 * Those must not land in Trash: a reader who opens the Add form, changes their mind and closes it would
 * otherwise find a row of empty cells sitting in the deleted list.
 */
export declare function isBlankRow<T extends {
    id: number | string;
}>(row: T): boolean;
