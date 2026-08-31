import { computed, createBlock, createVNode, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { SelectContent, SelectPortal } from "reka-ui";
import { SELECT_CONTENT, cn } from "@viliha/vui-core";
//#region src/SelectContent.vue?vue&type=script&setup=true&lang.ts
/**
* The listbox surface. `Select` renders it for you; it is a component of its
* own so the stacking rules can be checked on one file, the same way the React
* package checks select.tsx.
*/
var SelectContent_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "SelectContent",
	props: {
		position: { default: "popper" },
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(SELECT_CONTENT, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SelectPortal), null, {
				default: withCtx(() => [createVNode(unref(SelectContent), {
					"data-slot": "select-content",
					position: __props.position,
					class: normalizeClass(classes.value)
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, ["position", "class"])]),
				_: 3
			});
		};
	}
});
//#endregion
export { SelectContent_vue_vue_type_script_setup_true_lang_default as default };

