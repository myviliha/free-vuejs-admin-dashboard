import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";
import { AVATAR_FALLBACK, cn } from "@viliha/vui-core";
//#region src/AvatarFallback.vue?vue&type=script&setup=true&lang.ts
/**
* The initials under the picture, and they are **always rendered**, as React's are.
*
* This wrapped Reka's `AvatarFallback`, which is a state machine: it shows the fallback while the
* image loads and removes it once the image succeeds. React's is a plain element that stays put, with
* `AVATAR_IMAGE` carrying `absolute inset-0 z-10` so the picture simply covers it. Both draw the same
* thing and only one of them keeps the initials in the document, which `check:parity` caught as "JD"
* missing from every page of the Vue edition (`PD-120`).
*
* **The reference's model is the one kept**, and not only because it is the reference. The image is
* `alt=""`, decorative by design, so the initials are what names the avatar for a screen reader; under
* Reka's model a loaded avatar had no accessible name at all. It also means no flash: there is no
* moment where the fallback is swapped out and the picture swapped in.
*
* The trade is that a slow image leaves the initials visible underneath rather than a blank circle,
* which is the better failure anyway, and it is what `avatar.tsx` documents.
*/
var AvatarFallback_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AvatarFallback",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(AVATAR_FALLBACK, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", {
				class: normalizeClass(classes.value),
				"data-slot": "avatar-fallback"
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { AvatarFallback_vue_vue_type_script_setup_true_lang_default as default };

