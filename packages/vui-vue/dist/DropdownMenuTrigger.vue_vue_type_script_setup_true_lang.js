import { computed, createBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { DropdownMenuTrigger } from "reka-ui";
import { DROPDOWN_TRIGGER, DROPDOWN_TRIGGER_ACTIVE, DROPDOWN_TRIGGER_BARE, DROPDOWN_TRIGGER_IDLE, cn } from "@viliha/vui-core";
//#region src/DropdownMenuTrigger.vue?vue&type=script&setup=true&lang.ts
var DropdownMenuTrigger_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DropdownMenuTrigger",
	props: {
		active: { type: Boolean },
		bare: { type: Boolean },
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => props.bare ? cn(DROPDOWN_TRIGGER_BARE, props.class) : cn(DROPDOWN_TRIGGER, props.active ? DROPDOWN_TRIGGER_ACTIVE : DROPDOWN_TRIGGER_IDLE, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(DropdownMenuTrigger), {
				"data-slot": "dropdown-menu-trigger",
				class: normalizeClass(classes.value)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["class"]);
		};
	}
});
//#endregion
export { DropdownMenuTrigger_vue_vue_type_script_setup_true_lang_default as default };

