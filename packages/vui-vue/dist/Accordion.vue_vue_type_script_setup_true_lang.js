import { createBlock, defineComponent, mergeModels, normalizeClass, openBlock, renderSlot, unref, useModel, withCtx } from "vue";
import { AccordionRoot } from "reka-ui";
//#region src/Accordion.vue?vue&type=script&setup=true&lang.ts
var Accordion_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Accordion",
	props: /*@__PURE__*/ mergeModels({
		type: { default: "single" },
		collapsible: {
			type: Boolean,
			default: true
		},
		class: {}
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const model = useModel(__props, "modelValue");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(AccordionRoot), {
				modelValue: model.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => model.value = $event),
				"data-slot": "accordion",
				type: __props.type,
				collapsible: __props.collapsible,
				class: normalizeClass(_ctx.$props.class)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"modelValue",
				"type",
				"collapsible",
				"class"
			]);
		};
	}
});
//#endregion
export { Accordion_vue_vue_type_script_setup_true_lang_default as default };

