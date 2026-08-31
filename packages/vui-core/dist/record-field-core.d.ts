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
import type { AsyncOption } from "./async-options-core.js";
import type { FormSlot } from "./config-core.js";
export type RowId = string | number;
export type FieldGroup = string;
/** Control kinds the Filter panel can render for a `filterable` field. Omitted
 *  or unknown kinds render a text input — extend this union as you add controls
 *  (e.g. `"daterange"`, `"multiselect"`). */
export type FilterControl = "text" | "number" | "date" | "select" | "combobox" | "checkbox";
/** Per-field Filter-panel config. `filterable: true` is shorthand for
 *  `{ control: "text" }`; pass an object to pick the control and shape it, so
 *  the front end can compose a different filter form per request (Name + Code as
 *  text for one screen, a status dropdown + tag checkboxes for another). */
export interface FieldFilter<T = Record<string, unknown>> {
    /** Which control to render. Default `"text"`. */
    control?: FilterControl;
    /** Label above the control. Defaults to the field's `label`. */
    label?: string;
    /** Placeholder for text / number / combobox inputs. */
    placeholder?: string;
    /** Choices for `select` / `combobox` / `checkbox`. A static array, or a
     *  function of the current filter values for cascading filters (e.g. Country
     *  options derived from the selected Region) — the panel recomputes it on every
     *  change and clears a value that's no longer valid. Falls back to the field's
     *  own (static) `options` when omitted. */
    options?: {
        value: string;
        label: string;
    }[] | ((values: FilterValues<T>) => {
        value: string;
        label: string;
    }[]);
    /** Async option source — lazy-load filter options on open + debounced search
     *  instead of a static array. `values` is the current filter values (read a
     *  cascade parent from it). Only for `select` / `combobox` controls. */
    loadOptions?: (args: {
        search: string;
        signal: AbortSignal;
        values: FilterValues<T>;
    }) => Promise<AsyncOption[]>;
    /** Resolve one already-set value's label without loading the full list. */
    resolveOption?: (value: string) => Promise<AsyncOption | null>;
    /** Sibling field keys this filter cascades from; a change clears its options +
     *  value and the next open re-runs `loadOptions`. */
    dependsOn?: Extract<keyof T, string>[];
}
/** Values collected by the Filter panel, keyed by field. Single-value controls
 *  yield a `string`; multi-select `checkbox` yields a `string[]`. This object is
 *  the contract you hand to your own query / refetch via {@link RecordView}'s
 *  `onFilter` — in per-field mode the panel gathers values but does not match
 *  rows itself, so the search is yours (client-side or server-side). */
export type FilterValues<T> = Partial<Record<Extract<keyof T, string>, string | string[]>>;
/** Current sort — the field key and direction, or `null` for unsorted. */
export type SortState = {
    key: string;
    dir: "asc" | "desc";
};
/** The full query state reported by `onQueryChange` in server (`manual`) mode —
 *  everything needed to build a request. `page` is 1-based. */
