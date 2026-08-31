import { computed, createBlock, defineComponent, mergeModels, normalizeClass, openBlock, renderSlot, unref, useModel, withCtx } from "vue";
import { ToggleGroupRoot } from "reka-ui";
import { TOGGLE_GROUP_ROOT, cn } from "@viliha/vui-core";
//#region src/ToggleGroup.vue?vue&type=script&setup=true&lang.ts
var ToggleGroup_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ToggleGroup",
	props: /*@__PURE__*/ mergeModels({
		type: { default: "single" },
		variant: { default: "default" },
		class: {}
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const props = __props;
		const value = useModel(__props, "modelValue");
		const classes = computed(() => cn(TOGGLE_GROUP_ROOT, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ToggleGroupRoot), {
				modelValue: value.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
				type: props.type,
				"data-variant": props.variant,
				class: normalizeClass(classes.value),
				"data-slot": "toggle-group"
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"modelValue",
				"type",
				"data-variant",
				"class"
			]);
		};
	}
});
//#endregion
export { ToggleGroup_vue_vue_type_script_setup_true_lang_default as default };

