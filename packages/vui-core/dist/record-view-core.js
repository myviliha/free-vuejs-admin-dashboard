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
/** Fixed widths for the two columns that are not fields: the checkbox and the row actions. */
export const RV_CHECKBOX_W = 56;
export const RV_ACTIONS_W = 120;
/** The identity column's width key, and its default. It is not a field, so it needs its own. */
export const RV_NAME_COL = "__name";
export const RV_NAME_DEFAULT_W = 190;
/** Narrower than this and a header stops being readable, so a drag stops here. */
export const RV_MIN_COL_W = 80;
/** How far one arrow-key press moves a column edge, for resizing without a mouse. */
export const RV_NUDGE_PX = 16;
/** The width a column resize starts from when the column has never been dragged. */
export const RV_RESIZE_BASE_W = 160;
export const RV_PAGE_SIZES = [10, 25, 50, 100];
/**
 * How long a cached page may still be painted while it revalidates. Older than this and the shimmer
 * shows instead, because a minutes-old table read as current is worse than a moment's wait.
 */
export const RV_DEFAULT_TTL_MS = 60_000;
/**
 * Minimum time the loading shimmer stays up per `fetcher` load, so a cache hit, which is instant and
 * from memory, shows the same animation as a real fetch. Consistent feedback instead of a blank flash. Real
 * fetches longer than this are unaffected.
 */
export const RV_MIN_LOADING_MS = 300;
/**
 * Marks the identity (Name/Title) column's slot in the ordered column list, so the header, the
 * skeleton and the body rows all render it wherever `identityColumn` places it. One order, three
 * consumers, which is why it is a token rather than an index each of them recomputes.
 */
export const IDENTITY_COL = Symbol("identity");
/**
 * Auto-align columns from their data: numeric columns and short codes (every value ≤ 4 characters,
 * `"USD"`, `"EN"`) centre; everything else stays left. An explicit `field.align` always wins.
 */
export function computeColumnAligns(fields, data) {
    const map = {};
    for (const f of fields) {
        if (f.align) {
            map[f.key] = f.align;
            continue;
        }
        const vals = data
            .map((r) => r[f.key])
            .filter((v) => v !== null && v !== undefined && String(v).trim() !== "");
        if (vals.length === 0) {
            map[f.key] = "left";
            continue;
        }
        const allNumeric = vals.every((v) => typeof v === "number" || (typeof v === "string" && !Number.isNaN(Number(v))));
        const allShort = vals.every((v) => String(v).trim().length <= 4);
        map[f.key] = allNumeric || allShort ? "center" : "left";
    }
    return map;
}
/** A centred or right-aligned column is usually a code or a number, so it needs less room. */
export function fieldDefaultWidth(field) {
    return field.width ?? (field.align && field.align !== "left" ? 110 : 160);
}
/**
 * The column order: the visible field columns with the identity column inserted where
 * `identityColumn` says: first, last, hidden, or after that many field columns, which is what lets a
 * reference table read "Region, Title, Code" instead of always leading with the name.
 */
export function orderColumns(visibleFields, identityColumn) {
    const cols = [...visibleFields];
    if (identityColumn === "hidden")
        return cols;
    const at = identityColumn === "first"
        ? 0
        : identityColumn === "last"
            ? cols.length
            : Math.max(0, Math.min(identityColumn, cols.length));
    cols.splice(at, 0, IDENTITY_COL);
    return cols;
}
/**
 * The table's total width, which is what makes it scroll horizontally rather than crush its columns.
 * The checkbox column only counts when selection is on.
 */
export function totalColumnWidth(args) {
    const name = args.widths[RV_NAME_COL] ?? RV_NAME_DEFAULT_W;
    return ((args.showSelection ? RV_CHECKBOX_W : 0) +
        RV_ACTIONS_W +
        name +
        args.visibleFields.reduce((sum, f) => sum + (args.widths[f.key] ?? fieldDefaultWidth(f)), 0));
}
/** A drag or a keyboard nudge, clamped so a column cannot be dragged past readable. */
export const resizedWidth = (from, delta) => Math.max(RV_MIN_COL_W, (from ?? RV_RESIZE_BASE_W) + delta);
/**
 * Sorting is decoupled from column visibility: a field is sortable when its `sortable` flag says so,
 * and otherwise when it is a visible column. That is what lets a `hideInTable` name field, the one
 * `getPrimary` reads, drive the identity column's own sort.
 */
export const canSortField = (f) => f.sortable ?? !f.hideInTable;
/**
 * Which field the identity column sorts by: the host's `nameSortKey`, else the first hidden sortable
 * field. Undefined means the identity header stays static rather than pretending to sort.
 */
