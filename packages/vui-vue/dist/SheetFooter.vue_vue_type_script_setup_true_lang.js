import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { SHEET_FOOTER, cn } from "@viliha/vui-core";
//#region src/SheetFooter.vue?vue&type=script&setup=true&lang.ts
var SheetFooter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "SheetFooter",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(SHEET_FOOTER, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(classes.value),
				"data-slot": "sheet-footer"
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { SheetFooter_vue_vue_type_script_setup_true_lang_default as default };

