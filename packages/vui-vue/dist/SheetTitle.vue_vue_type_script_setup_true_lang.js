import { computed, createBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { DialogTitle } from "reka-ui";
import { SHEET_TITLE, cn } from "@viliha/vui-core";
//#region src/SheetTitle.vue?vue&type=script&setup=true&lang.ts
var SheetTitle_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "SheetTitle",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(SHEET_TITLE, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(DialogTitle), {
				class: normalizeClass(classes.value),
				"data-slot": "sheet-title"
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["class"]);
		};
	}
});
//#endregion
export { SheetTitle_vue_vue_type_script_setup_true_lang_default as default };

