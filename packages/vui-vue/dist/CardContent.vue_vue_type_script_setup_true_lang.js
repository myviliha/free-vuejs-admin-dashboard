import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { CARD_CONTENT, cn } from "@viliha/vui-core";
//#region src/CardContent.vue?vue&type=script&setup=true&lang.ts
var CardContent_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CardContent",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(CARD_CONTENT, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(classes.value),
				"data-slot": "card-content"
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { CardContent_vue_vue_type_script_setup_true_lang_default as default };

