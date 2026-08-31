import { createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
//#region src/TableBody.vue?vue&type=script&setup=true&lang.ts
var TableBody_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TableBody",
	props: { class: {} },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("tbody", { class: normalizeClass(_ctx.$props.class) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { TableBody_vue_vue_type_script_setup_true_lang_default as default };

