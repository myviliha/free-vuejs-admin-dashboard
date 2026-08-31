import ConfirmDialog_default from "./ConfirmDialog.js";
import FormFooter_default from "./FormFooter.js";
import { useRecordForm } from "./record-form-context.js";
import { Fragment, createElementBlock, createVNode, defineComponent, guardReactiveProps, normalizeProps, openBlock, renderSlot, unref, withCtx } from "vue";
//#region src/RecordFormFooter.vue?vue&type=script&setup=true&lang.ts
/**
* The footer, plus the discard confirmation it can raise.
*
* They are one component because the dialog belongs to the footer's Cancel: React renders the pair
* together as `formFooter` for the same reason, and separating them here would mean the page layout
* and the slide-over each had to remember to render both.
*/
var RecordFormFooter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RecordFormFooter",
	setup(__props) {
		const form = useRecordForm();
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(FormFooter_default, {
				actions: unref(form).actions.value,
				ctx: unref(form).ctx.value,
				run: unref(form).run
			}, {
				icon: withCtx((slotProps) => [renderSlot(_ctx.$slots, "action-icon", normalizeProps(guardReactiveProps(slotProps)))]),
				_: 3
			}, 8, [
				"actions",
				"ctx",
				"run"
			]), createVNode(ConfirmDialog_default, {
				open: unref(form).confirmDiscard.value,
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => unref(form).confirmDiscard.value = $event),
				title: `Discard your changes to this ${unref(form).singular.value.toLowerCase()}?`,
				description: "What you have typed will be lost.",
				"confirm-label": "Discard",
				destructive: "",
				onConfirm: _cache[1] || (_cache[1] = ($event) => unref(form).discard()),
				onCancel: _cache[2] || (_cache[2] = ($event) => unref(form).confirmDiscard.value = false)
			}, null, 8, ["open", "title"])], 64);
		};
	}
});
//#endregion
export { RecordFormFooter_vue_vue_type_script_setup_true_lang_default as default };

