/**
 * The Pro table's rules, framework-free: how its columns are ordered and sized, how a page is sliced,
 * what the keyword box matches, how a comparator sorts, and which filter values a cascade invalidates.
 *
 * **`record-view.tsx` is 2,433 lines and this is most of what it decides.** Everything here answers a
 * question with one right answer (which page is showing, what 25 rows means when there are 12, where
 * the identity column sits, whether a filter value still exists), and every one of them is the
 * kind of arithmetic that goes subtly wrong in a second implementation and is then wrong in a way
 * nobody notices until a customer counts the rows.
 *
 * **What is deliberately NOT here:** the env-var defaults. `process.env.NEXT_PUBLIC_*` is inlined by
 * the consumer's bundler, so the same expression means something different in Next and in Vite; each
 * edition reads its own and passes the value in. `D12` of the Vue parity spec made the same call for
 * `PasswordInput` and the reasoning has not changed.
 *
 * Split out of `record-view.tsx` on 2026-08-20 for wave 6 of the Vue parity epic.
 */
import type { FieldRules, FilterValues, RowId, SortState } from "./record-field-core.js";
/** Fixed widths for the two columns that are not fields: the checkbox and the row actions. */
export declare const RV_CHECKBOX_W = 56;
export declare const RV_ACTIONS_W = 120;
/** The identity column's width key, and its default. It is not a field, so it needs its own. */
export declare const RV_NAME_COL = "__name";
export declare const RV_NAME_DEFAULT_W = 190;
/** Narrower than this and a header stops being readable, so a drag stops here. */
export declare const RV_MIN_COL_W = 80;
/** How far one arrow-key press moves a column edge, for resizing without a mouse. */
export declare const RV_NUDGE_PX = 16;
/** The width a column resize starts from when the column has never been dragged. */
export declare const RV_RESIZE_BASE_W = 160;
export declare const RV_PAGE_SIZES: readonly [10, 25, 50, 100];
/**
 * How long a cached page may still be painted while it revalidates. Older than this and the shimmer
 * shows instead, because a minutes-old table read as current is worse than a moment's wait.
 */
export declare const RV_DEFAULT_TTL_MS = 60000;
/**
 * Minimum time the loading shimmer stays up per `fetcher` load, so a cache hit, which is instant and
 * from memory, shows the same animation as a real fetch. Consistent feedback instead of a blank flash. Real
 * fetches longer than this are unaffected.
 */
export declare const RV_MIN_LOADING_MS = 300;
export type ColAlign = "left" | "center" | "right";
/**
 * Marks the identity (Name/Title) column's slot in the ordered column list, so the header, the
 * skeleton and the body rows all render it wherever `identityColumn` places it. One order, three
 * consumers, which is why it is a token rather than an index each of them recomputes.
 */
export declare const IDENTITY_COL: unique symbol;
export type IdentitySlot = typeof IDENTITY_COL;
/**
 * Auto-align columns from their data: numeric columns and short codes (every value ≤ 4 characters,
 * `"USD"`, `"EN"`) centre; everything else stays left. An explicit `field.align` always wins.
 */
export declare function computeColumnAligns<T extends {
    id: RowId;
}>(fields: readonly FieldRules<T>[], data: readonly T[]): Record<string, ColAlign>;
/** A centred or right-aligned column is usually a code or a number, so it needs less room. */
export declare function fieldDefaultWidth<T>(field: FieldRules<T>): number;
/**
 * The column order: the visible field columns with the identity column inserted where
 * `identityColumn` says: first, last, hidden, or after that many field columns, which is what lets a
 * reference table read "Region, Title, Code" instead of always leading with the name.
 */
export declare function orderColumns<T>(visibleFields: readonly FieldRules<T>[], identityColumn: number | "first" | "last" | "hidden"): (FieldRules<T> | IdentitySlot)[];
/**
 * The table's total width, which is what makes it scroll horizontally rather than crush its columns.
 * The checkbox column only counts when selection is on.
 */
