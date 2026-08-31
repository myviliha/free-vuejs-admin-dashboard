import { Fragment, computed, createBlock, createElementBlock, createVNode, defineComponent, mergeModels, normalizeClass, openBlock, renderList, unref, useModel, withCtx } from "vue";
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "reka-ui";
import { SLIDER_RANGE, SLIDER_ROOT, SLIDER_TRACK, cn } from "@viliha/vui-core";
//#region src/Slider.vue?vue&type=script&setup=true&lang.ts
var Slider_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Slider",
	props: /*@__PURE__*/ mergeModels({
		min: { default: 0 },
		max: { default: 100 },
		step: { default: 1 },
		class: {}
	}, {
		"modelValue": { default: () => [0] },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const props = __props;
		const value = useModel(__props, "modelValue");
		const classes = computed(() => cn(SLIDER_ROOT, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SliderRoot), {
				modelValue: value.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
				min: props.min,
				max: props.max,
				step: props.step,
				class: normalizeClass(classes.value),
				"data-slot": "slider"
			}, {
				default: withCtx(() => [createVNode(unref(SliderTrack), { class: normalizeClass(unref(SLIDER_TRACK)) }, {
					default: withCtx(() => [createVNode(unref(SliderRange), { class: normalizeClass(unref(SLIDER_RANGE)) }, null, 8, ["class"])]),
					_: 1
				}, 8, ["class"]), (openBlock(true), createElementBlock(Fragment, null, renderList(value.value, (_, i) => {
					return openBlock(), createBlock(unref(SliderThumb), {
						key: i,
						class: "block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
					});
				}), 128))]),
				_: 1
			}, 8, [
				"modelValue",
				"min",
				"max",
				"step",
				"class"
			]);
		};
	}
});
//#endregion
export { Slider_vue_vue_type_script_setup_true_lang_default as default };

