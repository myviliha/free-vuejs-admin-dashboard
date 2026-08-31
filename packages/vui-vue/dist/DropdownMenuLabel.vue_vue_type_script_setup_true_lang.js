import { computed, createBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { DropdownMenuLabel } from "reka-ui";
import { DROPDOWN_LABEL, cn } from "@viliha/vui-core";
//#region src/DropdownMenuLabel.vue?vue&type=script&setup=true&lang.ts
var DropdownMenuLabel_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DropdownMenuLabel",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(DROPDOWN_LABEL, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(DropdownMenuLabel), {
				"data-slot": "dropdown-menu-label",
				class: normalizeClass(classes.value)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["class"]);
		};
	}
});
//#endregion
export { DropdownMenuLabel_vue_vue_type_script_setup_true_lang_default as default };

