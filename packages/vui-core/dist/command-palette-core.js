/**
 * A command palette's search, framework-free.
 *
 * Filtering and grouping are the two things a palette does that a user notices, and they are pure
 * functions of the query and the action list. Sharing them means the Vue palette matches on the same
 * fields in the same order, which is not something a class-parity test could ever check.
 *
 * **The action type is a constraint rather than an import.** React's `CommandAction` carries an icon
 * component and Vue's carries something else; neither is this module's business, so it asks only for
 * the fields it reads. That is what `form-actions`' logic could not do, because its types are a union
 * owned by another family.
 */
/**
 * Actions matching the query, in the order given. An empty query matches everything, which is what
 * makes the palette a menu before it is a search.
 */
export function filterActions(actions, query) {
    const term = query.trim().toLowerCase();
    if (!term)
        return actions;
    return actions.filter((a) => a.label.toLowerCase().includes(term) ||
        a.group?.toLowerCase().includes(term) ||
        a.keywords?.toLowerCase().includes(term));
}
/**
 * Group the results, **preserving the order the actions arrived in** rather than sorting the group
 * names. The ungrouped bucket keeps the empty-string key, so a palette can render it without a
 * heading.
 */
export function groupActions(list) {
    const map = new Map();
    for (const a of list) {
        const key = a.group ?? "";
        const existing = map.get(key);
        if (existing)
            existing.push(a);
        else
            map.set(key, [a]);
    }
    return [...map.entries()];
}