export declare function totalColumnWidth<T>(args: {
    visibleFields: readonly FieldRules<T>[];
    widths: Record<string, number>;
    showSelection: boolean;
}): number;
/** A drag or a keyboard nudge, clamped so a column cannot be dragged past readable. */
export declare const resizedWidth: (from: number | undefined, delta: number) => number;
/**
 * Sorting is decoupled from column visibility: a field is sortable when its `sortable` flag says so,
 * and otherwise when it is a visible column. That is what lets a `hideInTable` name field, the one
 * `getPrimary` reads, drive the identity column's own sort.
 */
export declare const canSortField: <T>(f: FieldRules<T>) => boolean;
/**
 * Which field the identity column sorts by: the host's `nameSortKey`, else the first hidden sortable
 * field. Undefined means the identity header stays static rather than pretending to sort.
 */
export declare function resolveNameSortKey<T>(fields: readonly FieldRules<T>[], nameSortKey?: string): string | undefined;
/** Clip a cell string to `max` characters, returning the display text and the full text to hover. */
export declare function clipCell(value: string, max: number): {
    text: string;
    full?: string;
};
/**
 * The page-size options, never above the ceiling. The fallback matters: with a ceiling below the
 * smallest preset the list would be empty and the selector would offer nothing at all.
 */
export declare function pageSizeOptions(maxPageSize: number): number[];
/** The initial page size, floored and clamped into the allowed range. */
export declare const clampPageSize: (defaultPageSize: number, maxPageSize: number) => number;
/** What the keyword box matches: the record's title first, then any field's value. */
export declare function clientFilter<T extends {
    id: RowId;
}>(rows: readonly T[], keyword: string, fields: readonly FieldRules<T>[], getTitle: (row: T) => string): T[];
/**
 * The comparator. Numbers compare numerically and everything else by locale, which is the difference
 * between `10` sorting after `9` and after `1`.
 */
export declare function clientSort<T>(rows: readonly T[], sort: SortState | null): T[];
/** The next sort state for a header click: same column flips direction, a new column starts ascending. */
export declare const nextSort: (current: SortState | null, key: string) => SortState;
/**
 * Everything the pagination footer and the body need, derived rather than each recomputed.
 *
 * **Server mode is the half that is easy to get wrong.** `rows` is already the current page, so it is
 * rendered whole and the range is sized to what the server returned; the total comes from the host.
 * `page` is clamped here rather than at every reader, so a filter that shrinks the list below the
 * current page cannot leave an empty table with a page number nobody can get back from.
 */
export declare function paginate<T>(args: {
    rows: readonly T[];
    page: number;
    pageSize: number;
    total: number;
    manual: boolean;
    showPagination: boolean;
}): {
    totalPages: number;
    page: number;
    rangeStart: number;
    rangeEnd: number;
    rows: T[];
};
/**
 * Cascading filter options: after the values change, drop any filter value that its own options no
 * longer offer, so changing Region invalidates a Country filter. Only function-options filters cascade;
 * a static list never invalidates. A single value clears; a multi-select keeps the still-valid entries
 * rather than emptying, because clearing four tags because one went stale is its own bug.
 *
 * Returns `null` when nothing changed, so a caller can skip the write and not loop.
 */
export declare function pruneFilterValues<T>(fields: readonly FieldRules<T>[], values: FilterValues<T>): FilterValues<T> | null;
/**
 * Move a row in a manual reorder. **Every path returns a copy in the original order** when it cannot
 * complete the move, which is the guard the original author wrote this branch for: an early version
 * returned the array it had already spliced the row out of, so a drop that could not land removed the
 * dragged row instead of leaving it where it was.
 */
export declare function reorderRows<T extends {
    id: RowId;
}>(rows: readonly T[], sourceId: RowId, targetId: RowId): T[];
