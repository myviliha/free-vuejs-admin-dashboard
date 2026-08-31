import { computed, createBlock, createTextVNode, createVNode, defineComponent, normalizeClass, openBlock, renderSlot, toDisplayString, unref, withCtx } from "vue";
import { TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from "reka-ui";
import { TOOLTIP_CONTENT, cn } from "@viliha/vui-core";
//#region src/Tooltip.vue?vue&type=script&setup=true&lang.ts
/**
* One component rather than five: a tooltip is always trigger plus bubble, and
* the React version is the same shape. Pass the trigger as the default slot and
* the text as `content` (or the `content` slot for markup).
*
* It is a light surface with a border, like every other floating panel. Never a
* dark bubble: that reads as a second design system on top of this one.
*/
var Tooltip_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Tooltip",
	props: {
		content: {},
		side: { default: "top" },
		sideOffset: { default: 6 },
		delayDuration: { default: 200 },
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(TOOLTIP_CONTENT, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(TooltipProvider), { "delay-duration": __props.delayDuration }, {
				default: withCtx(() => [createVNode(unref(TooltipRoot), null, {
					default: withCtx(() => [createVNode(unref(TooltipTrigger), { "as-child": "" }, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
						_: 3
					}), createVNode(unref(TooltipPortal), null, {
						default: withCtx(() => [createVNode(unref(TooltipContent), {
							side: __props.side,
							"side-offset": __props.sideOffset,
							class: normalizeClass(["pointer-events-none z-[220]", classes.value])
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "content", {}, () => [createTextVNode(toDisplayString(__props.content), 1)])]),
							_: 3
						}, 8, [
							"side",
							"side-offset",
							"class"
						])]),
						_: 3
					})]),
					_: 3
				})]),
				_: 3
			}, 8, ["delay-duration"]);
		};
	}
});
//#endregion
export { Tooltip_vue_vue_type_script_setup_true_lang_default as default };

