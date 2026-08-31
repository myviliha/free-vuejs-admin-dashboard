import { createBlock, defineComponent, openBlock, renderSlot, unref, withCtx } from "vue";
import { AspectRatio } from "reka-ui";
//#region src/AspectRatio.vue?vue&type=script&setup=true&lang.ts
var AspectRatio_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AspectRatio",
	props: { ratio: { default: 1 } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(AspectRatio), {
				ratio: _ctx.$props.ratio,
				"data-slot": "aspect-ratio"
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["ratio"]);
		};
	}
});
//#endregion
export { AspectRatio_vue_vue_type_script_setup_true_lang_default as default };

