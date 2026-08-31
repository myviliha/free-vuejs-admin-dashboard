import { computed, createBlock, createVNode, defineComponent, mergeModels, normalizeClass, openBlock, renderSlot, unref, useModel, withCtx } from "vue";
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from "reka-ui";
import { SHEET_CONTENT, SHEET_OVERLAY, cn } from "@viliha/vui-core";
//#region src/Sheet.vue?vue&type=script&setup=true&lang.ts
/**
* A sheet is a dialog pinned to an edge, and the edge is data rather than four class strings, which
* is how React does it too. Self-contained like `Dialog.vue` so the scrim lives in one file.
*/
var Sheet_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Sheet",
	props: /*@__PURE__*/ mergeModels({
		side: { default: "right" },
		class: {}
	}, {
		"open": { type: Boolean },
		"openModifiers": {}
	}),
	emits: ["update:open"],
	setup(__props) {
		const open = useModel(__props, "open");
		const props = __props;
		const panel = computed(() => cn(SHEET_CONTENT, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(DialogRoot), {
				open: open.value,
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => open.value = $event),
				modal: true
			}, {
				default: withCtx(() => [createVNode(unref(DialogPortal), null, {
					default: withCtx(() => [createVNode(unref(DialogOverlay), { class: normalizeClass(unref(SHEET_OVERLAY)) }, null, 8, ["class"]), createVNode(unref(DialogContent), {
						"data-side": props.side,
						class: normalizeClass(panel.value),
						"data-slot": "sheet-content"
					}, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
						_: 3
					}, 8, ["data-side", "class"])]),
					_: 3
				})]),
				_: 3
			}, 8, ["open"]);
		};
	}
});
//#endregion
export { Sheet_vue_vue_type_script_setup_true_lang_default as default };

