import { createBlock, defineComponent, mergeModels, openBlock, renderSlot, unref, useModel, withCtx } from "vue";
import { CollapsibleRoot } from "reka-ui";
//#region src/Collapsible.vue?vue&type=script&setup=true&lang.ts
var Collapsible_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Collapsible",
	props: /*@__PURE__*/ mergeModels({ disabled: { type: Boolean } }, {
		"open": { type: Boolean },
		"openModifiers": {}
	}),
	emits: ["update:open"],
	setup(__props) {
		const open = useModel(__props, "open");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollapsibleRoot), {
				open: open.value,
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => open.value = $event),
				"data-slot": "collapsible",
				disabled: __props.disabled
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["open", "disabled"]);
		};
	}
});
//#endregion
export { Collapsible_vue_vue_type_script_setup_true_lang_default as default };

