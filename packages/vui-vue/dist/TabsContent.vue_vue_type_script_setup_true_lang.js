import { computed, createBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { TabsContent } from "reka-ui";
import { TABS_CONTENT, cn } from "@viliha/vui-core";
//#region src/TabsContent.vue?vue&type=script&setup=true&lang.ts
var TabsContent_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TabsContent",
	props: {
		value: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(TABS_CONTENT, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(TabsContent), {
				"data-slot": "tabs-content",
				value: __props.value,
				class: normalizeClass(classes.value)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["value", "class"]);
		};
	}
});
//#endregion
export { TabsContent_vue_vue_type_script_setup_true_lang_default as default };

