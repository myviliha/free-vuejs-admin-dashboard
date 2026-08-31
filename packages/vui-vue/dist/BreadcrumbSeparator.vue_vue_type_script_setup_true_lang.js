import { computed, createElementBlock, createElementVNode, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { BREADCRUMB_SEPARATOR, cn } from "@viliha/vui-core";
//#region src/BreadcrumbSeparator.vue?vue&type=script&setup=true&lang.ts
var BreadcrumbSeparator_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BreadcrumbSeparator",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(BREADCRUMB_SEPARATOR, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("li", {
				class: normalizeClass(classes.value),
				"data-slot": "breadcrumb-separator",
				role: "presentation",
				"aria-hidden": "true"
			}, [renderSlot(_ctx.$slots, "default", {}, () => [_cache[0] || (_cache[0] = createElementVNode("svg", {
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 15 15",
				fill: "none"
			}, [createElementVNode("path", {
				d: "M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z",
				fill: "currentColor",
				"fill-rule": "evenodd",
				"clip-rule": "evenodd"
			})], -1))])], 2);
		};
	}
});
//#endregion
export { BreadcrumbSeparator_vue_vue_type_script_setup_true_lang_default as default };

