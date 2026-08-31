import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { DIALOG_TITLE, cn } from "@viliha/vui-core";
//#region src/DialogTitle.vue?vue&type=script&setup=true&lang.ts
var DialogTitle_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DialogTitle",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(DIALOG_TITLE, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("h2", { class: normalizeClass(classes.value) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { DialogTitle_vue_vue_type_script_setup_true_lang_default as default };

