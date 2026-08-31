import type { BehaviourConfig, FilterValues, FormActionsConfig, FormRow, FormSection, FormSlot, IoActionsConfig, RowId, ServerQuery } from "@viliha/vui-core";
import type { Component } from "vue";
import type { VueIcon } from "./io-actions";
import type { RecordField } from "./record-field";
/**
 * `RecordView`'s props, declared here rather than in the SFC for the same reason the record form's are:
 * **`<script setup>` cannot export a type**, so a props interface written inline is private and the
 * generated `.d.ts` will not compile. A host reading these finds the documentation with them.
 *
 * **These are React's names, including the callbacks.** A `RecordView` config object written for one
 * edition type-checks against the other, which is the promise this epic is making, and
 * `onDataChange`'s return value is load-bearing (`RecordView` waits for a promise before reloading),
 * which an emit could not carry.
 */
export interface RecordViewProps<T extends {
    id: RowId;
}> {
    title: string;
    singular: string;
    /** The collection's glyph, shown in the app's top bar and on the identity column's header. */
    icon?: Component;
    fields: RecordField<T>[];
    /** Seed rows for a client-managed table. Omit in `fetcher`/`manual` mode (the server owns the
     *  data) or for a read-only list. */
    initialData?: T[];
    /** Factory for a blank row, used by the Add action. Omit it (and `onCreate`) for a read-only list:
     *  the "+ New" button is then hidden. */
    makeEmptyRow?: () => T;
    getPrimary: (row: T) => {
        title: string;
        initials: string;
        subtitle?: string;
    };
    /** Add/Edit form presentation: `"panel"` slide-over (default) or `"page"` full-page. */
    formMode?: "panel" | "page";
    /** Full-page form column count (page mode only). Default 1. */
    formColumns?: 1 | 2;
    /** Navigate Home from the page-form breadcrumb (e.g. `router.push`). */
    onHome?: () => void;
    /** Intro text for the page-form documentation panel ("about this form"). */
    formDescription?: string;
    /** Controlled rows. When set, `RecordView` renders these and reports edits via `onDataChange`
     *  instead of holding rows itself. */
    data?: T[];
    /** Receives the next rows array after an add, edit, delete or restore.
     *
     *  In `manual`/`fetcher` mode this is your persist hook, and **returning a promise matters**:
     *  `RecordView` waits for it before reloading, so the reload sees your write instead of racing it.
     *  Return nothing and the reload fires immediately, which is only right when you persist
     *  elsewhere. */
    onDataChange?: (rows: T[]) => void | Promise<void>;
    /** When set, the add button calls this (e.g. navigate to a create route) instead of opening the
     *  built-in form. */
    onCreate?: () => void;
    /** When set, opening/editing a row navigates instead of opening the built-in overlay form. */
    onView?: (id: RowId) => void;
    onEdit?: (id: RowId) => void;
    /** Notified whenever the Add / View / Edit form opens, so field data (FK option catalogues) can be
     *  loaded when a user actually opens a form rather than on every table mount. Pure notification: it
     *  does not suppress the form, unlike `onCreate`/`onView`/`onEdit`, which redirect. */
    onFormOpen?: (mode: "create" | "edit" | "view", row?: T) => void;
    /** Persist this view's filter / sort / page under this key (e.g. the route), so the work survives
     *  leaving and returning. */
    persistKey?: string;
    /** Allow dragging a column's right edge to resize it. Default `true` (React's env default with
     *  `NEXT_PUBLIC_RESIZABLE_COLUMNS` unset), so a long value in a narrow column is always
     *  reachable. */
    resizableColumns?: boolean;
    /** Called from the Filter panel's Search (and Clear) when fields are `filterable`. Receives the
     *  collected per-field values; run your own query or client-side filtering here. In per-field mode
     *  the panel does not match rows itself, so the behaviour is entirely yours. */
    onFilter?: (values: FilterValues<T>) => void;
    /** Show skeleton rows instead of the table body while data loads. Ignored in `fetcher` mode, where
     *  the fetch owns the loading state. */
    loading?: boolean;
    /** Server-side mode. `RecordView` does not filter, sort or paginate `data`: it renders it as the
     *  current page verbatim and reports query state via `onQueryChange`. Pair with `rowCount`,
     *  `loading` and `onQueryChange`. */
    manual?: boolean;
    /** Total row count on the server, which drives the footer and the page count in `manual` mode. */
    rowCount?: number;
    /** Server mode: called with the full query whenever page, page size, sort or the keyword changes
     *  (and on the Filter panel's Search/Clear). Fires once on mount for the initial load. */
    onQueryChange?: (query: ServerQuery<T>) => void;
    /** Server data source. Providing it turns on `manual` and hands `RecordView` the read path: it
     *  calls this on every query change and manages the rows, the total, the loading state and the
     *  cache itself. The `signal` aborts superseded requests. If both are set, `fetcher` wins. */
    fetcher?: (query: ServerQuery<T>, signal: AbortSignal) => Promise<{
        rows: T[];
        total: number;
    }>;
    /** Namespaces the `fetcher` response cache. Responses are cached per query and survive remounts,
     *  so returning to a tab is instant. Omit and nothing is cached. */
    cacheKey?: string;
    /** `fetcher` cache tuning, or `false` to never cache a page. A cached page is only ever used to
     *  paint instantly: the server is asked on every query regardless. `ttlMs` bounds how old a page
     *  may be to be painted at all. Default `{ max: 50, ttlMs: 60000 }`. */
    cache?: false | {
        max?: number;
        ttlMs?: number;
    };
    /** Keep a fetched page in memory across a remount. Default `true` (React's env default with
     *  `NEXT_PUBLIC_KEEP_ALIVE_TABS` unset). `false` turns the cross-mount cache off entirely, because
     *  holding a page in memory across a remount is the same feature as keeping the page mounted. */
    keepAlive?: boolean;
    /** Called when a `fetcher` request rejects (non-abort). The previously loaded data stays. */
    onError?: (error: unknown, query: ServerQuery<T>) => void;
    /** Max characters any cell shows before truncating to one line with an ellipsis and a hover
     *  tooltip. Default 25 (React's env default). Per-field `maxChars` overrides it. */
    maxCellChars?: number;
    /** Initial rows per page, clamped to `maxPageSize`. Default 25 (React's env default). */
    defaultPageSize?: number;
    /** Ceiling for the page-size selector (options above it are hidden). Default unbounded. In server
     *  mode the data layer must enforce this too: the client's requested size is not trusted. */
    maxPageSize?: number;
    /** Header for the leading identity column. Default "Name". */
    nameLabel?: string;
    /** Field key the identity column sorts by, so its header toggles sort and shows a caret. Defaults
     *  to the first `hideInTable` field marked `sortable`. Neither → the header stays static. */
    nameSortKey?: Extract<keyof T, string>;
    /** Where the identity column sits among the field columns: `"first"` (default), `"last"`,
     *  `"hidden"`, or a number of field columns that come before it. */
    identityColumn?: number | "first" | "last" | "hidden";
    /** Show the Import menu. Default `true`. */
    showImport?: boolean;
    /** What the Import menu offers. An array replaces the shipped entries, a function receives them.
     *  Falls back to `VuiProvider`'s `table.importActions`. */
    importActions?: IoActionsConfig<T, VueIcon>;
    /** What the Export menu offers, same shape. Use `ctx.query` to ask your API for everything that
     *  matches rather than the page on screen. */
    exportActions?: IoActionsConfig<T, VueIcon>;
    /** Show the Export menu. Default `true`. */
    showExport?: boolean;
    /** Show the "+ {singular}" add button (still also requires `onCreate` or `makeEmptyRow`). */
    showAdd?: boolean;
    /** The form's rows: which sections sit side by side on each one. Up to three stay readable. */
    formRows?: FormRow[];
    /** Section metadata (order, description) when you are not declaring rows. */
    sections?: FormSection[];
    /** Behaviour overrides for this table only: what a row click does, whether delete confirms, how
     *  long the saved-row highlight lasts. Falls back to `VuiProvider`'s `behaviour`. */
    behaviour?: BehaviourConfig;
    /** Footer buttons for the form. An array replaces Cancel + Save (or Close + Edit in view mode); a
     *  function receives those defaults. Falls back to `VuiProvider`'s `form.actions`. */
    formActions?: FormActionsConfig<T>;
    /** Your own content between the form's fields. Each slot renders as a full-width row inside its
     *  section, so it inherits the card, separators and padding. */
    formSlots?: FormSlot<T, unknown>[];
    /** Show the row Edit action and the Edit button on the view panel. Defaults to whether any field
     *  is `editable`, so a read-only list gets no Edit affordance instead of one that opens an empty
     *  form. */
    showEdit?: boolean;
    /** Show the Filter panel. Default `true`. */
    showFilter?: boolean;
    /** Show the Sort menu. Default `true`. */
    showSort?: boolean;
    /** Show the pagination footer. `false` in client mode renders every row (no slicing). */
    showPagination?: boolean;
    /** Show row selection: the checkbox column, bulk Actions and Clear selection. `false` also removes
     *  drag-to-reorder, which shares the leading column. */
    showSelection?: boolean;
    /** Show a Trash toggle, which switches the same table between live and soft-deleted rows.
     *  `RecordView` is display-only here: it never decides what "deleted" means. The host supplies the
     *  rows (`trashedData` in client mode, the `trash: true` query in server mode) and persists
     *  restores via `onRestore`. */
    showTrash?: boolean;
    /** Soft-deleted rows shown while Trash is active in **client mode**. Omit in `manual`/`fetcher`
     *  mode, where the host answers the `trash: true` query instead. */
    trashedData?: T[];
    /** Restore rows from Trash: one row, or the current selection, after a confirm. The host persists
     *  the restore; `RecordView` clears the selection and refetches (`fetcher`) or expects the host to
     *  drop the rows from `trashedData` (client). Providing this prop is what enables Restore. */
    onRestore?: (rows: T[]) => void | Promise<void>;
}
