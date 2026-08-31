import { computed, createBlock, createCommentVNode, createElementVNode, createTextVNode, createVNode, defineComponent, mergeModels, normalizeClass, openBlock, renderSlot, toDisplayString, unref, useModel, withCtx } from "vue";
import { DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, VisuallyHidden } from "reka-ui";
import { DIALOG_CLOSE, DIALOG_OVERLAY, DIALOG_PANEL, cn } from "@viliha/vui-core";
//#region src/Dialog.vue?vue&type=script&setup=true&lang.ts
/**
* Sectioned modal dialog, the same shell as the React one: centred panel, themed scrim, entrance
* animation, Escape and backdrop click to close. Compose it with DialogHeader, DialogBody and
* DialogFooter.
*
* Reka owns the focus trap, the scroll lock and the aria wiring, which the React component hand-rolls;
* the classes are shared so both look identical.
*/
var Dialog_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Dialog",
	props: /*@__PURE__*/ mergeModels({
		label: {},
		dismissible: {
			type: Boolean,
			default: true
		},
		showClose: {
			type: Boolean,
			default: true
		},
		class: {}
	}, {
		"open": { type: Boolean },
		"openModifiers": {}
	}),
	emits: ["update:open"],
	setup(__props) {
		const open = useModel(__props, "open");
		const props = __props;
		const panel = computed(() => cn(DIALOG_PANEL, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(DialogRoot), {
				open: open.value,
				"onUpdate:open": _cache[2] || (_cache[2] = ($event) => open.value = $event),
				modal: true
			}, {
				default: withCtx(() => [createVNode(unref(DialogPortal), null, {
					default: withCtx(() => [createVNode(unref(DialogOverlay), { class: normalizeClass(unref(DIALOG_OVERLAY)) }, {
						default: withCtx(() => [createVNode(unref(DialogContent), {
							"aria-label": __props.label,
							"aria-modal": "true",
							"aria-describedby": void 0,
							class: normalizeClass(panel.value),
							style: { "--vui-pop-origin": "center" },
							onEscapeKeyDown: _cache[0] || (_cache[0] = ($event) => __props.dismissible ? void 0 : $event.preventDefault()),
							onPointerDownOutside: _cache[1] || (_cache[1] = ($event) => __props.dismissible ? void 0 : $event.preventDefault())
						}, {
							default: withCtx(() => [
								__props.label ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
									default: withCtx(() => [createVNode(unref(DialogTitle), null, {
										default: withCtx(() => [createTextVNode(toDisplayString(__props.label), 1)]),
										_: 1
									})]),
									_: 1
								})) : createCommentVNode("", true),
								__props.showClose ? (openBlock(), createBlock(unref(DialogClose), {
									key: 1,
									class: normalizeClass(unref(DIALOG_CLOSE)),
									"aria-label": "Close"
								}, {
									default: withCtx(() => [..._cache[3] || (_cache[3] = [createElementVNode("svg", {
										viewBox: "0 0 15 15",
										fill: "none",
										"aria-hidden": "true",
										class: "size-4",
										xmlns: "http://www.w3.org/2000/svg"
									}, [createElementVNode("path", {
										d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
										fill: "currentColor",
										"fill-rule": "evenodd",
										"clip-rule": "evenodd"
									})], -1)])]),
									_: 1
								}, 8, ["class"])) : createCommentVNode("", true),
								renderSlot(_ctx.$slots, "default")
							]),
							_: 3
						}, 8, ["aria-label", "class"])]),
						_: 3
					}, 8, ["class"])]),
					_: 3
				})]),
				_: 3
			}, 8, ["open"]);
		};
	}
});
//#endregion
export { Dialog_vue_vue_type_script_setup_true_lang_default as default };

