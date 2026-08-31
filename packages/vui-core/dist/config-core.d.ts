/**
 * The configuration contract, framework-free.
 *
 * `config.tsx` was 525 lines with **sixteen React references**: three type fields and the provider. So
 * it was a framework-free contract wearing a React provider, and the contract is the half both editions
 * need. A host writes one config object and it type-checks against either edition, which is the promise
 * of selling two editions of one system.
 *
 * **Three fields carry a framework value, and each takes one generic with a default.** `FormSlot`'s
 * `render` returns a node, and `IoAction` and `FormAction` carry an icon component. React re-exports
 * each bound to `React.ReactNode` and `React.ComponentType`, so its public API is unchanged; Vue binds
 * its own.
 *
 * This is the correction to wave 4's one failed move as much as it is wave 5's keystone: that attempt
 * invented a structural subset of `FormActionOutcome` without reading it, guessed narrower than the
 * real union, and broke three consumers. **Move the real type with the framework-specific parts
 * generic** is the version that works.
 */
/**
 * **`Icon` threads all the way down, and stopping at the leaves was a real bug.** A review found that
 * binding only the standalone `FormAction` and `IoAction` aliases left `VuiConfig`'s own action lists at
 * the `unknown` default, so `config={{ form: { actions: [{ icon: 42, … }] } }}` compiled and React threw
 * "Element type is invalid" when it rendered. A host reading the icon back out got a new compile error
 * for the same reason.
 */
export type VuiConfig<Icon = unknown> = {
    form?: FormConfig<Icon>;
    table?: TableConfig<Icon>;
    behaviour?: BehaviourConfig;
    orgSwitcher?: OrgSwitcherConfig;
};
/**
 * The organization switcher's chrome. The switching logic itself is not in here
 * on purpose: that belongs to `OrgProvider`'s `onSwitch`, because it is code
 * rather than configuration. This is what the control says and shows.
 */
export type OrgSwitcherConfig = {
    /** Heading above the list. Default `"Organizations"`. */
    heading?: string;
    /** Badge on the active row. Default `"Current"`. */
    currentLabel?: string;
    /** The row that creates one. Default `"Add organization"`. */
    addLabel?: string;
    /** Where that row goes. A route, so the destination is set once for the app
     *  rather than wired per screen: a registration wizard, your own create page,
     *  an external signup. The switcher renders a real link, so middle-click and
     *  "open in new tab" work. Override the behaviour entirely (a dialog, say)
     *  with the component's `onAdd`, which wins over this. */
    addHref?: string;
    /** Show the plan line under each name. Default `true`; turn it off for an app
     *  with no billing. */
    showPlan?: boolean;
    /** Show the create row at all. Default `true`, and it still needs an `onAdd`
     *  handler to appear. Set `false` where only an admin may create tenants. */
    showAdd?: boolean;
};
/** A tenant's theme, as handed to `ThemeConfigProvider`. Declared loosely here
 *  so `config` doesn't have to import the theme types. */
export type ThemeAwareOrgConfig = Record<string, string | undefined>;
/**
 * What the components do, as opposed to how they look. Every key here replaces
 * something that used to be hard-coded, and every one has a real consumer — the
 * config is not a place to park settings nothing reads.
 */
export type BehaviourConfig = {
    /** What clicking a row's name does. Default `"view"`. */
    rowClick?: "view" | "edit" | "none";
    /** Close the form after a successful save. Set `false` for a form that stays
     *  open so the next record can be entered. Default `true`. */
    closeOnSave?: boolean;
    /** How long a saved row stays highlighted, in milliseconds. `0` turns the
     *  highlight off. Default `1600`. */
    flashMs?: number;
    /** Ask before deleting a row. Default `true`. Turning this off makes delete
     *  immediate, so only do it where you have an undo. */
    confirmDelete?: boolean;
    /** Ask before discarding a form with unsaved edits. Default `false`, which is
     *  how Cancel has always behaved. */
    confirmDiscardWhenDirty?: boolean;
};
/** Datatable configuration. */
export type TableConfig<Icon = unknown> = {
    /**
     * Import and Export menu entries, app-wide. Same shape as `formActions`: an
     * array replaces what the theme ships, a function receives the shipped list
     * so you can add to it. Set these once to route every table's import and
     * export through your API instead of the browser.
     */
    importActions?: IoActionsConfig<any, Icon>;
    exportActions?: IoActionsConfig<any, Icon>;
};
/** Form-wide configuration. Grows as later slices land (body composition, …). */
export type FormConfig<Icon = unknown> = {
    /**
     * The footer buttons. Pass an array to replace them outright, or a function
     * to start from the ones the theme ships and change what you need:
     *
     * ```tsx
     * actions: (defaults) => [...defaults, saveAndNew]
     * ```
     *
     * Typed loosely here (`FormAction<never>` would fight variance) — the
     * component narrows it to its own row type.
     */
    actions?: FormActionsConfig<any, Icon>;
    /**
     * How a field reports a validation failure. Default `"tooltip"`.
     *
     * - `"tooltip"` highlights the control's border and puts the message on the
     *   field's info icon, so the form never grows a line of red text that shifts
     *   everything below it while someone is typing.
     * - `"text"` is the old behaviour: the message under the control.
     *
     * Either way the message is also exposed to assistive tech, because a border
     * colour and a hover are not available to everyone.
     */
    errorDisplay?: "tooltip" | "text";
    /**
     * @deprecated Since 1.59. Declare `rows` on the form instead: it says which
     * sections share each row, so the top row can hold two and the next three.
     * Still works, and goes away in 2.0.
     */
    sectionColumns?: SectionColumns;
};
/**
 * One section of a form: a titled card holding some of the fields.
 *
 * A section's width comes from how many share its row, so there is nothing to
 * set here for size: put one section on a row and it fills the row.
 */
