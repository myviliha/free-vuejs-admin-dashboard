import { computed, createBlock, createVNode, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { PopoverContent, PopoverPortal } from "reka-ui";
import { POPOVER_CONTENT, cn } from "@viliha/vui-core";
//#region src/PopoverContent.vue?vue&type=script&setup=true&lang.ts
var PopoverContent_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "PopoverContent",
	props: {
		align: { default: "center" },
		sideOffset: { default: 4 },
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(POPOVER_CONTENT, "origin-(--reka-popover-content-transform-origin)", props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopoverPortal), null, {
				default: withCtx(() => [createVNode(unref(PopoverContent), {
					"data-slot": "popover-content",
					align: __props.align,
					"side-offset": __props.sideOffset,
					class: normalizeClass(classes.value)
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"align",
					"side-offset",
					"class"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
export { PopoverContent_vue_vue_type_script_setup_true_lang_default as default };

