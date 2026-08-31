import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { DIALOG_FOOTER, cn } from "@viliha/vui-core";
//#region src/DialogFooter.vue?vue&type=script&setup=true&lang.ts
var DialogFooter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "DialogFooter",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(DIALOG_FOOTER, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(classes.value) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { DialogFooter_vue_vue_type_script_setup_true_lang_default as default };

