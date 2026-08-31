import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { cn } from "@viliha/vui-core";
//#region src/CardDescription.vue?vue&type=script&setup=true&lang.ts
var CardDescription_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CardDescription",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn("text-muted-foreground", props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("p", {
				class: normalizeClass(classes.value),
				"data-slot": "card-description"
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { CardDescription_vue_vue_type_script_setup_true_lang_default as default };

