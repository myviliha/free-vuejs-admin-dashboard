import { type ComputedRef, type InjectionKey } from "vue";
/**
 * What a `FormItem` provides to the label, control, description and message beneath it.
 *
 * React derives these ids from a `useId` inside `FormItem` and reads them back through two contexts.
 * One `provide`/`inject` pair is the same thing in this framework's idiom.
 */
export interface FormFieldContext {
    controlId: string;
    descriptionId: string;
    messageId: string;
    error: ComputedRef<string | undefined>;
}
export declare const FORM_FIELD: InjectionKey<FormFieldContext>;
/**
 * The row's context, or a set of empty ids when a part is used outside a `FormItem`. Presentational
 * parts degrade rather than throw, because an unlabelled paragraph is a better failure than a blank
 * screen.
 */
export declare const useFormField: () => FormFieldContext;
/** For the one part that cannot degrade: wiring a control to ids that do not exist is worse. */
export declare function useFormFieldOrThrow(): FormFieldContext;
