import type { FormAction, FormActionContext, FormRow, FormSlot } from "@viliha/vui-core";
import { type ComputedRef, type InjectionKey, type Ref } from "vue";
import type { RecordField } from "./record-field";
/**
 * What the record form's body and footer need from the panel that owns them.
 *
 * **This exists because Vue has no local components inside a template.** React writes the field grid
 * once as a `formBody` variable and drops it into both the page layout and the slide-over; the
 * equivalent here is a second SFC, and a second SFC needs the draft, the errors and the writers. Ten
 * props would be the alternative, and every one of them would have to be threaded through in the same
 * order by anything that ever wraps this.
 *
 * Deliberately not exported from the package: it is how these three files talk to each other, not API.
 */
export interface RecordFormContext<T = Record<string, unknown>> {
    fields: ComputedRef<RecordField<T>[]>;
    /** The buffered copy the form edits until Save. */
    draft: Ref<T>;
    /** Field key → inline message. Non-empty blocks Save. */
    errors: Ref<Map<string, string>>;
    readOnly: ComputedRef<boolean>;
    /** `"tooltip"` keeps the message off the layout; `"text"` puts it under the control. */
    errorDisplay: ComputedRef<"tooltip" | "text">;
    rows: ComputedRef<FormRow[]>;
    slots: ComputedRef<FormSlot<T, unknown>[] | undefined>;
    setField: (key: string, value: string | boolean | string[]) => void;
    blurField: (field: RecordField<T>) => void;
    actions: ComputedRef<FormAction<T, unknown>[]>;
    ctx: ComputedRef<FormActionContext<T>>;
    run: (action: FormAction<T, unknown>) => void | Promise<void>;
    /** Ask before discarding, when the app opted in and there is something to lose. */
    confirmDiscard: Ref<boolean>;
    discard: () => void;
    singular: ComputedRef<string>;
}
export declare const RECORD_FORM: InjectionKey<RecordFormContext>;
/**
 * Throws with a message that names the fix. A body or footer rendered outside the panel has no draft
 * to edit, so failing loudly at mount beats rendering an empty grid that looks like a data problem.
 */
export declare function useRecordForm(): RecordFormContext;
