import type { ColAlign, FieldRules, FilterValues, IdentitySlot, IoAction, IoContext, RowId, SortState } from "@viliha/vui-core";
import { type Component, type ComputedRef, type InjectionKey, type Ref } from "vue";
import type { VueIcon } from "./io-actions";
import type { RecordField } from "./record-field";
/**
 * A row as the parts see it. **`id` is the only field they can name**, which is all any of them
 * needs: a cell reads its value through the field's `key`, so the parts stay free of the host's row
 * type and the injection key stays a single type rather than a generic one nothing can satisfy.
 */
export type RvRow = {
    id: RowId;
} & Record<string, unknown>;
/**
 * What the record view's toolbar, table and pager need from the view that owns them.
 *
 * **This exists because Vue has no local components inside a template.** React writes the whole table
 * as one 2,382-line function and reaches its own state directly; the equivalent here is four SFCs, and
 * four SFCs need the state. Threading seventy props through three components in the right order is the
 * alternative, and the record form already made this call for the same reason
 * (`record-form-context.ts`).
 *
 * Deliberately not exported from the package: it is how these four files talk to each other, not API.
 * A host configures the table through `RecordView`'s props, which are React's.
 */
export interface RecordViewContext<T extends RvRow = RvRow> {
    /** Plural collection title ("Customers"), the sub-toolbar's subject and the confirms' plural. */
    title: ComputedRef<string>;
    /** Singular record name ("customer"), the add button and every confirm's subject. */
    singular: ComputedRef<string>;
    /** The collection's glyph, which the identity column's header shows. */
    icon: ComputedRef<Component | undefined>;
    fields: ComputedRef<RecordField<T>[]>;
    getPrimary: (row: T) => {
        title: string;
        initials: string;
        subtitle?: string;
    };
    showSelection: ComputedRef<boolean>;
    showFilter: ComputedRef<boolean>;
    showSort: ComputedRef<boolean>;
    showImport: ComputedRef<boolean>;
    showExport: ComputedRef<boolean>;
    showAdd: ComputedRef<boolean>;
    showPagination: ComputedRef<boolean>;
    showTrash: ComputedRef<boolean>;
    /** Whether the Edit affordances show at all: `showEdit`, else whether anything is editable. */
    canEdit: ComputedRef<boolean>;
    /** Whether there is a way to create a record (`onCreate` or `makeEmptyRow`). */
    canAdd: ComputedRef<boolean>;
    /** Whether Restore is offered, which is whether the host gave us an `onRestore`. */
    canRestore: ComputedRef<boolean>;
    resizableColumns: ComputedRef<boolean>;
    maxCellChars: ComputedRef<number>;
    /** What a click on a row's name does. `"none"` leaves the name inert. */
    rowClick: ComputedRef<"view" | "edit" | "none">;
    /** The single keyword box (React calls this state `filter`). */
    keyword: Ref<string>;
    /** The per-field Filter panel's values, applied on its Search rather than per keystroke. */
    filterValues: Ref<FilterValues<T>>;
    sort: Ref<SortState | null>;
    /** The requested page. Read `safePage` to render: this one is not clamped. */
    page: Ref<number>;
    pageSize: Ref<number>;
    pageSizes: ComputedRef<number[]>;
    trash: Ref<boolean>;
    hidden: Ref<Set<string>>;
    selected: Ref<Set<RowId>>;
    /** Every field that is a column at all, hidden or not: the Options menu's list. */
    tableFields: ComputedRef<RecordField<T>[]>;
    /** The columns to render, with the identity slot wherever `identityColumn` put it. */
    orderedCols: ComputedRef<(RecordField<T> | IdentitySlot)[]>;
    /** Fields the Sort menu offers, which is not the same set as the visible columns. */
    sortFields: ComputedRef<RecordField<T>[]>;
    /** Fields that opted into the per-field Filter panel. */
    filterFields: ComputedRef<RecordField<T>[]>;
    nameLabel: ComputedRef<string>;
    /** The identity column's `*`, mirroring a required `hideInTable` name field. */
    nameRequired: ComputedRef<boolean>;
    /** What the identity header sorts by, or undefined to leave it static. */
    nameSortKey: ComputedRef<string | undefined>;
    colWidths: Ref<Record<string, number>>;
    totalWidth: ComputedRef<number>;
    alignOf: (key: string) => ColAlign;
    canSort: (field: FieldRules<T>) => boolean;
    /** The page on screen: sliced in client mode, the host's page verbatim in server mode. */
    paged: ComputedRef<T[]>;
    /** Whether anything matched at all, which decides the empty state (not `paged.length`). */
    hasRows: ComputedRef<boolean>;
    total: ComputedRef<number>;
    safePage: ComputedRef<number>;
    totalPages: ComputedRef<number>;
    rangeStart: ComputedRef<number>;
    rangeEnd: ComputedRef<number>;
    loading: ComputedRef<boolean>;
    allSelected: ComputedRef<boolean>;
    /** Static-option editable fields, which are the only ones bulk "Set …" can offer. */
    bulkFields: ComputedRef<RecordField<T>[]>;
    /** "No results for …" / "No matching records." / "No records yet.", decided by the shared rule. */
    emptyLabel: ComputedRef<string>;
    activeId: Ref<RowId | null>;
    flashId: Ref<RowId | null>;
    dragId: Ref<RowId | null>;
    dragOverId: Ref<RowId | null>;
    editing: Ref<{
        id: RowId;
        key: string;
    } | null>;
    cellDraft: Ref<string>;
    copiedKey: Ref<string | null>;
    startEdit: (row: T, key: string) => void;
    commitEdit: () => void;
    cancelEdit: () => void;
    copyValue: (cellKey: string, value: string) => void;
    toggleSort: (key: string) => void;
    clearSort: () => void;
    toggleHidden: (key: string) => void;
    showAllColumns: () => void;
    toggleTrash: () => void;
    clearSelection: () => void;
    toggleSelect: (id: RowId) => void;
    toggleSelectAll: () => void;
    setFilterValue: (key: string, value: string | string[]) => void;
    /** The Filter panel's Search: hand the values to the host and re-emit the query. */
    applyFilters: () => void;
    clearFilters: () => void;
    startResize: (key: string, event: MouseEvent) => void;
    nudgeColumn: (key: string, dir: -1 | 1) => void;
    setPageSize: (size: number) => void;
    prevPage: () => void;
    nextPage: () => void;
    addRow: () => void;
    /** What a row-name click does, per `behaviour.rowClick`. */
    openRow: (id: RowId) => void;
    openView: (id: RowId) => void;
    openEdit: (id: RowId) => void;
    duplicateRow: (id: RowId) => void;
    /** Delete, asking first unless the app turned the confirm off. */
    requestDelete: (id: RowId) => void;
    askRestore: (id: RowId) => void;
    askBulkDelete: () => void;
    askBulkRestore: () => void;
    bulkSetField: (key: string, value: string) => void;
    reorder: (sourceId: RowId, targetId: RowId) => void;
    openMenu: (id: RowId, x: number, y: number) => void;
    importMenu: ComputedRef<IoAction<T, VueIcon>[]>;
    exportMenu: ComputedRef<IoAction<T, VueIcon>[]>;
    /** Built per use, so an action always describes what is on screen right now. */
    ioContext: (file?: File) => IoContext<T>;
}
export declare const RECORD_VIEW: InjectionKey<RecordViewContext>;
/**
 * Throws with a message that names the fix. A toolbar or a table rendered outside the view has no rows,
 * no query and no handlers, so failing loudly at mount beats rendering an empty table that reads as a
 * data problem.
 */
export declare function useRecordView(): RecordViewContext;
