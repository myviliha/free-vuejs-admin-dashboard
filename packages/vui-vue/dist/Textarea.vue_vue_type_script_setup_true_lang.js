import { computed, createElementBlock, defineComponent, mergeModels, normalizeClass, openBlock, useModel, vModelText, withDirectives } from "vue";
import { TEXTAREA_BASE, cn } from "@viliha/vui-core";
//#region src/Textarea.vue?vue&type=script&setup=true&lang.ts
var Textarea_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Textarea",
	props: /*@__PURE__*/ mergeModels({ class: {} }, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const props = __props;
		const classes = computed(() => cn(TEXTAREA_BASE, props.class));
		return (_ctx, _cache) => {
			return withDirectives((openBlock(), createElementBlock("textarea", {
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => model.value = $event),
				"data-slot": "textarea",
				class: normalizeClass(classes.value)
			}, null, 2)), [[vModelText, model.value]]);
		};
	}
});
//#endregion
export { Textarea_vue_vue_type_script_setup_true_lang_default as default };

