import { computed, createBlock, createElementBlock, createElementVNode, createVNode, defineComponent, normalizeClass, openBlock, renderSlot, toDisplayString, unref, withCtx } from "vue";
import { AvatarRoot } from "reka-ui";
import { AVATAR_PRESENCE_WRAP, AVATAR_ROOT, AVATAR_SIZES, AVATAR_STATUS, AVATAR_STATUS_SIZES, AVATAR_STATUS_TONES, cn } from "@viliha/vui-core";
//#region src/Avatar.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "sr-only" };
/**
* `size` and `status` arrived with React's rather than after it (`Z-14`).
*
* The catalogue says this edition ships `avatar`, and a prop the demo advertises which this component
* ignores is the catalogue over-claiming: the same gap review found on `Badge`'s `solid`. Six steps
* because the sizes an avatar is used at are not a continuum, and the presence dot is scaled per step
* because a 6px dot on a 64px circle is a speck and a 16px dot on a 24px one is a third of the face.
*
* **The dot is drawn outside the clip.** `AVATAR_ROOT` carries `overflow-hidden`, which is what crops
* the picture into a circle and would equally crop a dot sitting on the circle's edge, so presence adds
* a wrapper. Without a status the DOM is exactly what it always was, so no existing call site pays for
* a feature it does not use.
*/
var Avatar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Avatar",
	props: {
		size: {},
		status: {},
		statusLabel: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(AVATAR_ROOT, props.size ? AVATAR_SIZES[props.size] : void 0, props.class));
		const dot = computed(() => props.status ? cn(AVATAR_STATUS, AVATAR_STATUS_SIZES[props.size ?? "sm"], AVATAR_STATUS_TONES[props.status]) : void 0);
		return (_ctx, _cache) => {
			return __props.status ? (openBlock(), createElementBlock("span", {
				key: 0,
				class: normalizeClass(unref(AVATAR_PRESENCE_WRAP))
			}, [
				createVNode(unref(AvatarRoot), {
					class: normalizeClass(classes.value),
					"data-slot": "avatar"
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, ["class"]),
				createElementVNode("span", { class: normalizeClass(dot.value) }, null, 2),
				createElementVNode("span", _hoisted_1, toDisplayString(__props.statusLabel ?? __props.status), 1)
			], 2)) : (openBlock(), createBlock(unref(AvatarRoot), {
				key: 1,
				class: normalizeClass(classes.value),
				"data-slot": "avatar"
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["class"]));
		};
	}
});
//#endregion
export { Avatar_vue_vue_type_script_setup_true_lang_default as default };

