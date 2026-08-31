import { computed, createBlock, createVNode, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from "reka-ui";
import { SCROLL_AREA_ROOT, SCROLL_AREA_SCROLLBAR, SCROLL_AREA_THUMB, cn } from "@viliha/vui-core";
//#region src/ScrollArea.vue?vue&type=script&setup=true&lang.ts
var ScrollArea_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ScrollArea",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(SCROLL_AREA_ROOT, props.class));
		const bar = cn(SCROLL_AREA_SCROLLBAR, "w-2.5 border-l border-l-transparent");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ScrollAreaRoot), {
				class: normalizeClass(classes.value),
				"data-slot": "scroll-area"
			}, {
				default: withCtx(() => [createVNode(unref(ScrollAreaViewport), { class: "size-full rounded-[inherit]" }, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}), createVNode(unref(ScrollAreaScrollbar), {
					orientation: "vertical",
					class: normalizeClass(unref(bar))
				}, {
					default: withCtx(() => [createVNode(unref(ScrollAreaThumb), { class: normalizeClass(unref(SCROLL_AREA_THUMB)) }, null, 8, ["class"])]),
					_: 1
				}, 8, ["class"])]),
				_: 3
			}, 8, ["class"]);
		};
	}
});
//#endregion
export { ScrollArea_vue_vue_type_script_setup_true_lang_default as default };

