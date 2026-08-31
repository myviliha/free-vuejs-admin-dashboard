/**
 * The data table's logic, with no framework in it.
 *
 * Filtering, sorting and paging an in-memory array is arithmetic, not rendering, and every edition
 * needs the same arithmetic. Keeping it here means the Vue, Angular, Laravel and HTML ports are a
 * component over shared functions rather than four re-implementations of a clamp that would have to
 * agree four ways.
 *
 * **Framework-free by contract, not by intention**: `packages/core/scripts/build.mjs` copies this
 * file into `@viliha/vui-core` and fails the build if it ever grows a `react`, `vue` or `svelte`
 * import, or a client-boundary directive.
 *
 * That guard is a plain substring check over the source, so this comment cannot spell the directive
 * out. It rejected an earlier draft of this very paragraph, which is the guard working rather than
 * being clever.
 *
 * `data-table.tsx` re-exports everything here, so `@viliha/vui-react/data-table` is unchanged.
 */
export type CellValue = string | number | boolean | Date | null | undefined;
/**
 * The part of a column the transforms actually read.
 *
 * A rendering column adds `header`, `cell` and styling on top of this, and those are the parts that
 * differ per framework. **Nothing here knows what a cell looks like**, which is why a column whose
 * cell is a badge still sorts by its datum.
 */
export interface DataField<T> {
    /** The column's id, and the property read from the row when `value` is absent. */
    key: string;
    /** What the column sorts and searches on. Separate from any rendering, on purpose. */
    value?: (row: T) => CellValue;
}
export type SortDirection = "asc" | "desc";
export interface DataSort {
    key: string;
    direction: SortDirection;
}
/** The value a column sorts and searches on. */
export declare function columnValue<T>(column: DataField<T>, row: T): CellValue;
/** A cell's value as text: what a default cell renders, and what search matches on. */
export declare function asText(value: CellValue): string;
/** Case-insensitive substring match across every given column. Never mutates `rows`. */
export declare function filterRows<T>(rows: readonly T[], columns: readonly DataField<T>[], query: string): T[];
/** Stable single-column sort. Empties last whichever way it points. Never mutates `rows`. */
export declare function sortRows<T>(rows: readonly T[], columns: readonly DataField<T>[], sort: DataSort | null): T[];
/**
 * One page, with the page number clamped into range.
 *
 * The clamp is the whole point: a search that narrows 200 rows to 3 while the user is on page 8
 * must show them the 3, not an empty table.
 */
export declare function pageRows<T>(rows: readonly T[], page: number, pageSize: number): {
    rows: T[];
    page: number;
    pageCount: number;
};
/** The pager's entries: first, last, a window around the current page, gaps between. */
export declare function pageList(page: number, pageCount: number): (number | "gap")[];
