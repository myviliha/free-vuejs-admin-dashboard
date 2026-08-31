import { computed, createElementBlock, defineComponent, mergeModels, normalizeClass, openBlock, useModel, vModelText, withDirectives } from "vue";
import { INPUT, cn } from "@viliha/vui-core";
//#region src/Input.vue?vue&type=script&setup=true&lang.ts
var Input_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Input",
	props: /*@__PURE__*/ mergeModels({ class: {} }, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const props = __props;
		const classes = computed(() => cn(INPUT, props.class));
		return (_ctx, _cache) => {
			return withDirectives((openBlock(), createElementBlock("input", {
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => model.value = $event),
				class: normalizeClass(classes.value)
			}, null, 2)), [[vModelText, model.value]]);
		};
	}
});
//#endregion
export { Input_vue_vue_type_script_setup_true_lang_default as default };

