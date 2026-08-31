import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { ALERT_DIALOG_FOOTER, cn } from "@viliha/vui-core";
//#region src/AlertDialogFooter.vue?vue&type=script&setup=true&lang.ts
var AlertDialogFooter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AlertDialogFooter",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(ALERT_DIALOG_FOOTER, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(classes.value),
				"data-slot": "alert-dialog-footer"
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { AlertDialogFooter_vue_vue_type_script_setup_true_lang_default as default };

