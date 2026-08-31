import Button_default from "./Button.js";
import Dialog_default from "./Dialog.js";
import DialogBody_default from "./DialogBody.js";
import DialogFooter_default from "./DialogFooter.js";
import DialogHeader_default from "./DialogHeader.js";
import DialogTitle_default from "./DialogTitle.js";
import { createBlock, createCommentVNode, createTextVNode, createVNode, defineComponent, mergeModels, normalizeClass, openBlock, renderSlot, toDisplayString, unref, useModel, watch, withCtx } from "vue";
import { CONFIRM_DIALOG_DESCRIPTION, CONFIRM_DIALOG_DESTRUCTIVE_ICON, CONFIRM_DIALOG_PANEL, cn } from "@viliha/vui-core";
//#region src/ConfirmDialog.vue?vue&type=script&setup=true&lang.ts
/**
* Centered modal confirmation, before deleting something. Built on the shared `Dialog` so it stays
* in lockstep with the header, body and footer standard, exactly as the React one is.
*
* React takes `open` with `onCancel`; here `open` is a model, which is how a Vue caller expects a
* dialog to work, and cancel is an event. Two things are deliberate and match React rather than
* being convenient:
*
* - **Every route out emits `cancel`**, including Escape and a backdrop click, which Reka performs
*   by flipping the model itself. React wires `onClose={onCancel}` for the same reason. Without it a
*   caller that clears its pending id in `@cancel` keeps a stale one after an Escape, and the next
*   confirm acts on the wrong row.
* - **Neither button closes the dialog.** The parent owns `open`, exactly as in React, so a confirm
*   handler can keep the panel up with a disabled button while its request is in flight. Closing
*   here would unmount it mid-request and re-run the entrance animation if the parent reopened to
*   report a failure.
*/
var ConfirmDialog_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ConfirmDialog",
	props: /*@__PURE__*/ mergeModels({
		title: {},
		description: {},
		confirmLabel: { default: "Confirm" },
		cancelLabel: { default: "Cancel" },
		destructive: { type: Boolean }
	}, {
		"open": {
			type: Boolean,
			default: false
		},
		"openModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["confirm", "cancel"], ["update:open"]),
	setup(__props, { emit: __emit }) {
		const open = useModel(__props, "open");
		const emit = __emit;
		let confirming = false;
		const confirm = () => {
			confirming = true;
			emit("confirm");
		};
		const cancel = () => emit("cancel");
		watch(open, (now, before) => {
			if (before && !now && !confirming) emit("cancel");
			confirming = false;
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(Dialog_default, {
				open: open.value,
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => open.value = $event),
				label: __props.title,
				class: normalizeClass(unref(CONFIRM_DIALOG_PANEL))
			}, {
				default: withCtx(() => [
					createVNode(DialogHeader_default, null, {
						default: withCtx(() => [createVNode(DialogTitle_default, null, {
							default: withCtx(() => [createTextVNode(toDisplayString(__props.title), 1)]),
							_: 1
						})]),
						_: 1
					}),
					__props.description || _ctx.$slots.description ? (openBlock(), createBlock(DialogBody_default, {
						key: 0,
						class: normalizeClass(unref(CONFIRM_DIALOG_DESCRIPTION))
					}, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "description", {}, () => [createTextVNode(toDisplayString(__props.description), 1)])]),
						_: 3
					}, 8, ["class"])) : createCommentVNode("", true),
					createVNode(DialogFooter_default, null, {
						default: withCtx(() => [createVNode(Button_default, { onClick: cancel }, {
							default: withCtx(() => [createTextVNode(toDisplayString(__props.cancelLabel), 1)]),
							_: 1
						}), createVNode(Button_default, {
							variant: __props.destructive ? "destructive" : "primary",
							class: normalizeClass(unref(cn)(__props.destructive && unref(CONFIRM_DIALOG_DESTRUCTIVE_ICON))),
							onClick: confirm
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(__props.confirmLabel), 1)]),
							_: 1
						}, 8, ["variant", "class"])]),
						_: 1
					})
				]),
				_: 3
			}, 8, [
				"open",
				"label",
				"class"
			]);
		};
	}
});
//#endregion
export { ConfirmDialog_vue_vue_type_script_setup_true_lang_default as default };

