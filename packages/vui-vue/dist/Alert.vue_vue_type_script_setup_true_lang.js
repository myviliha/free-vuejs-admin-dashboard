import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { ALERT_BASE, ALERT_VARIANTS, cn } from "@viliha/vui-core";
//#region src/Alert.vue?vue&type=script&setup=true&lang.ts
var Alert_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Alert",
	props: {
		variant: { default: "default" },
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(ALERT_BASE, ALERT_VARIANTS[props.variant], props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(classes.value),
				"data-slot": "alert",
				role: "alert"
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { Alert_vue_vue_type_script_setup_true_lang_default as default };

