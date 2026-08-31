import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { SHEET_HEADER, cn } from "@viliha/vui-core";
//#region src/SheetHeader.vue?vue&type=script&setup=true&lang.ts
var SheetHeader_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "SheetHeader",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(SHEET_HEADER, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(classes.value),
				"data-slot": "sheet-header"
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { SheetHeader_vue_vue_type_script_setup_true_lang_default as default };