export type FormSection = {
    /** The `group` on the fields that belong to it. */
    group: string;
    /** A line under the title, for what the section is for. */
    description?: string;
    /**
     * @deprecated Since 1.59. Width comes from the row now: put the section on a
     * row of its own instead. Ignored when `rows` is set; still honoured on the
     * old `sectionColumns` path, which goes away in 2.0.
     */
    span?: 1 | 2 | 3 | "full";
};
/**
 * One row of a form: the sections that sit side by side on it, left to right.
 *
 * This is how a form gets designed. "Two sections on the top row, three on the
 * bottom" is that sentence, written down:
 *
 * ```tsx
 * rows={[
 *   { sections: [{ group: "Customer" }, { group: "Delivery" }] },
 *   { sections: [{ group: "Items" }, { group: "Payment" }, { group: "Notes" }] },
 * ]}
 * ```
 *
 * Three sections to a row is the most that stays readable; past that the label
 * column starts squeezing the control. More than three wrap within the row.
 */
export type FormRow = {
    sections: FormSection[];
};
/**
 * @deprecated Since 1.59. Use `rows`, which lets each row hold a different
 * number of sections rather than forcing one count on the whole form. Removed
 * in 2.0.
 */
export type SectionColumns = 1 | 2 | 3;
/** What the footer buttons can be: a list, or a change to the shipped list. */
export type FormActionsConfig<T, Icon = unknown> = FormAction<T, Icon>[] | ((defaults: FormAction<T, Icon>[]) => FormAction<T, Icon>[]);
/** The form's live state, handed to every action callback. */
export type FormActionContext<T> = {
    /** Which form is open. `view` is the read-only panel. */
    mode: "create" | "edit" | "view";
    /** The draft as it stands, including any un-saved edits. */
    row: T;
    /** The draft differs from the record that was opened. */
    dirty: boolean;
    /** No field currently fails validation. */
    valid: boolean;
    /** Inline field errors, keyed by field key. */
    errors: Map<string, string>;
    /** Close the form (runs the same discard path as Cancel). */
    close: () => void;
    /** Put the draft back to the record that was opened. */
    reset: () => void;
    /** Switch a read-only panel into edit mode, when the host allows it. */
    edit?: () => void;
};
/**
 * Something of your own between the fields of a form: a callout, a preview, a
 * pair of custom controls. It renders as a full-width row inside the section, so
 * it inherits the card, the separators and the padding rather than floating
 * beside them.
 *
 * Slots live next to the form, not in the `fields` array, because that array is
 * the data contract: it drives the table, the filter panel and import/export as
 * well as the form. Mixing arbitrary markup into it would put layout into all
 * four.
 */
export type FormSlot<T, Node = unknown> = {
    id: string;
    /** Place it after this field. Omit to put it at the end of `group`. */
    after?: string;
    /** Which section it belongs to. Defaults to the last group, or "General". */
    group?: string;
    render: (ctx: FormActionContext<T>) => Node;
};
/** What the form does once an action succeeds. */
export type FormActionOutcome = 
/** Close the form. The default, and what Save does. */
"close"
/** Keep it open on the record just saved. */
 | "stay"
/** Open a blank record, for entering several in a row ("Save & New").
 *  Needs `makeEmptyRow` on the table; falls back to "stay" without it. */
 | "new";
/**
 * What a table can hand an Import or Export action to work with.
 *
 * The rows are what's on screen: filtered, sorted, and in `fetcher` mode only
 * the current page. When you need everything that matches, use `query` and ask
 * your API, rather than exporting the page someone happens to be looking at.
 */
export type IoContext<T> = {
    /** The rows currently displayed. */
    rows: T[];
    /** The fields, in display order, with their labels. */
    columns: {
        key: string;
        label: string;
    }[];
    /** The list's title, for a filename. */
    title: string;
    /** The active query in server mode: page, sort, search, filters, trash. Ask
     *  your API with this to export or count beyond the current page. */
    query?: ServerQueryLike;
    /** The file the person picked. Import only. */
    file?: File;
    /** Put rows into the table (import). In server mode, refetch instead. */
    applyRows: (rows: T[]) => void;
    /** Ask the table to reload from the server. */
    refetch: () => void;
};
/** Loosely typed here so `config` doesn't have to import the table's types. */
export type ServerQueryLike = {
    page: number;
    pageSize: number;
    search: string;
    trash: boolean;
    [key: string]: unknown;
};
/**
 * One entry in the Import or Export menu.
 *
 * The theme ships working ones (CSV, Excel, JSON, PDF) built from this same
 * type, so replacing or extending them is the same API, not a different one.
 * Point `onAct` at your API and the menu becomes a placeholder you filled in.
 */
