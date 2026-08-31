import { createBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { CollapsibleTrigger } from "reka-ui";
//#region src/CollapsibleTrigger.vue?vue&type=script&setup=true&lang.ts
var CollapsibleTrigger_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CollapsibleTrigger",
	props: { class: {} },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollapsibleTrigger), {
				"data-slot": "collapsible-trigger",
				class: normalizeClass(_ctx.$props.class)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["class"]);
		};
	}
});
//#endregion
export { CollapsibleTrigger_vue_vue_type_script_setup_true_lang_default as default };

