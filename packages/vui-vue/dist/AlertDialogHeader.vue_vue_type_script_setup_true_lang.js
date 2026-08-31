import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { ALERT_DIALOG_HEADER, cn } from "@viliha/vui-core";
//#region src/AlertDialogHeader.vue?vue&type=script&setup=true&lang.ts
var AlertDialogHeader_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AlertDialogHeader",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(ALERT_DIALOG_HEADER, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(classes.value),
				"data-slot": "alert-dialog-header"
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { AlertDialogHeader_vue_vue_type_script_setup_true_lang_default as default };

