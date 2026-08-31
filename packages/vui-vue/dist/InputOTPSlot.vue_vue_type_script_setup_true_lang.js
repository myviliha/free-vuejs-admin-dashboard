import { computed, createBlock, defineComponent, normalizeClass, openBlock, ref, unref } from "vue";
import { PinInputInput } from "reka-ui";
import { INPUT_OTP_SLOT, cn } from "@viliha/vui-core";
//#region src/InputOTPSlot.vue?vue&type=script&setup=true&lang.ts
/**
* One cell. React's equivalent is a `div` reading its character out of the `input-otp` package's
* context; this is a real `input`, which is what Reka gives every cell, so the caret and the mobile
* keyboard are the browser's job rather than the component's.
*
* **`data-active` is set here because Reka does not set it.** The shared class string styles the
* focused cell entirely through `data-[active=true]:` variants (border, ring, `z-10`) and carries
* `outline-none`, so without this attribute a focused cell in the Vue edition has **no focus
* indicator at all**: the variants never fire and the browser's own ring is suppressed. Reka emits
* `data-disabled` and `data-complete`, never `data-active`. A class-parity test cannot see this,
* because the string is byte-identical either way.
*/
var InputOTPSlot_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "InputOTPSlot",
	props: {
		index: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(INPUT_OTP_SLOT, props.class));
		const focused = ref(false);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PinInputInput), {
				index: __props.index,
				class: normalizeClass(classes.value),
				"data-active": focused.value ? "true" : void 0,
				"data-slot": "input-otp-slot",
				onFocus: _cache[0] || (_cache[0] = ($event) => focused.value = true),
				onBlur: _cache[1] || (_cache[1] = ($event) => focused.value = false)
			}, null, 8, [
				"index",
				"class",
				"data-active"
			]);
		};
	}
});
//#endregion
export { InputOTPSlot_vue_vue_type_script_setup_true_lang_default as default };

