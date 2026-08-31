import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { BUTTON_BASE, BUTTON_SIZES, BUTTON_VARIANTS, cn } from "@viliha/vui-core";
//#region src/Button.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["type"];
var Button_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Button",
	props: {
		variant: { default: "default" },
		size: { default: "default" },
		type: { default: "button" },
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(BUTTON_BASE, BUTTON_VARIANTS[props.variant], BUTTON_SIZES[props.size], props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("button", {
				type: __props.type,
				class: normalizeClass(classes.value)
			}, [renderSlot(_ctx.$slots, "default")], 10, _hoisted_1);
		};
	}
});
//#endregion
export { Button_vue_vue_type_script_setup_true_lang_default as default };

