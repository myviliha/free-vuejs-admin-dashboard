/**
 * The record vocabulary, framework-free: the field description every record screen is written in, and
 * the rules that read it.
 *
 * **Two type parameters carry what a framework owns.** `Node` is whatever `render` returns (a
 * `ReactNode`, a Vue `VNode`) and `Icon` is whatever a column header shows. They default to `unknown`
 * so a host that renders neither can write `RecordField<Customer>` and nothing else, and each edition
 * binds them once: React's `RecordField<T>` is `RecordField<T, ReactNode, IconType>`, and the Vue
 * edition binds its own. The alternative was two declarations of the same 130-line field description,
 * which is the one thing this epic keeps proving does not stay in sync.
 *
 * **`groupSlots` is generic over the slot's node too**, and takes `never` for it: it only ever moves
 * slots between buckets, so it must not force a node type on either edition.
 *
 * Split out of `record-field.tsx` on 2026-08-20 for wave 6 of the Vue parity epic. The React
 * components that render these values, and the `usePersistentState` hook, stay there: one is JSX and
 * the other is reactivity, and `D18` says why the second is written twice rather than shared.
 */
/** Resolve a choice field's form options against the current draft: a static
 *  array, or a function of the draft (cascading pickers). */
export function resolveOptions(opts, draft) {
    return typeof opts === "function" ? opts(draft) : (opts ?? []);
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Format US phone digits progressively while typing: 1234567890 →
 *  (123) 456-7890. Partial input stays readable. Exported for testing. */
export function formatPhone(value) {
    const d = value.replace(/\D/g, "").slice(0, 10);
    if (d.length <= 3)
        return d;
    if (d.length <= 6)
        return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}
/**
 * Validate a field value against its declarative rules — returns the first error
 * message, or `undefined` when valid. Order: required → min/max → pattern →
 * format → custom. Exported for testing.
 */
export function validateField(field, raw, draft) {
    const value = field.trim ? raw.trim() : raw;
    const label = field.label;
    // Multi-select holds a set (String([]) === ""); only `required` applies —
    // length/pattern/format bounds are for scalar text.
    if (field.multiple) {
        return field.required && value === "" ? `${label} is required` : undefined;
    }
    if (field.required && value === "")
        return `${label} is required`;
    if (value === "")
        return undefined; // optional + empty → nothing else to check
    if (field.input === "number") {
        const n = Number(value);
        if (!Number.isFinite(n))
            return `${label} must be a number`;
        if (field.min != null && n < field.min)
            return `${label} must be at least ${field.min}`;
        if (field.max != null && n > field.max)
            return `${label} must be at most ${field.max}`;
    }
    else {
        if (field.min != null && value.length < field.min)
            return `${label} must be at least ${field.min} characters`;
        if (field.max != null && value.length > field.max)
            return `${label} must be at most ${field.max} characters`;
    }
    if (field.pattern) {
        // Drop any global flag so repeated `.test()` calls are stateless.
        const re = typeof field.pattern === "string"
            ? new RegExp(field.pattern)
            : new RegExp(field.pattern.source, field.pattern.flags.replace("g", ""));
        if (!re.test(value))
            return field.patternMessage ?? `${label} is invalid`;
    }
    if (field.format === "email" && !EMAIL_RE.test(value))
        return field.patternMessage ?? "Enter a valid email address";
    if (field.format === "phone" && value.replace(/\D/g, "").length !== 10)
        return field.patternMessage ?? "Enter a valid US phone number";
    if (field.validate)
        return field.validate(value, draft) || undefined;
    return undefined;
}
/**
 * The async cache key for a cascading field: its parents' current values, joined.
 *
 * **The separator is `\u0000`, and a space was a real collision.** `dependsOn: ["region","city"]` with
 * `("north", "east coast")` and `("north east", "coast")` both produced `"north east coast"`, so the
 * cache was not invalidated and the child kept the previous parent's options. React joined with a
 * space in three of its five call sites and with `\u0000` in the other two, which is how a rule ends up
 * being two rules; this is the one function both editions call.
 */
export function resetKeyOf(field, values) {
    return (field.dependsOn ?? [])
        .map((k) => String(values[k] ?? ""))
        .join("\u0000");
}
/** A field whose stored value is an async id (from `loadOptions`/`resolveOption`
 *  with no static `options`) — its read display must resolve the id to a label. */
export function isAsyncLabeled(f) {
    return Boolean(f.loadOptions && f.resolveOption) && !Array.isArray(f.options);
}
/**
 * Place a form's slots within one section, keyed by the field each follows.
 * The `""` bucket holds the ones with nothing to follow, which close out the
 * section. `after` puts a slot in that field's own section, `group` names a
 * section directly, and neither means the default one. Exported for testing.
 */
export function groupSlots(fields, slots, group) {
    const fieldGroup = (key) => fields.find((f) => f.key === key)?.group ?? "General";
    const byAfter = new Map();
    for (const slot of slots ?? []) {
        const target = slot.group ?? (slot.after ? fieldGroup(slot.after) : "General");
        if (target !== group)
            continue;
        // Follow the named field only when it is actually in this section.
        const key = slot.after && fieldGroup(slot.after) === group ? slot.after : "";
        byAfter.set(key, [...(byAfter.get(key) ?? []), slot]);
    }
    return byAfter;
}
/** Empty-table message: a keyword search, active per-field filters, or a
 *  genuinely empty list read differently. Exported for testing. */
export function emptyStateLabel(filter, filterValues) {
    if (filter)
        return `No results for “${filter}”.`;
    return hasActiveFilters(filterValues) ? "No matching records." : "No records yet.";
}
/**
 * Whether any per-field filter currently holds a value.
 *
 * **One predicate, because two would disagree.** The empty-state wording above and a "filters active"
 * affordance elsewhere must answer this identically: the moment someone decides a numeric `0` counts as
 * a filter and fixes only one of them, a table reads "No records yet." while the chip says filters are
 * on, and the person looking at it has no way to tell which is lying.
 */
export function hasActiveFilters(filterValues) {
    return Object.values(filterValues).some((v) => (Array.isArray(v) ? v.length > 0 : Boolean(v)));
}
/** Whether the Edit affordances (row pencil, view-panel Edit) show: the host's
 *  `showEdit` if given, else whether there is anything to edit. Exported for
 *  testing. */
export function showEditActions(fields, showEdit) {
    return showEdit ?? fields.some((f) => f.editable);
}
