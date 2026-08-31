import { computed, createBlock, defineComponent, normalizeClass, openBlock, unref } from "vue";
import { Separator } from "reka-ui";
import { SEPARATOR_BASE, cn } from "@viliha/vui-core";
//#region src/Separator.vue?vue&type=script&setup=true&lang.ts
var Separator_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Separator",
	props: {
		orientation: { default: "horizontal" },
		decorative: {
			type: Boolean,
			default: true
		},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(SEPARATOR_BASE, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Separator), {
				"data-slot": "separator",
				orientation: __props.orientation,
				decorative: __props.decorative,
				class: normalizeClass(classes.value)
			}, null, 8, [
				"orientation",
				"decorative",
				"class"
			]);
		};
	}
});
//#endregion
export { Separator_vue_vue_type_script_setup_true_lang_default as default };

