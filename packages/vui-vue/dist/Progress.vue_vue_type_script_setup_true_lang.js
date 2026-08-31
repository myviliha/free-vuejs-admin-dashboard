import { computed, createBlock, createVNode, defineComponent, normalizeClass, normalizeStyle, openBlock, unref, withCtx } from "vue";
import { ProgressIndicator, ProgressRoot } from "reka-ui";
import { PROGRESS_INDICATOR, PROGRESS_ROOT, cn } from "@viliha/vui-core";
//#region src/Progress.vue?vue&type=script&setup=true&lang.ts
var Progress_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Progress",
	props: {
		value: { default: 0 },
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(PROGRESS_ROOT, props.class));
		const offset = computed(() => `translateX(-${100 - Math.min(Math.max(props.value, 0), 100)}%)`);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ProgressRoot), {
				"model-value": props.value,
				class: normalizeClass(classes.value),
				"data-slot": "progress"
			}, {
				default: withCtx(() => [createVNode(unref(ProgressIndicator), {
					"data-slot": "progress-indicator",
					class: normalizeClass(unref(PROGRESS_INDICATOR)),
					style: normalizeStyle({ transform: offset.value })
				}, null, 8, ["class", "style"])]),
				_: 1
			}, 8, ["model-value", "class"]);
		};
	}
});
//#endregion
export { Progress_vue_vue_type_script_setup_true_lang_default as default };