export function resolveNameSortKey(fields, nameSortKey) {
    return nameSortKey ?? fields.find((f) => f.hideInTable && canSortField(f))?.key;
}
/** Clip a cell string to `max` characters, returning the display text and the full text to hover. */
export function clipCell(value, max) {
    if (max <= 0 || value.length <= max)
        return { text: value };
    return { text: `${value.slice(0, max).trimEnd()}…`, full: value };
}
/**
 * The page-size options, never above the ceiling. The fallback matters: with a ceiling below the
 * smallest preset the list would be empty and the selector would offer nothing at all.
 */
export function pageSizeOptions(maxPageSize) {
    const opts = RV_PAGE_SIZES.filter((n) => n <= maxPageSize);
    return opts.length ? [...opts] : [Math.max(1, Math.floor(maxPageSize))];
}
/** The initial page size, floored and clamped into the allowed range. */
export const clampPageSize = (defaultPageSize, maxPageSize) => Math.min(Math.max(1, Math.floor(defaultPageSize)), maxPageSize);
/** What the keyword box matches: the record's title first, then any field's value. */
export function clientFilter(rows, keyword, fields, getTitle) {
    const q = keyword.trim().toLowerCase();
    if (!q)
        return [...rows];
    return rows.filter((row) => {
        if (getTitle(row).toLowerCase().includes(q))
            return true;
        return fields.some((f) => String(row[f.key] ?? "")
            .toLowerCase()
            .includes(q));
    });
}
/**
 * The comparator. Numbers compare numerically and everything else by locale, which is the difference
 * between `10` sorting after `9` and after `1`.
 */
export function clientSort(rows, sort) {
    if (!sort)
        return [...rows];
    const { key, dir } = sort;
    return [...rows].sort((a, b) => {
        const av = a[key];
        const bv = b[key];
        const cmp = typeof av === "number" && typeof bv === "number"
            ? av - bv
            : String(av ?? "").localeCompare(String(bv ?? ""));
        return dir === "asc" ? cmp : -cmp;
    });
}
/** The next sort state for a header click: same column flips direction, a new column starts ascending. */
export const nextSort = (current, key) => current?.key === key ? { key, dir: current.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" };
/**
 * Everything the pagination footer and the body need, derived rather than each recomputed.
 *
 * **Server mode is the half that is easy to get wrong.** `rows` is already the current page, so it is
 * rendered whole and the range is sized to what the server returned; the total comes from the host.
 * `page` is clamped here rather than at every reader, so a filter that shrinks the list below the
 * current page cannot leave an empty table with a page number nobody can get back from.
 */
export function paginate(args) {
    const { rows, pageSize, total, manual, showPagination } = args;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const page = Math.min(Math.max(1, args.page), totalPages);
    const rangeStart = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const rangeEnd = manual
        ? total === 0
            ? 0
            : Math.min(rangeStart + rows.length - 1, total)
        : Math.min(page * pageSize, total);
    const sliced = manual
        ? [...rows]
        : showPagination
            ? rows.slice((page - 1) * pageSize, page * pageSize)
            : [...rows];
    return { totalPages, page, rangeStart, rangeEnd, rows: sliced };
}
/**
 * Cascading filter options: after the values change, drop any filter value that its own options no
 * longer offer, so changing Region invalidates a Country filter. Only function-options filters cascade;
 * a static list never invalidates. A single value clears; a multi-select keeps the still-valid entries
 * rather than emptying, because clearing four tags because one went stale is its own bug.
 *
 * Returns `null` when nothing changed, so a caller can skip the write and not loop.
 */
export function pruneFilterValues(fields, values) {
    let changed = false;
    const next = { ...values };
    for (const f of fields) {
        const cfg = typeof f.filterable === "object" ? f.filterable : null;
        if (!cfg || typeof cfg.options !== "function")
            continue;
        const valid = new Set(cfg.options(values).map((o) => o.value));
        const v = values[f.key];
        if (typeof v === "string" && v && !valid.has(v)) {
            next[f.key] = "";
            changed = true;
        }
        else if (Array.isArray(v)) {
            const kept = v.filter((x) => valid.has(x));
            if (kept.length !== v.length) {
                next[f.key] = kept;
                changed = true;
            }
        }
    }
    return changed ? next : null;
}
/**
 * Move a row in a manual reorder. **Every path returns a copy in the original order** when it cannot
 * complete the move, which is the guard the original author wrote this branch for: an early version
 * returned the array it had already spliced the row out of, so a drop that could not land removed the
 * dragged row instead of leaving it where it was.
 */
export function reorderRows(rows, sourceId, targetId) {
    const from = rows.findIndex((r) => r.id === sourceId);
    const to = rows.findIndex((r) => r.id === targetId);
    if (from < 0 || to < 0 || from === to)
        return [...rows];
    const next = [...rows];
    const [moved] = next.splice(from, 1);
    if (!moved)
        return [...rows];
    next.splice(to, 0, moved);
    return next;
}
