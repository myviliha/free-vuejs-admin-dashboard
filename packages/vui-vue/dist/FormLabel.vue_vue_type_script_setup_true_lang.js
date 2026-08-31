import { useFormField } from "./form-context.js";
import Label_default from "./Label.js";
import { computed, createBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { FORM_LABEL_ERROR, cn } from "@viliha/vui-core";
//#region src/FormLabel.vue?vue&type=script&setup=true&lang.ts
var FormLabel_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "FormLabel",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const field = useFormField();
		const classes = computed(() => cn(FORM_LABEL_ERROR, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(Label_default, {
				for: unref(field).controlId,
				"data-error": Boolean(unref(field).error.value),
				class: normalizeClass(classes.value),
				"data-slot": "form-label"
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"for",
				"data-error",
				"class"
			]);
		};
	}
});
//#endregion
export { FormLabel_vue_vue_type_script_setup_true_lang_default as default };

