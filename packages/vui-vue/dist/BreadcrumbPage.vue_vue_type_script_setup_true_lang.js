import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { BREADCRUMB_PAGE, cn } from "@viliha/vui-core";
//#region src/BreadcrumbPage.vue?vue&type=script&setup=true&lang.ts
var BreadcrumbPage_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BreadcrumbPage",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(BREADCRUMB_PAGE, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", {
				class: normalizeClass(classes.value),
				"data-slot": "breadcrumb-page",
				role: "link",
				"aria-disabled": "true",
				"aria-current": "page"
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { BreadcrumbPage_vue_vue_type_script_setup_true_lang_default as default };

