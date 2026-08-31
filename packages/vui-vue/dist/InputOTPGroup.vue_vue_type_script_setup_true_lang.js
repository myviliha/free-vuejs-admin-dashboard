import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { INPUT_OTP_GROUP, cn } from "@viliha/vui-core";
//#region src/InputOTPGroup.vue?vue&type=script&setup=true&lang.ts
var InputOTPGroup_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "InputOTPGroup",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(INPUT_OTP_GROUP, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(classes.value),
				"data-slot": "input-otp-group"
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { InputOTPGroup_vue_vue_type_script_setup_true_lang_default as default };

