import { computed, createBlock, defineComponent, normalizeClass, openBlock, unref } from "vue";
import { AvatarImage } from "reka-ui";
import { AVATAR_IMAGE, cn } from "@viliha/vui-core";
//#region src/AvatarImage.vue?vue&type=script&setup=true&lang.ts
var AvatarImage_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AvatarImage",
	props: {
		src: {},
		alt: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(AVATAR_IMAGE, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(AvatarImage), {
				src: props.src ?? "",
				alt: props.alt,
				class: normalizeClass(classes.value),
				"data-slot": "avatar-image"
			}, null, 8, [
				"src",
				"alt",
				"class"
			]);
		};
	}
});
//#endregion
export { AvatarImage_vue_vue_type_script_setup_true_lang_default as default };

