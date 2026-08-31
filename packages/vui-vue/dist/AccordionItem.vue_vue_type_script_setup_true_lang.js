import { computed, createBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { AccordionItem } from "reka-ui";
import { ACCORDION_ITEM, cn } from "@viliha/vui-core";
//#region src/AccordionItem.vue?vue&type=script&setup=true&lang.ts
var AccordionItem_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AccordionItem",
	props: {
		value: {},
		disabled: { type: Boolean },
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(ACCORDION_ITEM, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(AccordionItem), {
				"data-slot": "accordion-item",
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
export { AccordionItem_vue_vue_type_script_setup_true_lang_default as default };

