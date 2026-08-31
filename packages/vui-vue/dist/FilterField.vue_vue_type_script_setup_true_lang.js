import { computed, createElementBlock, createElementVNode, defineComponent, normalizeClass, openBlock, renderSlot, toDisplayString, unref } from "vue";
import { FILTER_CONTROL, FILTER_LABEL, FILTER_ROW, cn } from "@viliha/vui-core";
//#region src/FilterField.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["for"];
/**
* One filter row: a label and its control side by side. **Must be a direct child of `FilterGrid`**,
* because `display: contents` is what makes the label and the control the grid's own cells. Drop it
* and nothing lines up across rows.
*/
var FilterField_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "FilterField",
	props: {
		label: {},
		htmlFor: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const control = computed(() => cn(FILTER_CONTROL, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(FILTER_ROW)) }, [createElementVNode("label", {
				for: __props.htmlFor,
				class: normalizeClass(unref(FILTER_LABEL))
			}, toDisplayString(__props.label), 11, _hoisted_1), createElementVNode("div", { class: normalizeClass(control.value) }, [renderSlot(_ctx.$slots, "default")], 2)], 2);
		};
	}
});
//#endregion
export { FilterField_vue_vue_type_script_setup_true_lang_default as default };

