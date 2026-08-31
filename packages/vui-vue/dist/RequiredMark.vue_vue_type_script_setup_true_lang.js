import { createElementBlock, createElementVNode, defineComponent, normalizeClass, openBlock, unref } from "vue";
import { REQUIRED_MARK } from "@viliha/vui-core";
//#region src/RequiredMark.vue?vue&type=script&setup=true&lang.ts
var RequiredMark_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RequiredMark",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("svg", {
				class: normalizeClass(unref(REQUIRED_MARK)),
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				"stroke-width": "2.5",
				"stroke-linecap": "round",
				"aria-label": "required"
			}, [..._cache[0] || (_cache[0] = [
				createElementVNode("line", {
					x1: "12",
					y1: "5",
					x2: "12",
					y2: "19"
				}, null, -1),
				createElementVNode("line", {
					x1: "5.5",
					y1: "8.5",
					x2: "18.5",
					y2: "15.5"
				}, null, -1),
				createElementVNode("line", {
					x1: "18.5",
					y1: "8.5",
					x2: "5.5",
					y2: "15.5"
				}, null, -1)
			])], 2);
		};
	}
});
//#endregion
export { RequiredMark_vue_vue_type_script_setup_true_lang_default as default };

