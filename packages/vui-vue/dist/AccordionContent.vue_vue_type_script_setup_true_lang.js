import { computed, createBlock, createElementVNode, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { AccordionContent } from "reka-ui";
import { ACCORDION_CONTENT, ACCORDION_CONTENT_INNER, cn } from "@viliha/vui-core";
//#region src/AccordionContent.vue?vue&type=script&setup=true&lang.ts
var AccordionContent_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AccordionContent",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const inner = computed(() => cn(ACCORDION_CONTENT_INNER, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(AccordionContent), {
				"data-slot": "accordion-content",
				class: normalizeClass(unref(ACCORDION_CONTENT)),
				style: { "--vui-accordion-height": "var(--reka-accordion-content-height)" }
			}, {
				default: withCtx(() => [createElementVNode("div", { class: normalizeClass(inner.value) }, [renderSlot(_ctx.$slots, "default")], 2)]),
				_: 3
			}, 8, ["class"]);
		};
	}
});
//#endregion
export { AccordionContent_vue_vue_type_script_setup_true_lang_default as default };

