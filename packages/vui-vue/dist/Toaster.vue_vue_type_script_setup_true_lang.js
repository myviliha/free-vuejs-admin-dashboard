import { dismissToast, getToasts, subscribeToasts } from "@viliha/vui-core/toast";
import { Fragment, Teleport, createBlock, createCommentVNode, createElementBlock, createElementVNode, defineComponent, normalizeClass, onMounted, onUnmounted, openBlock, renderList, shallowRef, toDisplayString, unref } from "vue";
import { TOAST_ACTION, TOAST_BODY, TOAST_CARD, TOAST_DESCRIPTION, TOAST_DISMISS, TOAST_DISMISS_ICON, TOAST_ICON, TOAST_ICON_STATES, TOAST_REGION, TOAST_TITLE, cn } from "@viliha/vui-core";
//#region src/Toaster.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["aria-live"];
var _hoisted_2 = ["d"];
var _hoisted_3 = ["onClick"];
var _hoisted_4 = ["onClick"];
/**
* Mount once, near the root. Renders the toast stack bottom-right, and every `toast(...)` call from
* anywhere in the app lands here.
*
* **The queue is not this component's.** It lives in `@viliha/vui-core/toast`, the same module the
* React edition uses, so the imperative API (`toast.success`, `toast.error`, `dismissToast`) is
* identical in both by construction. This component subscribes and paints, which is all a `Toaster`
* should ever be.
*
* `shallowRef` on purpose: the store owns the array and replaces it on every change, so deep
* reactivity would only walk items that never mutate in place.
*/
var Toaster_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Toaster",
	setup(__props) {
		const items = shallowRef(getToasts());
		let stop;
		onMounted(() => {
			stop = subscribeToasts(() => {
				items.value = getToasts();
			});
			items.value = getToasts();
		});
		onUnmounted(() => stop?.());
		/** The three variant glyphs, keyed the way `TOAST_ICON_STATES` is. */
		const ICON_PATH = {
			success: "M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z",
			error: "M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z",
			warning: "M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z"
		};
		const fire = (item) => {
			item.action?.onClick();
			dismissToast(item.id);
		};
		return (_ctx, _cache) => {
			return openBlock(), createBlock(Teleport, { to: "body" }, [createElementVNode("div", {
				role: "region",
				"aria-label": "Notifications",
				class: normalizeClass(unref(TOAST_REGION))
			}, [(openBlock(true), createElementBlock(Fragment, null, renderList(items.value, (item) => {
				return openBlock(), createElementBlock("div", {
					key: item.id,
					role: "status",
					"aria-live": item.variant === "error" ? "assertive" : "polite",
					class: normalizeClass(unref(TOAST_CARD))
				}, [
					item.variant && item.variant !== "default" ? (openBlock(), createElementBlock("svg", {
						key: 0,
						class: normalizeClass(unref(cn)(unref(TOAST_ICON), unref(TOAST_ICON_STATES)[item.variant])),
						width: "15",
						height: "15",
						viewBox: "0 0 15 15",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg",
						"aria-hidden": "true"
					}, [createElementVNode("path", {
						d: ICON_PATH[item.variant],
						fill: "currentColor",
						"fill-rule": "evenodd",
						"clip-rule": "evenodd"
					}, null, 8, _hoisted_2)], 2)) : createCommentVNode("", true),
					createElementVNode("div", { class: normalizeClass(unref(TOAST_BODY)) }, [createElementVNode("p", { class: normalizeClass(unref(TOAST_TITLE)) }, toDisplayString(item.title), 3), item.description ? (openBlock(), createElementBlock("p", {
						key: 0,
						class: normalizeClass(unref(TOAST_DESCRIPTION))
					}, toDisplayString(item.description), 3)) : createCommentVNode("", true)], 2),
					item.action ? (openBlock(), createElementBlock("button", {
						key: 1,
						type: "button",
						class: normalizeClass(unref(TOAST_ACTION)),
						onClick: ($event) => fire(item)
					}, toDisplayString(item.action.label), 11, _hoisted_3)) : createCommentVNode("", true),
					createElementVNode("button", {
						type: "button",
						"aria-label": "Dismiss",
						class: normalizeClass(unref(TOAST_DISMISS)),
						onClick: ($event) => unref(dismissToast)(item.id)
					}, [(openBlock(), createElementBlock("svg", {
						class: normalizeClass(unref(TOAST_DISMISS_ICON)),
						width: "15",
						height: "15",
						viewBox: "0 0 15 15",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg"
					}, [..._cache[0] || (_cache[0] = [createElementVNode("path", {
						d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
						fill: "currentColor",
						"fill-rule": "evenodd",
						"clip-rule": "evenodd"
					}, null, -1)])], 2))], 10, _hoisted_4)
				], 10, _hoisted_1);
			}), 128))], 2)]);
		};
	}
});
//#endregion
export { Toaster_vue_vue_type_script_setup_true_lang_default as default };

