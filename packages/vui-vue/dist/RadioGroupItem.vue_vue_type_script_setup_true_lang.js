import { computed, createBlock, createElementVNode, createVNode, defineComponent, normalizeClass, openBlock, unref, withCtx } from "vue";
import { RadioGroupIndicator, RadioGroupItem } from "reka-ui";
import { RADIO_GROUP_DOT, RADIO_GROUP_INDICATOR, RADIO_GROUP_ITEM, cn } from "@viliha/vui-core";
//#region src/RadioGroupItem.vue?vue&type=script&setup=true&lang.ts
var RadioGroupItem_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RadioGroupItem",
	props: {
		value: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(RADIO_GROUP_ITEM, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(RadioGroupItem), {
				value: props.value,
				class: normalizeClass(classes.value),
				"data-slot": "radio-group-item"
			}, {
				default: withCtx(() => [createVNode(unref(RadioGroupIndicator), {
					"data-slot": "radio-group-indicator",
					class: normalizeClass(unref(RADIO_GROUP_INDICATOR))
				}, {
					default: withCtx(() => [createElementVNode("span", { class: normalizeClass(unref(RADIO_GROUP_DOT)) }, null, 2)]),
					_: 1
				}, 8, ["class"])]),
				_: 1
			}, 8, ["value", "class"]);
		};
	}
});
//#endregion
export { RadioGroupItem_vue_vue_type_script_setup_true_lang_default as default };

