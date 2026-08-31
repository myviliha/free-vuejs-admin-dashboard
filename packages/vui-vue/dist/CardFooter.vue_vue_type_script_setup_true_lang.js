import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { CARD_FOOTER, cn } from "@viliha/vui-core";
//#region src/CardFooter.vue?vue&type=script&setup=true&lang.ts
var CardFooter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CardFooter",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(CARD_FOOTER, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(classes.value),
				"data-slot": "card-footer"
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { CardFooter_vue_vue_type_script_setup_true_lang_default as default };

