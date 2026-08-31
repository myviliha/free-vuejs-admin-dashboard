import { computed, createElementBlock, defineComponent, mergeModels, normalizeClass, openBlock, useModel, vModelCheckbox, withDirectives } from "vue";
import { CHECKBOX, cn } from "@viliha/vui-core";
//#region src/Checkbox.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["value", "disabled"];
var Checkbox_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Checkbox",
	props: /*@__PURE__*/ mergeModels({
		value: {},
		disabled: { type: Boolean },
		class: {}
	}, {
		"modelValue": { type: [Boolean, Array] },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const props = __props;
		const classes = computed(() => cn(CHECKBOX, props.class));
		return (_ctx, _cache) => {
			return withDirectives((openBlock(), createElementBlock("input", {
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => model.value = $event),
				type: "checkbox",
				value: __props.value,
				disabled: __props.disabled,
				class: normalizeClass(classes.value)
			}, null, 10, _hoisted_1)), [[vModelCheckbox, model.value]]);
		};
	}
});
//#endregion
export { Checkbox_vue_vue_type_script_setup_true_lang_default as default };

