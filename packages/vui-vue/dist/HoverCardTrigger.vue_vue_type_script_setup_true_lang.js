import { createBlock, defineComponent, openBlock, renderSlot, unref, withCtx } from "vue";
import { HoverCardTrigger } from "reka-ui";
//#region src/HoverCardTrigger.vue?vue&type=script&setup=true&lang.ts
var HoverCardTrigger_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "HoverCardTrigger",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(HoverCardTrigger), { "data-slot": "hover-card-trigger" }, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			});
		};
	}
});
//#endregion
export { HoverCardTrigger_vue_vue_type_script_setup_true_lang_default as default };

