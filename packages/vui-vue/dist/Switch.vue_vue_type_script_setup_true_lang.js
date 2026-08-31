import { computed, createBlock, createVNode, defineComponent, mergeModels, normalizeClass, openBlock, unref, useModel, withCtx } from "vue";
import { SwitchRoot, SwitchThumb } from "reka-ui";
import { SWITCH_ROOT, SWITCH_THUMB, cn } from "@viliha/vui-core";
//#region src/Switch.vue?vue&type=script&setup=true&lang.ts
var Switch_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Switch",
	props: /*@__PURE__*/ mergeModels({
		size: { default: "default" },
		disabled: { type: Boolean },
		class: {}
	}, {
		"modelValue": { type: Boolean },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const props = __props;
		const classes = computed(() => cn(SWITCH_ROOT, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SwitchRoot), {
				modelValue: model.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => model.value = $event),
				"data-slot": "switch",
				"data-size": __props.size,
				disabled: __props.disabled,
				class: normalizeClass(classes.value)
			}, {
				default: withCtx(() => [createVNode(unref(SwitchThumb), {
					"data-slot": "switch-thumb",
					class: normalizeClass(unref(SWITCH_THUMB))
				}, null, 8, ["class"])]),
				_: 1
			}, 8, [
				"modelValue",
				"data-size",
				"disabled",
				"class"
			]);
		};
	}
});
//#endregion
export { Switch_vue_vue_type_script_setup_true_lang_default as default };