export type ServerQuery<T> = {
    page: number;
    pageSize: number;
    sort: SortState | null;
    /** The keyword box. */
    search: string;
    /** Per-field filter values (from `filterable` fields). */
    filters: FilterValues<T>;
    /** Trash view active — the host should return soft-deleted rows instead of
     *  live ones (only meaningful when `showTrash` is enabled). */
    trash: boolean;
};
export interface RecordField<T, Node = unknown, Icon = unknown> {
    key: Extract<keyof T, string>;
    label: string;
    /** Help text shown in the page-form documentation panel. */
    description?: string;
    icon?: Icon;
    editable?: boolean;
    /** Mark the field mandatory — shows a `*` next to its label. */
    required?: boolean;
    /** Column alignment. Omit to auto-align: numbers and short codes (≤ 4 chars)
     *  center, everything else stays left. Set explicitly to override. */
    align?: "left" | "center" | "right";
    /** Form section this field belongs to. Any title works; sections render in
     *  the order their fields first appear (ungrouped fields fall under
     *  "General"). E.g. `"Organization information"`, `"Brand assets"`. */
    group?: FieldGroup;
    /** Initial column width in px (user-resizable via the header handle). */
    width?: number;
    /** Show a copy-to-clipboard action on hover (e.g. email, phone). */
    copyable?: boolean;
    /** Max characters this cell shows before truncating with an ellipsis + hover
     *  tooltip. Overrides the view's `maxCellChars`. Set `0` to never truncate. */
    maxChars?: number;
    /** Show in the detail panel only, not as a table column (e.g. first/last name). */
    hideInTable?: boolean;
    /** Whether this field can be sorted — decoupled from column visibility.
     *  Default: sortable iff it's a visible column (`!hideInTable`), the historic
     *  behavior. Set `true` to sort a field with no column (e.g. a `hideInTable`
     *  name shown via `getPrimary`); set `false` to keep a visible column
     *  unsortable. Controls both the Sort dropdown and the column-header toggle. */
    sortable?: boolean;
    /** Custom, non-editable cell/value renderer. */
    render?: (row: T) => Node;
    /** If set, the field becomes a choice field: the Add/Edit form renders a
     *  `Select` (or `Combobox`), and the selection toolbar offers a "Set {label}"
     *  bulk action. A static array, or a function of the current draft for
     *  dependent/cascading options (e.g. Country choices derived from the selected
     *  Region) — the form recomputes it as the draft changes and clears the field
     *  when its value is no longer a valid option. (Bulk "Set {label}" only lists
     *  static-array option fields, since it has no single draft to resolve against.) */
    options?: {
        value: string;
        label: string;
    }[] | ((draft: Partial<T>) => {
        value: string;
        label: string;
    }[]);
    /** Form control for the Add/Edit panel/page. Default `"text"` (auto-growing
     *  textarea). `"number"`/`"date"` render the matching native input,
     *  `"checkbox"` a boolean toggle. For a field with `options`: default renders a
     *  `Select`, and `"combobox"` renders a searchable `Combobox` (type-to-filter)
     *  — use it for long option lists. */
    input?: "text" | "number" | "date" | "combobox" | "checkbox";
    /** Minimum bound, enforced before Save. For `input:"number"` it's the min
     *  value; otherwise the min character length. */
    min?: number;
    /** Maximum bound, enforced before Save. For `input:"number"` it's the max
     *  value; otherwise the max character length. */
    max?: number;
    /** Regex the value must match (a `RegExp` or a source string). */
    pattern?: RegExp | string;
    /** Friendly message shown when `pattern`/`format` fails (else a default). */
    patternMessage?: string;
    /** Built-in format check: `"email"` or `"phone"` (US). `"phone"` also
     *  auto-formats the value as `(123) 456-7890` while typing. */
    format?: "email" | "phone";
    /** Custom rule. Return an error message to block Save, or `undefined`/`""`
     *  when valid. Receives the field value and the whole draft (cross-field). */
    validate?: (value: string, draft: T) => string | undefined;
    /** Trim leading/trailing whitespace from this field's value on Save. */
    trim?: boolean;
    /** Render a custom Add/Edit control — a checkbox, a radio group, a color
     *  picker, anything. Overrides the default control entirely (and takes
     *  priority over `options`/`input`). You get the current string value and an
     *  `onChange` to write it back; the surrounding label, required mark, and Save
     *  validation still come from the field. Read-only View uses `render`. */
    renderInput?: (props: {
        value: string;
        onChange: (value: string) => void;
        field: RecordField<T, Node, Icon>;
        invalid?: boolean;
    }) => Node;
    /** Async option source for a choice field — lazy-load options on form open +
     *  debounced search instead of a static `options` array. Use for large/remote
     *  reference lists (FK pickers): the form fetches only when opened, resolves a
     *  set value's label via one record (`resolveOption`), and searches server-side.
     *  `values` is the current draft (read a cascade parent from it). Pairs with
     *  `input: "combobox"` (searchable) or the default `Select`. */
    loadOptions?: (args: {
        search: string;
        signal: AbortSignal;
        values: Partial<T>;
    }) => Promise<AsyncOption[]>;
    /** Resolve one already-set value's label without loading the whole list
     *  (edit/view + preselected default). */
    resolveOption?: (value: string) => Promise<AsyncOption | null>;
    /** Multi-select: the field holds a **set** of option values (`T[key]` is a
     *  `string[]`). Pairs with `input:"combobox"` (searchable) or static `options`
     *  — the Add/Edit form renders a multi-select with removable chips, and the
     *  read cell shows the labels (up to `maxChipsInCell`, then "+N" in a popover).
     *  `required` means at least one selected. */
    multiple?: boolean;
    /** Batch companion to `resolveOption`: resolve the labels for all currently-set
     *  values in one call (never the whole list). Used for `multiple` fields, and
     *  for single-value read displays, where the values a table paints in one go
     *  are collected and asked for together — 50 rows become one request. */
    resolveOptions?: (values: string[]) => Promise<AsyncOption[]>;
    /** The label to show in read mode, straight from the row. Set this when your
     *  payload already carries the label next to the id (`{ countryId, country }`)
     *  and the field never resolves anything: it paints instantly, with no
     *  request. Unlike `render` it only supplies the text, so the cell keeps its
     *  alignment, copy button and truncation. Return `""` for "no value". Read
     *  displays only — the edit control is unaffected. */
    displayValue?: (row: Partial<T>) => string;
    /** Max chips shown in a `multiple` read cell before collapsing to "+N".
     *  Default 3. */
    maxChipsInCell?: number;
    /** Sibling field keys this choice cascades from. A change clears the cached
     *  options + this field's value; the next open re-runs `loadOptions`. */
    dependsOn?: Extract<keyof T, string>[];
    /** Expose this field in the Filter panel. When ANY field is filterable, the
     *  panel switches from the single keyword box to a labeled control per field
     *  plus Search / Clear. `true` = a text input; pass a {@link FieldFilter} to
     *  choose the control (dropdown, checkbox, combobox, number, date …) so the
     *  filter form is composed per request. The panel only gathers values — wire
     *  matching through RecordView's `onFilter`. Omit to leave the field out. */
    filterable?: boolean | FieldFilter<T>;
}
/**
 * A field with the three framework-owned values removed, and the reason it is `Omit` rather than a
 * hand-written subset is variance.
 *
 * `renderInput` takes a `RecordField` as a **parameter**, so a function declared over
 * `RecordField<T, unknown, unknown>` will not accept React's `RecordField<T, ReactNode, IconType>`:
 * the parameter position flips the direction and `unknown` is not assignable to `ReactNode`. Every
 * rule below reads only the declarative half anyway, so it asks for exactly that half. Deriving it
 * with `Omit` also means a field added to `RecordField` is in scope here for free, which the wave 4
 * post-mortem says is the difference between this working and a guessed subset.
 */
