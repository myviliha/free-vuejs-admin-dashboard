import { computed, createBlock, createVNode, defineComponent, mergeModels, normalizeClass, openBlock, renderSlot, unref, useModel, withCtx } from "vue";
import { AlertDialogContent, AlertDialogOverlay, AlertDialogPortal, AlertDialogRoot } from "reka-ui";
import { ALERT_DIALOG_CONTENT, ALERT_DIALOG_OVERLAY, cn } from "@viliha/vui-core";
//#region src/AlertDialog.vue?vue&type=script&setup=true&lang.ts
/**
* Confirmation dialog, the same shell as the React one. Self-contained like `Dialog.vue`: root,
* portal, scrim and panel in one file, which is the convention `z-layers.test.ts` checks, because a
* backdrop split across two files is a backdrop nobody can assert on.
*
* Reka owns the focus trap, the scroll lock and the aria wiring. **Escape and outside-click do not
* dismiss it**, which is the difference from `Dialog`: a confirmation has to be answered.
*/
var AlertDialog_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AlertDialog",
	props: /*@__PURE__*/ mergeModels({
		size: { default: "default" },
		class: {}
	}, {
		"open": { type: Boolean },
		"openModifiers": {}
	}),
	emits: ["update:open"],
	setup(__props) {
		const open = useModel(__props, "open");
		const props = __props;
		const panel = computed(() => cn(ALERT_DIALOG_CONTENT, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(AlertDialogRoot), {
				open: open.value,
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => open.value = $event)
			}, {
				default: withCtx(() => [createVNode(unref(AlertDialogPortal), null, {
					default: withCtx(() => [createVNode(unref(AlertDialogOverlay), { class: normalizeClass(unref(ALERT_DIALOG_OVERLAY)) }, null, 8, ["class"]), createVNode(unref(AlertDialogContent), {
						"data-size": props.size,
						class: normalizeClass(panel.value),
						"data-slot": "alert-dialog-content"
					}, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
						_: 3
					}, 8, ["data-size", "class"])]),
					_: 3
				})]),
				_: 3
			}, 8, ["open"]);
		};
	}
});
//#endregion
export { AlertDialog_vue_vue_type_script_setup_true_lang_default as default };

