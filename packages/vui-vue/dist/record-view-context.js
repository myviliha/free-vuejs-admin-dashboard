import { inject } from "vue";
//#region src/record-view-context.ts
var RECORD_VIEW = Symbol("vui-record-view");
/**
* Throws with a message that names the fix. A toolbar or a table rendered outside the view has no rows,
* no query and no handlers, so failing loudly at mount beats rendering an empty table that reads as a
* data problem.
*/
function useRecordView() {
	const ctx = inject(RECORD_VIEW, null);
	if (!ctx) throw new Error("This part must be rendered inside <RecordView>. See https://vui.viliha.com/docs/record-view");
	return ctx;
}
//#endregion
export { RECORD_VIEW, useRecordView };