export type IoAction<T, Icon = unknown> = {
    id: string;
    label: string;
    icon?: Icon;
    /** Do the work. Async is fine; the menu closes when it's called. */
    onAct: (ctx: IoContext<T>) => void | Promise<void>;
    /** Import only: open the file picker first and hand the file to `onAct`
     *  through `ctx.file`. Set `accept` to filter what can be chosen. */
    pickFile?: boolean;
    accept?: string;
    /** Hide it for some states, e.g. only offer "Export all" to an admin. */
    visible?: (ctx: IoContext<T>) => boolean;
};
/** A list of actions, or a change to the ones the theme ships. */
export type IoActionsConfig<T, Icon = unknown> = IoAction<T, Icon>[] | ((defaults: IoAction<T, Icon>[]) => IoAction<T, Icon>[]);
/** One footer button. */
export type FormAction<T, Icon = unknown> = {
    /** Stable identity. The shipped actions use `cancel`, `save`, `close`, `edit`,
     *  so returning one of those ids from `actions` replaces that button. */
    id: string;
    label: string;
    /** Matches `Button`'s variants; omit for the standard secondary button. */
    variant?: "primary" | "secondary" | "ghost" | "destructive";
    /** `start` pins the button to the left of the footer (Delete belongs there);
     *  everything else sits right, in array order. Default `end`. */
    align?: "start" | "end";
    icon?: Icon;
    /** What the button does. Return `false` to keep the form open; anything else
     *  (including nothing) closes it once the promise settles. */
    onAct: (ctx: FormActionContext<T>) => boolean | void | Promise<boolean | void>;
    /** Hide the button for some modes or rows. Shown when omitted. */
    visible?: (ctx: FormActionContext<T>) => boolean;
    /** Disable without hiding — a tooltip-free "not now". */
    disabled?: (ctx: FormActionContext<T>) => boolean;
    /** Run validation first and block when a field fails. Defaults to `true` for
     *  `variant: "primary"` and `false` for everything else, which is why Save
     *  validates and Cancel doesn't. */
    requiresValid?: boolean;
    /** What happens after the action succeeds. Default `"close"`. Set
     *  `after: "new"` on a saving action to get "Save & New". Ignored when the
     *  action returns `false`, which means it handled its own outcome. */
    after?: FormActionOutcome;
    /** Ask before acting. Use it for anything destructive. */
    confirm?: {
        title: string;
        body?: string;
        confirmLabel?: string;
    };
};
/**
 * The finished theme, as a value. These are the shipped defaults, and the
 * components read them from here rather than keeping their own copies, which is
 * what makes "the preconfigured theme is a config" true rather than a slogan.
 */
/**
 * The theme as shipped.
 *
 * **`satisfies` rather than an annotation**, and that is load-bearing. The preset carries no icons, so
 * pinning its `Icon` parameter makes it unmergeable: `VuiConfig<never>` fails contravariantly against
 * `VuiConfig<unknown>` because the action-list members are functions. Inferring the literal's own type
 * and checking it with `satisfies` keeps it assignable to every edition's binding while still failing
 * the build if a key stops being valid.
 */
export declare const vuiPreset: {
    behaviour: {
        rowClick: "view";
        closeOnSave: true;
        flashMs: number;
        confirmDelete: true;
        confirmDiscardWhenDirty: false;
    };
};
/** Identity helper for authoring a config with full type checking. */
export declare function defineConfig<Icon = unknown>(config: VuiConfig<Icon>): VuiConfig<Icon>;
/** Merge configs left to right; a later object overrides only the keys it sets. */
export declare function mergeConfig<Icon = unknown>(...configs: (VuiConfig<Icon> | undefined)[]): VuiConfig<Icon>;
/**
 * Which keys the person using the app may change for themselves, per section:
 * `{ behaviour: ["rowClick", "flashMs"] }`. Nothing is user-editable unless it
 * is listed here, because "the user can move the Save button" is chaos while
 * "the user prefers no row highlight" is a feature.
 */
export type UserConfigurable = {
    [K in keyof VuiConfig]?: readonly (keyof NonNullable<VuiConfig[K]>)[];
};
/** A user's saved choices, same shape as the config but partial throughout. */
export type VuiPreferences<Icon = unknown> = VuiConfig<Icon>;
export declare function filterUserPreferences<Icon = unknown>(preferences: VuiPreferences<Icon>, userConfigurable: UserConfigurable): VuiConfig<Icon>;
