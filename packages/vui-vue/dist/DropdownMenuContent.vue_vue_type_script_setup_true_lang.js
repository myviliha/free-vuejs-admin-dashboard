import { computed, createBlock, createVNode, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { DropdownMenuContent, DropdownMenuPortal } from "reka-ui";
import { DROPDOWN_CONTENT, cn } from "@viliha/vui-core";
//#region src/DropdownMenuContent.vue?vue&type=script&setup=true&lang.ts
var DropdownMenuContent_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DropdownMenuContent",
	props: {
		align: { default: "start" },
		side: { default: "bottom" },
		sideOffset: { default: 4 },
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(DROPDOWN_CONTENT, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(DropdownMenuPortal), null, {
				default: withCtx(() => [createVNode(unref(DropdownMenuContent), {
					"data-slot": "dropdown-menu-content",
					align: __props.align,
					side: __props.side,
					"side-offset": __props.sideOffset,
					class: normalizeClass(classes.value)
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"align",
					"side",
					"side-offset",
					"class"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
export { DropdownMenuContent_vue_vue_type_script_setup_true_lang_default as default };

