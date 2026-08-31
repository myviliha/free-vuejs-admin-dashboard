import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { ALERT_DESCRIPTION, cn } from "@viliha/vui-core";
//#region src/AlertDescription.vue?vue&type=script&setup=true&lang.ts
var AlertDescription_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AlertDescription",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(ALERT_DESCRIPTION, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(classes.value),
				"data-slot": "alert-description"
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { AlertDescription_vue_vue_type_script_setup_true_lang_default as default };

