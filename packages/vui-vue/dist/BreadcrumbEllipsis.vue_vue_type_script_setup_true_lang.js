import { computed, createElementBlock, createElementVNode, defineComponent, normalizeClass, openBlock, unref } from "vue";
import { BREADCRUMB_ELLIPSIS, BREADCRUMB_ELLIPSIS_ICON, SR_ONLY, cn } from "@viliha/vui-core";
//#region src/BreadcrumbEllipsis.vue?vue&type=script&setup=true&lang.ts
var BreadcrumbEllipsis_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BreadcrumbEllipsis",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(BREADCRUMB_ELLIPSIS, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", {
				class: normalizeClass(classes.value),
				"data-slot": "breadcrumb-ellipsis",
				role: "presentation",
				"aria-hidden": "true"
			}, [(openBlock(), createElementBlock("svg", {
				class: normalizeClass(unref(BREADCRUMB_ELLIPSIS_ICON)),
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 15 15",
				fill: "none"
			}, [..._cache[0] || (_cache[0] = [createElementVNode("path", {
				d: "M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z",
				fill: "currentColor",
				"fill-rule": "evenodd",
				"clip-rule": "evenodd"
			}, null, -1)])], 2)), createElementVNode("span", { class: normalizeClass(unref(SR_ONLY)) }, "More", 2)], 2);
		};
	}
});
//#endregion
export { BreadcrumbEllipsis_vue_vue_type_script_setup_true_lang_default as default };

