import { computed, createBlock, defineComponent, normalizeClass, openBlock, renderSlot, unref, withCtx } from "vue";
import { Primitive } from "reka-ui";
import { BREADCRUMB_LINK, cn } from "@viliha/vui-core";
//#region src/BreadcrumbLink.vue?vue&type=script&setup=true&lang.ts
var BreadcrumbLink_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BreadcrumbLink",
	props: {
		asChild: { type: Boolean },
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(BREADCRUMB_LINK, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: "a",
				"as-child": __props.asChild,
				class: normalizeClass(classes.value),
				"data-slot": "breadcrumb-link"
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["as-child", "class"]);
		};
	}
});
//#endregion
export { BreadcrumbLink_vue_vue_type_script_setup_true_lang_default as default };

