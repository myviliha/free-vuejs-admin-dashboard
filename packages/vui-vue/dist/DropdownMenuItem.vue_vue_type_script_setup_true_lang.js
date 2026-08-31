import { computed, createBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { DropdownMenuItem } from "reka-ui";
import { DROPDOWN_ITEM, cn } from "@viliha/vui-core";
//#region src/DropdownMenuItem.vue?vue&type=script&setup=true&lang.ts
var DropdownMenuItem_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DropdownMenuItem",
	props: {
		disabled: { type: Boolean },
		asChild: { type: Boolean },
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(DROPDOWN_ITEM, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(DropdownMenuItem), {
				"data-slot": "dropdown-menu-item",
				"as-child": __props.asChild,
				disabled: __props.disabled,
				class: normalizeClass(classes.value),
				onSelect: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("select", $event))
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"as-child",
				"disabled",
				"class"
			]);
		};
	}
});
//#endregion
export { DropdownMenuItem_vue_vue_type_script_setup_true_lang_default as default };

