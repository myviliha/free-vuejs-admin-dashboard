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
export function matchFilters(rows, filters) {
    return rows.filter((row) => Object.entries(filters).every(([key, value]) => {
        const cell = row[key];
        if (Array.isArray(value)) {
            // review-lint: substring-for-equality, `value` is an array here, so this is membership
            return value.length === 0 || value.includes(String(cell));
        }
        const needle = String(value ?? "").toLowerCase();
        return (!needle ||
            String(cell ?? "")
                .toLowerCase()
                .includes(needle));
    }));
}
/** Fold edits/adds/deletes made on the filtered view back into the full list. */
export function reconcile(prev, visible, next) {
    const nextById = new Map(next.map((r) => [r.id, r]));
    const visibleIds = new Set(visible.map((r) => r.id));
    const kept = prev
        .filter((r) => !visibleIds.has(r.id) || nextById.has(r.id)) // drop deletes
        .map((r) => nextById.get(r.id) ?? r); // apply edits
    const added = next.filter((r) => !prev.some((p) => p.id === r.id));
    return [...kept, ...added];
}
/**
 * A row is blank when every field but `id` is empty, which means an un-saved Add that was cancelled.
 *
 * Those must not land in Trash: a reader who opens the Add form, changes their mind and closes it would
 * otherwise find a row of empty cells sitting in the deleted list.
 */
export function isBlankRow(row) {
    return Object.entries(row).every(([k, v]) => k === "id" || v === "" || v === false || v == null || v === 0);
}
