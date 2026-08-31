import { computed, createBlock, defineComponent, mergeModels, normalizeClass, openBlock, renderSlot, unref, useModel, withCtx } from "vue";
import { Toggle } from "reka-ui";
import { TOGGLE_BASE, TOGGLE_SIZES, TOGGLE_VARIANTS, cn } from "@viliha/vui-core";
//#region src/Toggle.vue?vue&type=script&setup=true&lang.ts
var Toggle_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Toggle",
	props: /*@__PURE__*/ mergeModels({
		variant: { default: "default" },
		size: { default: "default" },
		class: {}
	}, {
		"pressed": { type: Boolean },
		"pressedModifiers": {}
	}),
	emits: ["update:pressed"],
	setup(__props) {
		const props = __props;
		const pressed = useModel(__props, "pressed");
		const classes = computed(() => cn(TOGGLE_BASE, TOGGLE_VARIANTS[props.variant], TOGGLE_SIZES[props.size], props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Toggle), {
				pressed: pressed.value,
				"onUpdate:pressed": _cache[0] || (_cache[0] = ($event) => pressed.value = $event),
				class: normalizeClass(classes.value),
				"data-slot": "toggle"
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["pressed", "class"]);
		};
	}
});
//#endregion
export { Toggle_vue_vue_type_script_setup_true_lang_default as default };

