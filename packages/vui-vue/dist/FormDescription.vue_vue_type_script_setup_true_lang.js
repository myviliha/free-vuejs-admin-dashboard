import { useFormField } from "./form-context.js";
import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref } from "vue";
import { FORM_DESCRIPTION, cn } from "@viliha/vui-core";
//#region src/FormDescription.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["id"];
var FormDescription_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "FormDescription",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const field = useFormField();
		const classes = computed(() => cn(FORM_DESCRIPTION, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("p", {
				id: unref(field).descriptionId,
				class: normalizeClass(classes.value),
				"data-slot": "form-description"
			}, [renderSlot(_ctx.$slots, "default")], 10, _hoisted_1);
		};
	}
});
//#endregion
export { FormDescription_vue_vue_type_script_setup_true_lang_default as default };

