import { computed, createBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { TabsTrigger } from "reka-ui";
import { TABS_TRIGGER, cn } from "@viliha/vui-core";
//#region src/TabsTrigger.vue?vue&type=script&setup=true&lang.ts
var TabsTrigger_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TabsTrigger",
	props: {
		value: {},
		disabled: { type: Boolean },
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(TABS_TRIGGER, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(TabsTrigger), {
				"data-slot": "tabs-trigger",
				value: __props.value,
				disabled: __props.disabled,
				class: normalizeClass(classes.value)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"value",
				"disabled",
				"class"
			]);
		};
	}
});
//#endregion
export { TabsTrigger_vue_vue_type_script_setup_true_lang_default as default };

