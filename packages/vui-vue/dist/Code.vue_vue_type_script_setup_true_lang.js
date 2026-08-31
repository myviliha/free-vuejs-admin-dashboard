import { createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
//#region src/Code.vue?vue&type=script&setup=true&lang.ts
var Code_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Code",
	props: { class: {} },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("code", { class: normalizeClass(_ctx.$props.class) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { Code_vue_vue_type_script_setup_true_lang_default as default };

