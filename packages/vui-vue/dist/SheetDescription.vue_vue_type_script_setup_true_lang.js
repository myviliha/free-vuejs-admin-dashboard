import { computed, createBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { DialogDescription } from "reka-ui";
import { SHEET_DESCRIPTION, cn } from "@viliha/vui-core";
//#region src/SheetDescription.vue?vue&type=script&setup=true&lang.ts
var SheetDescription_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "SheetDescription",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(SHEET_DESCRIPTION, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(DialogDescription), {
				class: normalizeClass(classes.value),
				"data-slot": "sheet-description"
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["class"]);
		};
	}
});
//#endregion
export { SheetDescription_vue_vue_type_script_setup_true_lang_default as default };

