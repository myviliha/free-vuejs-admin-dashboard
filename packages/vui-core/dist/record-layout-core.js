/** Distinct field groups in first-appearance order (ungrouped → "General"). */
export function orderedGroups(fields) {
    const seen = [];
    for (const f of fields) {
        const g = f.group ?? "General";
        if (!seen.includes(g))
            seen.push(g);
    }
    return seen;
}
/**
 * The sections to render, in order. Declared sections come first in the order
 * you wrote them; any group that only exists on the fields is appended, so
 * adding a field with a new group never makes it disappear.
 *
 * Exported for testing.
 */
export function orderedSections(fields, declared) {
    const groups = orderedGroups(fields);
    if (!declared?.length)
        return groups.map((group) => ({ group }));
    const named = new Set(declared.map((d) => d.group));
    return [
        ...declared.filter((d) => groups.includes(d.group)),
        ...groups.filter((g) => !named.has(g)).map((group) => ({ group })),
    ];
}
/**
 * The form's rows, whichever way the host described them.
 *
 * `rows` is the way: each row names the sections that sit on it, so the top row
 * can hold two and the next three. A section with no fields is dropped, and a
 * group nobody placed gets a row of its own at the end rather than vanishing.
 *
 * Without `rows`, the deprecated `sectionColumns` path chunks the sections into
 * rows of that many, which is the old flow-and-wrap behaviour. Without either,
 * every section is its own full-width row.
 *
 * Exported for testing.
 */
export function resolveFormRows(fields, rows, sections, sectionColumns) {
    const groups = new Set(orderedGroups(fields));
    const has = (s) => groups.has(s.group);
    if (rows?.length) {
        const placed = new Set();
        const out = [];
        for (const row of rows) {
            const kept = row.sections.filter((s) => {
                if (!has(s) || placed.has(s.group))
                    return false;
                placed.add(s.group);
                return true;
            });
            if (kept.length)
                out.push({ sections: kept });
        }
        for (const group of groups)
            if (!placed.has(group))
                out.push({ sections: [{ group }] });
        return out;
    }
    const ordered = orderedSections(fields, sections);
    const perRow = sectionColumns ?? 1;
    if (perRow === 1)
        return ordered.map((s) => ({ sections: [s] }));
    const out = [];
    for (let i = 0; i < ordered.length; i += perRow)
        out.push({ sections: ordered.slice(i, i + perRow) });
    return out;
}
