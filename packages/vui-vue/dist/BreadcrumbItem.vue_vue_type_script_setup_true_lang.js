import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { BREADCRUMB_ITEM, cn } from "@viliha/vui-core";
//#region src/BreadcrumbItem.vue?vue&type=script&setup=true&lang.ts
var BreadcrumbItem_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BreadcrumbItem",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(BREADCRUMB_ITEM, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("li", {
				class: normalizeClass(classes.value),
				"data-slot": "breadcrumb-item"
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { BreadcrumbItem_vue_vue_type_script_setup_true_lang_default as default };

