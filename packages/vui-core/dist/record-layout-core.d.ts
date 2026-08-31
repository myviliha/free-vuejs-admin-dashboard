/**
 * Where a record's fields sit, framework-free.
 *
 * These three decide the form's shape: which groups exist and in what order, which sections render, and
 * how the sections fall into rows. **A divergence here puts a field in the wrong section**, and no markup
 * or class assertion would see it, because both editions would be rendering correct markup for different
 * layouts.
 *
 * A field is only read for its `group`, so the array is structural while `T` stays the **row** type it
 * always was: callers write `orderedGroups<Row>(fields)`, and constraining `T` to the field shape broke
 * them. The distinction is easy to lose and a test caught it.
 */
import type { FormRow, FormSection, SectionColumns } from "./config-core.js";
/** The part of a field these functions read. A real `RecordField` carries far more. */
export interface GroupedField {
    group?: string;
}
/** Distinct field groups in first-appearance order (ungrouped → "General"). */
export declare function orderedGroups<T>(fields: readonly GroupedField[]): string[];
/**
 * The sections to render, in order. Declared sections come first in the order
 * you wrote them; any group that only exists on the fields is appended, so
 * adding a field with a new group never makes it disappear.
 *
 * Exported for testing.
 */
export declare function orderedSections<T>(fields: readonly GroupedField[], declared: FormSection[] | undefined): FormSection[];
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
export declare function resolveFormRows<T>(fields: readonly GroupedField[], rows: FormRow[] | undefined, sections: FormSection[] | undefined, sectionColumns: SectionColumns | undefined): FormRow[];
