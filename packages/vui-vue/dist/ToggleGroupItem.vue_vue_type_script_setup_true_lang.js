import { computed, createBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { ToggleGroupItem } from "reka-ui";
import { TOGGLE_BASE, TOGGLE_SIZES, TOGGLE_VARIANTS, cn } from "@viliha/vui-core";
//#region src/ToggleGroupItem.vue?vue&type=script&setup=true&lang.ts
var ToggleGroupItem_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ToggleGroupItem",
	props: {
		value: {},
		variant: { default: "default" },
		size: { default: "default" },
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(TOGGLE_BASE, TOGGLE_VARIANTS[props.variant], TOGGLE_SIZES[props.size], "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md", props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ToggleGroupItem), {
				value: props.value,
				class: normalizeClass(classes.value),
				"data-slot": "toggle-group-item"
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["value", "class"]);
		};
	}
});
//#endregion
export { ToggleGroupItem_vue_vue_type_script_setup_true_lang_default as default };

