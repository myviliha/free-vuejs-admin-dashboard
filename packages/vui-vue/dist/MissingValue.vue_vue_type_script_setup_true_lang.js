import { createElementBlock, defineComponent, normalizeClass, openBlock, unref } from "vue";
import { RECORD_MISSING } from "@viliha/vui-core";
//#region src/MissingValue.vue?vue&type=script&setup=true&lang.ts
/**
* Nothing to show: an empty value, or a reference whose label never resolved (deleted record, failed
* request). Both are missing data, so both read the same. **The id is never shown** — it is not a
* value a reader can use, and React's version makes the same call.
*/
var MissingValue_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "MissingValue",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", { class: normalizeClass(unref(RECORD_MISSING)) }, "—", 2);
		};
	}
});
//#endregion
export { MissingValue_vue_vue_type_script_setup_true_lang_default as default };

