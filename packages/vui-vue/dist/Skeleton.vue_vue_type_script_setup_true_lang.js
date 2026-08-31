import { computed, createElementBlock, defineComponent, normalizeClass, openBlock } from "vue";
import { SKELETON, cn } from "@viliha/vui-core";
//#region src/Skeleton.vue?vue&type=script&setup=true&lang.ts
var Skeleton_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Skeleton",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(SKELETON, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				"data-slot": "skeleton",
				class: normalizeClass(classes.value)
			}, null, 2);
		};
	}
});
//#endregion
export { Skeleton_vue_vue_type_script_setup_true_lang_default as default };

