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
/* ------------------------------------------------------------------ *
 * The three transforms. Exported and tested directly, because a table
 * whose correctness lives inside a component is a table nobody checks.
 * ------------------------------------------------------------------ */
/** The value a column sorts and searches on. */
export function columnValue(column, row) {
    if (column.value)
        return column.value(row);
    return row[column.key];
}
/** A cell's value as text: what a default cell renders, and what search matches on. */
export function asText(value) {
    if (value == null)
        return "";
    if (value instanceof Date)
        return value.toISOString();
    return String(value);
}
/** Case-insensitive substring match across every given column. Never mutates `rows`. */
export function filterRows(rows, columns, query) {
    const needle = query.trim().toLowerCase();
    if (!needle)
        return [...rows];
    return rows.filter((row) => columns.some((column) => asText(columnValue(column, row)).toLowerCase().includes(needle)));
}
function compare(a, b) {
    // Empties sort last in both directions: a blank cell is absent data, not the smallest value.
    const aEmpty = a == null || a === "";
    const bEmpty = b == null || b === "";
    if (aEmpty || bEmpty)
        return aEmpty && bEmpty ? 0 : aEmpty ? 1 : -1;
    if (a instanceof Date || b instanceof Date) {
        return new Date(a).getTime() - new Date(b).getTime();
    }
    if (typeof a === "number" && typeof b === "number")
        return a - b;
    if (typeof a === "boolean" && typeof b === "boolean")
        return Number(a) - Number(b);
    return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
}
/** Stable single-column sort. Empties last whichever way it points. Never mutates `rows`. */
export function sortRows(rows, columns, sort) {
    if (!sort)
        return [...rows];
    const column = columns.find((c) => c.key === sort.key);
    if (!column)
        return [...rows];
    const sign = sort.direction === "desc" ? -1 : 1;
    return rows
        .map((row, index) => ({ row, index }))
        .sort((a, b) => {
        const av = columnValue(column, a.row);
        const bv = columnValue(column, b.row);
        const aEmpty = av == null || av === "";
        const bEmpty = bv == null || bv === "";
        // The empties rule is direction-independent, so it is applied before the sign.
        if (aEmpty !== bEmpty)
            return aEmpty ? 1 : -1;
        const result = compare(av, bv) * sign;
        return result !== 0 ? result : a.index - b.index;
    })
        .map((entry) => entry.row);
}
/**
 * One page, with the page number clamped into range.
 *
 * The clamp is the whole point: a search that narrows 200 rows to 3 while the user is on page 8
 * must show them the 3, not an empty table.
 */
export function pageRows(rows, page, pageSize) {
    if (!pageSize || pageSize < 1)
        return { rows: [...rows], page: 1, pageCount: 1 };
    const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
    const safe = Math.min(Math.max(1, Math.floor(page) || 1), pageCount);
    const start = (safe - 1) * pageSize;
    return { rows: rows.slice(start, start + pageSize), page: safe, pageCount };
}
/** The pager's entries: first, last, a window around the current page, gaps between. */
export function pageList(page, pageCount) {
    if (pageCount <= 7)
        return Array.from({ length: Math.max(pageCount, 1) }, (_, i) => i + 1);
    const out = [1];
    const start = Math.max(2, Math.min(page - 1, pageCount - 4));
    const end = Math.min(pageCount - 1, Math.max(page + 1, 5));
    if (start > 2)
        out.push("gap");
    for (let i = start; i <= end; i += 1)
        out.push(i);
    if (end < pageCount - 1)
        out.push("gap");
    out.push(pageCount);
    return out;
}
