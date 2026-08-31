import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { DIALOG_HEADER, cn } from "@viliha/vui-core";
//#region src/DialogHeader.vue?vue&type=script&setup=true&lang.ts
var DialogHeader_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DialogHeader",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(DIALOG_HEADER, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(classes.value) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { DialogHeader_vue_vue_type_script_setup_true_lang_default as default };

