import { inject } from "vue";
//#region src/form-context.ts
var FORM_FIELD = Symbol("vui-form-field");
/**
* The row's context, or a set of empty ids when a part is used outside a `FormItem`. Presentational
* parts degrade rather than throw, because an unlabelled paragraph is a better failure than a blank
* screen.
*/
var useFormField = () => inject(FORM_FIELD, {
	controlId: "",
	descriptionId: "",
	messageId: "",
	error: { value: void 0 }
});
/** For the one part that cannot degrade: wiring a control to ids that do not exist is worse. */
function useFormFieldOrThrow() {
	const ctx = inject(FORM_FIELD, null);
	if (!ctx) throw new Error("FormControl must be used inside a FormItem");
	return ctx;
}
//#endregion
export { FORM_FIELD, useFormField, useFormFieldOrThrow };

