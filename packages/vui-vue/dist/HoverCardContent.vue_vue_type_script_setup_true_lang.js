import { computed, createBlock, createVNode, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { HoverCardContent, HoverCardPortal } from "reka-ui";
import { HOVER_CARD_CONTENT, cn } from "@viliha/vui-core";
//#region src/HoverCardContent.vue?vue&type=script&setup=true&lang.ts
var HoverCardContent_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "HoverCardContent",
	props: {
		align: { default: "center" },
		sideOffset: { default: 4 },
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(HOVER_CARD_CONTENT.replace("origin-(--radix-hover-card-content-transform-origin)", "origin-(--reka-hover-card-content-transform-origin)"), props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(HoverCardPortal), null, {
				default: withCtx(() => [createVNode(unref(HoverCardContent), {
					align: props.align,
					"side-offset": props.sideOffset,
					class: normalizeClass(classes.value),
					"data-slot": "hover-card-content"
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
export { HoverCardContent_vue_vue_type_script_setup_true_lang_default as default };

