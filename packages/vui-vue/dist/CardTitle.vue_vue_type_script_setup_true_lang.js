import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { CARD_TITLE, cn } from "@viliha/vui-core";
//#region src/CardTitle.vue?vue&type=script&setup=true&lang.ts
var CardTitle_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CardTitle",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(CARD_TITLE, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("h3", {
				class: normalizeClass(classes.value),
				"data-slot": "card-title"
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { CardTitle_vue_vue_type_script_setup_true_lang_default as default };

