import { computed, createBlock, defineComponent, mergeModels, normalizeClass, openBlock, renderSlot, unref, useModel, withCtx } from "vue";
import { TabsRoot } from "reka-ui";
import { TABS_ROOT, cn } from "@viliha/vui-core";
//#region src/Tabs.vue?vue&type=script&setup=true&lang.ts
var Tabs_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Tabs",
	props: /*@__PURE__*/ mergeModels({
		orientation: { default: "horizontal" },
		class: {}
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const props = __props;
		const classes = computed(() => cn(TABS_ROOT, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(TabsRoot), {
				modelValue: model.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => model.value = $event),
				"data-slot": "tabs",
				"data-orientation": __props.orientation,
				orientation: __props.orientation,
				class: normalizeClass(classes.value)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"modelValue",
				"data-orientation",
				"orientation",
				"class"
			]);
		};
	}
});
//#endregion
export { Tabs_vue_vue_type_script_setup_true_lang_default as default };

