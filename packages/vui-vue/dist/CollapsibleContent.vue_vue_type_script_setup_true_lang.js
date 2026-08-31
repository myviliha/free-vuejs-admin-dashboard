import { createBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { CollapsibleContent } from "reka-ui";
//#region src/CollapsibleContent.vue?vue&type=script&setup=true&lang.ts
var CollapsibleContent_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CollapsibleContent",
	props: { class: {} },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollapsibleContent), {
				"data-slot": "collapsible-content",
				class: normalizeClass(_ctx.$props.class)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["class"]);
		};
	}
});
//#endregion
export { CollapsibleContent_vue_vue_type_script_setup_true_lang_default as default };

