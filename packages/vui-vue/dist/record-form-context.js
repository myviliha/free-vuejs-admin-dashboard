import { inject } from "vue";
//#region src/record-form-context.ts
var RECORD_FORM = Symbol("vui-record-form");
/**
* Throws with a message that names the fix. A body or footer rendered outside the panel has no draft
* to edit, so failing loudly at mount beats rendering an empty grid that looks like a data problem.
*/
function useRecordForm() {
	const ctx = inject(RECORD_FORM, null);
	if (!ctx) throw new Error("This part must be rendered inside <RecordForm> or <RecordFormPanel>. See https://vui.viliha.com/docs/record-form");
	return ctx;
}
//#endregion
export { RECORD_FORM, useRecordForm };

