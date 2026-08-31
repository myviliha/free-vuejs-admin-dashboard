import { computed, createBlock, defineComponent, mergeModels, normalizeClass, openBlock, renderSlot, unref, useModel, withCtx } from "vue";
import { PinInputRoot } from "reka-ui";
import { INPUT_OTP_CONTAINER, cn } from "@viliha/vui-core";
//#region src/InputOTP.vue?vue&type=script&setup=true&lang.ts
/**
* A one-time-code field, on Reka's `PinInput`.
*
* **This is the one family in wave 4 whose markup cannot match React's, and the reason is the
* primitive rather than the port.** React wraps the `input-otp` package, which renders a single
* hidden input behind styled `div` cells and draws a fake caret; Reka renders **one real input per
* cell** and the browser draws the caret. Both read as one field and carry the same classes on the
* same-looking cells, so the two editions look identical, and no markup-parity assertion can hold
* between them. `INPUT_OTP_CARET` and `INPUT_OTP_CARET_WRAP` therefore have no consumer here, which
* is expected rather than an oversight.
*
* What is asserted instead: the container and cell classes come from the shared source, and typing
* fills the cells and emits the value.
*/
var InputOTP_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "InputOTP",
	props: /*@__PURE__*/ mergeModels({
		name: {},
		id: {},
		required: { type: Boolean },
		disabled: { type: Boolean },
		placeholder: {},
		otp: { type: Boolean },
		mask: { type: Boolean },
		class: {}
	}, {
		"modelValue": { default: () => [] },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const model = useModel(__props, "modelValue");
		/**
		* **Everything a native form needs is declared and forwarded**, because `PinInputRoot` sets
		* `inheritAttrs: false` and binds leftover attrs to its wrapper div: an undeclared `name` would land
		* there and Reka's hidden submit input would be named `""`, so the field would submit nothing.
		*
		* There is no `length`. Reka counts the cells that register themselves, exactly as `input-otp`
		* counts its children, so the number of `InputOTPSlot`s is the length and a prop would only be a
		* second source of truth.
		*/
		const props = __props;
		const classes = computed(() => cn(INPUT_OTP_CONTAINER, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PinInputRoot), {
				modelValue: model.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => model.value = $event),
				class: normalizeClass(classes.value),
				name: __props.name,
				id: __props.id,
				required: __props.required,
				disabled: __props.disabled,
				placeholder: __props.placeholder,
				otp: __props.otp,
				mask: __props.mask,
				"data-slot": "input-otp"
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"modelValue",
				"class",
				"name",
				"id",
				"required",
				"disabled",
				"placeholder",
				"otp",
				"mask"
			]);
		};
	}
});
//#endregion
export { InputOTP_vue_vue_type_script_setup_true_lang_default as default };

