import { computed, createBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { AlertDialogDescription } from "reka-ui";
import { ALERT_DIALOG_DESCRIPTION, cn } from "@viliha/vui-core";
//#region src/AlertDialogDescription.vue?vue&type=script&setup=true&lang.ts
var AlertDialogDescription_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AlertDialogDescription",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(ALERT_DIALOG_DESCRIPTION, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(AlertDialogDescription), {
				class: normalizeClass(classes.value),
				"data-slot": "alert-dialog-description"
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["class"]);
		};
	}
});
//#endregion
export { AlertDialogDescription_vue_vue_type_script_setup_true_lang_default as default };

