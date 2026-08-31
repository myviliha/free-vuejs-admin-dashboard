import { computed, createBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { AlertDialogTitle } from "reka-ui";
import { ALERT_DIALOG_TITLE, cn } from "@viliha/vui-core";
//#region src/AlertDialogTitle.vue?vue&type=script&setup=true&lang.ts
var AlertDialogTitle_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AlertDialogTitle",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(ALERT_DIALOG_TITLE, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(AlertDialogTitle), {
				class: normalizeClass(classes.value),
				"data-slot": "alert-dialog-title"
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["class"]);
		};
	}
});
//#endregion
export { AlertDialogTitle_vue_vue_type_script_setup_true_lang_default as default };

