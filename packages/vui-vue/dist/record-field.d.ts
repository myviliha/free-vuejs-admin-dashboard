import type { RecordField as CoreRecordField } from "@viliha/vui-core";
import { type Component, type Ref, type VNode } from "vue";
/**
 * The record vocabulary for Vue.
 *
 * **`RecordField` is an alias of the shared type, not a second declaration.** The core declares the
 * 130-line field description once with two type parameters for the values a framework owns, and each
 * edition binds them: React binds `ReactNode` and its Radix icon type, this binds `VNode` and
 * `Component`. **A `fields` array written for the React edition therefore type-checks here** apart from
 * the two callbacks that return markup, which is exactly the pair that cannot be shared.
 */
export type RecordField<T> = CoreRecordField<T, VNode | string | null, Component>;
export type { FieldFilter, FieldGroup, FieldRules, FilterControl, FilterValues, RowId, ServerQuery, SortState, } from "@viliha/vui-core";
/**
 * A `ref` that mirrors to `sessionStorage`, so a page's work survives leaving and returning.
 *
 * **The policy is shared with React, the reactivity is not** (`D18`). Restores on mount so a server
 * render and the first client render agree, and with no `key` it is a plain `ref`, so this is opt-in
 * and a component can always pass `undefined`.
 *
 * **`deep`, and it is not an optimisation question.** The seeds this is called with are objects — a
 * table's filter values, a form draft — and the idiomatic write is `state.value.status = "open"`. A
 * shallow watcher never sees it, so the composable would have persisted nothing at all for the one
 * shape it exists to persist.
 *
 * **No identity guard, unlike React's.** React needs one because its write effect runs on mount and
 * StrictMode runs it twice; a Vue watcher is not `immediate`, so the seed cannot be written on the way
 * in and the guard would only be a way to silently drop a value the user cleared back to it.
 */
export declare function usePersistentState<T>(key: string | undefined, initial: T): Ref<T>;
/** Drop a persisted key — e.g. once a form Save/Cancel discards its draft. */
export declare function clearPersisted(key: string | undefined): void;
