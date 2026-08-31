import Button_default from "./Button.js";
import Steps_default from "./Steps.js";
import { computed, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { WIZARD_BODY, WIZARD_BODY_STACK, WIZARD_FOOTER, WIZARD_HEADER, WIZARD_NAV_ICON, WIZARD_ROOT, cn } from "@viliha/vui-core";
//#region src/Wizard.vue?vue&type=script&setup=true&lang.ts
/**
* A stepped shell: the stepper pinned at the top, the active step as the only scrolling region, and a
* Back / Next footer.
*
* React takes `footer` as a node prop and `backLabel`/`nextLabel` as nodes; here all three are slots,
* which is how a Vue caller passes markup. The default footer is what most callers want and is what the
* slots fall back to.
*/
var Wizard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Wizard",
	props: {
		steps: {},
		current: {},
		backDisabled: { type: Boolean },
		nextDisabled: { type: Boolean },
		hideFooter: { type: Boolean },
		class: {}
	},
	emits: ["back", "next"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const rootClasses = computed(() => cn(WIZARD_ROOT, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(rootClasses.value) }, [
				createElementVNode("div", { class: normalizeClass(unref(WIZARD_HEADER)) }, [createVNode(Steps_default, {
					steps: __props.steps,
					current: __props.current
				}, null, 8, ["steps", "current"])], 2),
				createElementVNode("div", { class: normalizeClass(unref(WIZARD_BODY)) }, [createElementVNode("div", { class: normalizeClass(unref(WIZARD_BODY_STACK)) }, [renderSlot(_ctx.$slots, "default")], 2)], 2),
				!__props.hideFooter ? renderSlot(_ctx.$slots, "footer", {}, () => [createElementVNode("div", { class: normalizeClass(unref(WIZARD_FOOTER)) }, [createVNode(Button_default, {
					disabled: __props.backDisabled,
					onClick: _cache[0] || (_cache[0] = ($event) => emit("back"))
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "back", {}, () => [(openBlock(), createElementBlock("svg", {
						class: normalizeClass(unref(WIZARD_NAV_ICON)),
						xmlns: "http://www.w3.org/2000/svg",
						width: "15",
						height: "15",
						viewBox: "0 0 15 15",
						fill: "none",
						"aria-hidden": "true"
					}, [..._cache[2] || (_cache[2] = [createElementVNode("path", {
						d: "M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z",
						fill: "currentColor",
						"fill-rule": "evenodd",
						"clip-rule": "evenodd"
					}, null, -1)])], 2)), _cache[3] || (_cache[3] = createTextVNode(" Back ", -1))])]),
					_: 3
				}, 8, ["disabled"]), createVNode(Button_default, {
					variant: "primary",
					disabled: __props.nextDisabled,
					onClick: _cache[1] || (_cache[1] = ($event) => emit("next"))
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "next", {}, () => [_cache[5] || (_cache[5] = createTextVNode(" Next ", -1)), (openBlock(), createElementBlock("svg", {
						class: normalizeClass(unref(WIZARD_NAV_ICON)),
						xmlns: "http://www.w3.org/2000/svg",
						width: "15",
						height: "15",
						viewBox: "0 0 15 15",
						fill: "none",
						"aria-hidden": "true"
					}, [..._cache[4] || (_cache[4] = [createElementVNode("path", {
						d: "M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z",
						fill: "currentColor",
						"fill-rule": "evenodd",
						"clip-rule": "evenodd"
					}, null, -1)])], 2))])]),
					_: 3
				}, 8, ["disabled"])], 2)], void 0, 0) : createCommentVNode("", true)
			], 2);
		};
	}
});
//#endregion
export { Wizard_vue_vue_type_script_setup_true_lang_default as default };

