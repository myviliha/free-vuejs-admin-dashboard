import { FORM_FIELD } from "./form-context.js";
import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, provide, renderSlot, useId } from "vue";
import { FORM_ITEM, cn } from "@viliha/vui-core";
//#region src/FormItem.vue?vue&type=script&setup=true&lang.ts
/**
* One field: the wrapper that owns the ids everything below it points at.
*
* **This is a deliberately smaller family than React's, and the difference is the form library.**
* React's `form.tsx` is `react-hook-form`'s `FormProvider` and `Controller` plus shadcn's wiring, so
* its `FormLabel` and `FormMessage` read the error out of that library's state. Vue has no equivalent
* dependency here and adding one would need an ADR, so **the error is a prop**: pass it from
* vee-validate, from your own `reactive`, from wherever. What VUI contributes is the layout, the id
* derivation and the aria wiring, and that is what this ports.
*/
var FormItem_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "FormItem",
	props: {
		error: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const id = useId();
		provide(FORM_FIELD, {
			controlId: `${id}-form-item`,
			descriptionId: `${id}-form-item-description`,
			messageId: `${id}-form-item-message`,
			error: computed(() => props.error)
		});
		const classes = computed(() => cn(FORM_ITEM, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(classes.value),
				"data-slot": "form-item"
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { FormItem_vue_vue_type_script_setup_true_lang_default as default };

