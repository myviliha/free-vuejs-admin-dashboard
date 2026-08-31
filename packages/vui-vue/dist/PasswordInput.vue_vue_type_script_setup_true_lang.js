import Input_default from "./Input.js";
import Tooltip_default from "./Tooltip.js";
import { Fragment, computed, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, mergeModels, mergeProps, normalizeClass, openBlock, ref, toDisplayString, unref, useId, useModel, withCtx } from "vue";
import { PASSWORD_INPUT_ASTERISK, PASSWORD_INPUT_ERROR_ICON, PASSWORD_INPUT_HIDDEN, PASSWORD_INPUT_ICON, PASSWORD_INPUT_OVERLAY, PASSWORD_INPUT_PAD, PASSWORD_INPUT_PAD_INVALID, PASSWORD_INPUT_ROOT, PASSWORD_INPUT_TOGGLE, SR_ONLY, cn } from "@viliha/vui-core";
//#region src/PasswordInput.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["id"];
var _hoisted_2 = ["aria-label", "aria-pressed"];
/**
* A password field with a show/hide eye toggle. It masks with `*` by default, drawing the
* mask over a transparent text input; `mask="native"` uses a real `type="password"` (bullet
* dots) that the toggle flips to `type="text"`, so autofill and password managers work.
*
* **This differs from the React component on purpose.** React reads an app-wide default from
* `NEXT_PUBLIC_PASSWORD_MASK`. The Vue equivalent would be a different variable in a
* different bundler, so the two editions could not agree on it anyway; this port reads no
* environment and defaults to `"asterisk"`. Set `mask` per field instead.
*
* **The consequence, which a review pointed out and the divergence note had dropped:** an app that
* sets `NEXT_PUBLIC_PASSWORD_MASK=native` gets a React field that is a real `type="password"` and a
* Vue field that is not, so on the Vue side autofill and password managers do not recognise it and
* a screen reader can read the typed value aloud. That is the same caveat the React component's own
* doc carries about `"asterisk"`, and it is why `mask="native"` exists. **If the two editions must
* agree app-wide, this default belongs in an injected config rather than a prop default**, which is
* a decision rather than a fix and is open as a question.
*/
var PasswordInput_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	inheritAttrs: false,
	__name: "PasswordInput",
	props: /*@__PURE__*/ mergeModels({
		error: {},
		maskChar: { default: "*" },
		mask: { default: "asterisk" },
		autocomplete: { default: "current-password" },
		class: {}
	}, {
		"modelValue": { default: "" },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const model = useModel(__props, "modelValue");
		const props = __props;
		const visible = ref(false);
		const errorId = useId();
		const invalid = computed(() => Boolean(props.error));
		const asterisk = computed(() => props.mask === "asterisk");
		const showOverlay = computed(() => asterisk.value && !visible.value);
		const type = computed(() => asterisk.value || visible.value ? "text" : "password");
		const masked = computed(() => props.maskChar.repeat(String(model.value ?? "").length));
		const inputClasses = computed(() => cn(invalid.value ? PASSWORD_INPUT_PAD_INVALID : PASSWORD_INPUT_PAD, asterisk.value && PASSWORD_INPUT_ASTERISK, showOverlay.value && PASSWORD_INPUT_HIDDEN, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(PASSWORD_INPUT_ROOT)) }, [
				createVNode(Input_default, mergeProps(_ctx.$attrs, {
					modelValue: model.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => model.value = $event),
					type: type.value,
					autocomplete: __props.autocomplete,
					"aria-invalid": invalid.value || void 0,
					"aria-describedby": invalid.value ? unref(errorId) : void 0,
					class: inputClasses.value
				}), null, 16, [
					"modelValue",
					"type",
					"autocomplete",
					"aria-invalid",
					"aria-describedby",
					"class"
				]),
				showOverlay.value ? (openBlock(), createElementBlock("span", {
					key: 0,
					"aria-hidden": "true",
					class: normalizeClass(unref(PASSWORD_INPUT_OVERLAY))
				}, toDisplayString(masked.value), 3)) : createCommentVNode("", true),
				invalid.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [createElementVNode("span", { class: normalizeClass(unref(PASSWORD_INPUT_ERROR_ICON)) }, [createVNode(Tooltip_default, { content: __props.error }, {
					default: withCtx(() => [(openBlock(), createElementBlock("svg", {
						class: normalizeClass(unref(PASSWORD_INPUT_ICON)),
						width: "15",
						height: "15",
						viewBox: "0 0 15 15",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg",
						"aria-hidden": "true"
					}, [..._cache[2] || (_cache[2] = [createElementVNode("path", {
						d: "M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z",
						fill: "currentColor",
						"fill-rule": "evenodd",
						"clip-rule": "evenodd"
					}, null, -1)])], 2))]),
					_: 1
				}, 8, ["content"])], 2), createElementVNode("span", {
					id: unref(errorId),
					class: normalizeClass(unref(SR_ONLY))
				}, toDisplayString(__props.error), 11, _hoisted_1)], 64)) : createCommentVNode("", true),
				createElementVNode("button", {
					type: "button",
					"aria-label": visible.value ? "Hide password" : "Show password",
					"aria-pressed": visible.value,
					class: normalizeClass(unref(PASSWORD_INPUT_TOGGLE)),
					onClick: _cache[1] || (_cache[1] = ($event) => visible.value = !visible.value)
				}, [visible.value ? (openBlock(), createElementBlock("svg", {
					key: 0,
					class: normalizeClass(unref(PASSWORD_INPUT_ICON)),
					width: "15",
					height: "15",
					viewBox: "0 0 15 15",
					fill: "none",
					xmlns: "http://www.w3.org/2000/svg"
				}, [..._cache[3] || (_cache[3] = [createElementVNode("path", {
					d: "M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z",
					fill: "currentColor",
					"fill-rule": "evenodd",
					"clip-rule": "evenodd"
				}, null, -1)])], 2)) : (openBlock(), createElementBlock("svg", {
					key: 1,
					class: normalizeClass(unref(PASSWORD_INPUT_ICON)),
					width: "15",
					height: "15",
					viewBox: "0 0 15 15",
					fill: "none",
					xmlns: "http://www.w3.org/2000/svg"
				}, [..._cache[4] || (_cache[4] = [createElementVNode("path", {
					d: "M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z",
					fill: "currentColor",
					"fill-rule": "evenodd",
					"clip-rule": "evenodd"
				}, null, -1)])], 2))], 10, _hoisted_2)
			], 2);
		};
	}
});
//#endregion
export { PasswordInput_vue_vue_type_script_setup_true_lang_default as default };

