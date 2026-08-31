import { computed, createBlock, createElementBlock, createElementVNode, createVNode, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { AccordionHeader, AccordionTrigger } from "reka-ui";
import { ACCORDION_CHEVRON, ACCORDION_TRIGGER, cn } from "@viliha/vui-core";
//#region src/AccordionTrigger.vue?vue&type=script&setup=true&lang.ts
var AccordionTrigger_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AccordionTrigger",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(ACCORDION_TRIGGER, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(AccordionHeader), { class: "flex" }, {
				default: withCtx(() => [createVNode(unref(AccordionTrigger), {
					"data-slot": "accordion-trigger",
					class: normalizeClass(classes.value)
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default"), (openBlock(), createElementBlock("svg", {
						class: normalizeClass(unref(ACCORDION_CHEVRON)),
						xmlns: "http://www.w3.org/2000/svg",
						viewBox: "0 0 15 15",
						fill: "none",
						"aria-hidden": "true"
					}, [..._cache[0] || (_cache[0] = [createElementVNode("path", {
						d: "M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",
						fill: "currentColor",
						"fill-rule": "evenodd",
						"clip-rule": "evenodd"
					}, null, -1)])], 2))]),
					_: 3
				}, 8, ["class"])]),
				_: 3
			});
		};
	}
});
//#endregion
export { AccordionTrigger_vue_vue_type_script_setup_true_lang_default as default };