export type FieldRules<T> = Omit<RecordField<T>, "render" | "renderInput" | "icon">;
/** Resolve a choice field's form options against the current draft: a static
 *  array, or a function of the draft (cascading pickers). */
export declare function resolveOptions<T>(opts: RecordField<T>["options"], draft: Partial<T>): {
    value: string;
    label: string;
}[];
/** Format US phone digits progressively while typing: 1234567890 →
 *  (123) 456-7890. Partial input stays readable. Exported for testing. */
export declare function formatPhone(value: string): string;
/**
 * Validate a field value against its declarative rules — returns the first error
 * message, or `undefined` when valid. Order: required → min/max → pattern →
 * format → custom. Exported for testing.
 */
export declare function validateField<T>(field: FieldRules<T>, raw: string, draft: T): string | undefined;
/**
 * The async cache key for a cascading field: its parents' current values, joined.
 *
 * **The separator is `\u0000`, and a space was a real collision.** `dependsOn: ["region","city"]` with
 * `("north", "east coast")` and `("north east", "coast")` both produced `"north east coast"`, so the
 * cache was not invalidated and the child kept the previous parent's options. React joined with a
 * space in three of its five call sites and with `\u0000` in the other two, which is how a rule ends up
 * being two rules; this is the one function both editions call.
 */
export declare function resetKeyOf<T>(field: Pick<FieldRules<T>, "dependsOn">, values: Partial<T> | T): string;
/** A field whose stored value is an async id (from `loadOptions`/`resolveOption`
 *  with no static `options`) — its read display must resolve the id to a label. */
export declare function isAsyncLabeled<T>(f: FieldRules<T>): boolean;
/**
 * Place a form's slots within one section, keyed by the field each follows.
 * The `""` bucket holds the ones with nothing to follow, which close out the
 * section. `after` puts a slot in that field's own section, `group` names a
 * section directly, and neither means the default one. Exported for testing.
 */
export declare function groupSlots<T, Node = never>(fields: readonly FieldRules<T>[], slots: readonly FormSlot<T, Node>[] | undefined, group: string): Map<string, FormSlot<T, Node>[]>;
/** Empty-table message: a keyword search, active per-field filters, or a
 *  genuinely empty list read differently. Exported for testing. */
export declare function emptyStateLabel<T>(filter: string, filterValues: FilterValues<T>): string;
/**
 * Whether any per-field filter currently holds a value.
 *
 * **One predicate, because two would disagree.** The empty-state wording above and a "filters active"
 * affordance elsewhere must answer this identically: the moment someone decides a numeric `0` counts as
 * a filter and fixes only one of them, a table reads "No records yet." while the chip says filters are
 * on, and the person looking at it has no way to tell which is lying.
 */
export declare function hasActiveFilters<T>(filterValues: FilterValues<T>): boolean;
/** Whether the Edit affordances (row pencil, view-panel Edit) show: the host's
 *  `showEdit` if given, else whether there is anything to edit. Exported for
 *  testing. */
export declare function showEditActions<T>(fields: readonly FieldRules<T>[], showEdit?: boolean): boolean;
