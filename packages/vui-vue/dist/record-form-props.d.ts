import type { BehaviourConfig, FormActionsConfig, FormRow, FormSection, FormSlot, RowId } from "@viliha/vui-core";
import type { Crumb } from "./Breadcrumbs.vue";
import type { RecordField } from "./record-field";
/**
 * The record form's props, declared once.
 *
 * `RecordDetailPanel` adds `layout`, and `RecordForm` / `RecordFormPanel` fix it, so all three are
 * checked against this rather than each restating twenty-two props — and a host reading any of them
 * finds the same documentation. `onSave` and `onCancel` are emits rather than props in this edition,
 * which is why they are not here.
 */
export interface RecordFormProps<T extends {
    id: RowId;
}> {
    fields: RecordField<T>[];
    /** Initial values. The form edits a buffered copy until Save. */
    row: T;
    singular: string;
    getPrimary: (row: T) => {
        title: string;
        initials: string;
        subtitle?: string;
    };
    /** Read-only (View) rather than editable (Edit / Add). */
    readOnly?: boolean;
    /** Switch a read-only form into edit mode. Present means the footer offers Edit. */
    onEdit?: () => void;
    /** `"panel"` = slide-over (default); `"page"` = full-page form. */
    layout?: "panel" | "page";
    /** Page-form column count, kept for the pre-rows API: `2` puts two sections on a row. */
    columns?: 1 | 2;
    /** A new, unsaved record — drives the "Create new …" breadcrumb. */
    isNew?: boolean;
    /** Plural collection title (e.g. "Organizations"), the clickable parent crumb. */
    title?: string;
    onHome?: () => void;
    /** Intro text for the documentation panel beside a page form. */
    formDescription?: string;
    /** Persist the in-progress draft under this key (e.g. the route), so a half-filled form survives
     *  leaving and returning. */
    persistKey?: string;
    /** Footer buttons: an array replaces the shipped pair, a function receives them. Falls back to
     *  `VuiProvider`'s `form.actions`. */
    formActions?: FormActionsConfig<T>;
    /** Your own content between the fields. Each slot is a full-width row inside its section. */
    formSlots?: FormSlot<T, unknown>[];
    behaviour?: BehaviourConfig;
    /** Which sections sit side by side on each row. Up to three stay readable. */
    formRows?: FormRow[];
    /** Section metadata (order, description) when you are not declaring `formRows`. */
    sections?: FormSection[];
    /** Page-form breadcrumb override. Replaces `Home › {title} › Create/Update {singular}`. */
    crumbs?: Crumb[];
}
