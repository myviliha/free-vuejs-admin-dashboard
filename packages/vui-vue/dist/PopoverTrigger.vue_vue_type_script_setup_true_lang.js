import { createBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { PopoverTrigger } from "reka-ui";
//#region src/PopoverTrigger.vue?vue&type=script&setup=true&lang.ts
var PopoverTrigger_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "PopoverTrigger",
	props: { class: {} },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopoverTrigger), {
				"data-slot": "popover-trigger",
				class: normalizeClass(_ctx.$props.class)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["class"]);
		};
	}
});
//#endregion
export { PopoverTrigger_vue_vue_type_script_setup_true_lang_default as default };

