import { computed, createBlock, createElementVNode, createVNode, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { SelectItem, SelectItemIndicator, SelectItemText } from "reka-ui";
import { SELECT_ITEM, SELECT_ITEM_CHECKED, cn } from "@viliha/vui-core";
//#region src/SelectItem.vue?vue&type=script&setup=true&lang.ts
var SelectItem_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "SelectItem",
	props: {
		value: {},
		disabled: { type: Boolean },
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(SELECT_ITEM, SELECT_ITEM_CHECKED, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SelectItem), {
				value: __props.value,
				disabled: __props.disabled,
				class: normalizeClass(classes.value)
			}, {
				default: withCtx(() => [createVNode(unref(SelectItemText), null, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}), createVNode(unref(SelectItemIndicator), null, {
					default: withCtx(() => [..._cache[0] || (_cache[0] = [createElementVNode("svg", {
						class: "vui-icon-plain size-3.5 shrink-0 text-[var(--button-primary)]",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						"stroke-width": "2",
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						"aria-hidden": "true"
					}, [createElementVNode("path", { d: "M20 6 9 17l-5-5" })], -1)])]),
					_: 1
				})]),
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
export { SelectItem_vue_vue_type_script_setup_true_lang_default as default };

