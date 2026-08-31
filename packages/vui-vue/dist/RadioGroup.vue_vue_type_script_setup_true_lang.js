import { computed, createBlock, defineComponent, mergeModels, normalizeClass, openBlock, renderSlot, unref, useModel, withCtx } from "vue";
import { RadioGroupRoot } from "reka-ui";
import { RADIO_GROUP_ROOT, cn } from "@viliha/vui-core";
//#region src/RadioGroup.vue?vue&type=script&setup=true&lang.ts
var RadioGroup_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RadioGroup",
	props: /*@__PURE__*/ mergeModels({ class: {} }, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const props = __props;
		const value = useModel(__props, "modelValue");
		const classes = computed(() => cn(RADIO_GROUP_ROOT, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(RadioGroupRoot), {
				modelValue: value.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
				class: normalizeClass(classes.value),
				"data-slot": "radio-group"
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["modelValue", "class"]);
		};
	}
});
//#endregion
export { RadioGroup_vue_vue_type_script_setup_true_lang_default as default };

