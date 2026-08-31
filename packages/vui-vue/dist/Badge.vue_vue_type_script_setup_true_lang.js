import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { BADGE_BASE, BADGE_SIZES, BADGE_SOLID, BADGE_VARIANTS, cn } from "@viliha/vui-core";
//#region src/Badge.vue?vue&type=script&setup=true&lang.ts
var Badge_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Badge",
	props: {
		variant: { default: "default" },
		solid: { type: Boolean },
		size: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(BADGE_BASE, (props.solid ? BADGE_SOLID : BADGE_VARIANTS)[props.variant], props.size ? BADGE_SIZES[props.size] : void 0, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", { class: normalizeClass(classes.value) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { Badge_vue_vue_type_script_setup_true_lang_default as default };

