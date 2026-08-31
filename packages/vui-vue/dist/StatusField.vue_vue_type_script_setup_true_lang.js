import Tooltip_default from "./Tooltip.js";
import { Fragment, cloneVNode, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, normalizeClass, openBlock, renderList, resolveDynamicComponent, toDisplayString, unref, useId, useSlots, withCtx } from "vue";
import { STATUS_FIELD_ICON, STATUS_FIELD_ICON_SIZE, STATUS_FIELD_MESSAGE, STATUS_FIELD_PAD, STATUS_FIELD_STATE, STATUS_FIELD_TONE, STATUS_FIELD_WRAP, cn } from "@viliha/vui-core";
//#region src/StatusField.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["data-slot"];
var _hoisted_2 = {
	key: 0,
	d: "M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z",
	fill: "currentColor",
	"fill-rule": "evenodd",
	"clip-rule": "evenodd"
};
var _hoisted_3 = {
	key: 1,
	d: "M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z",
	fill: "currentColor",
	"fill-rule": "evenodd",
	"clip-rule": "evenodd"
};
var _hoisted_4 = ["id"];
var _hoisted_5 = ["id"];
/**
* Validation state on the control, with the message on an icon inside it (`PD-081`).
*
* **`cloneVNode` is how this works, and it is the only real difference from React.** React clones its
* child with `cloneElement` to add the state border and the two ARIA attributes; Vue's equivalent
* takes the same class and attrs over the default slot's first node. So the call site is identical in
* both editions: wrap the control, pass `state` and `message`, and nothing about the control changes.
*
* The slot is expected to hold **one** element. More than one and there is no single control to mark,
* so the first is decorated and the rest pass through untouched, which is what React's
* `isValidElement` check amounts to.
*
* **The two glyphs are inlined**, because this package has no icon dependency and every other
* component here draws its own path. They are Radix's `check-circled` and `info-circled` at the
* 15-unit box the rest of the set uses, so the shapes match React's exactly rather than approximately.
*/
var StatusField_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "StatusField",
	props: {
		state: {},
		message: {},
		messageBelow: { type: Boolean },
		class: {}
	},
	setup(__props) {
		const props = __props;
		const slots = useSlots();
		const messageId = useId();
		const control = computed(() => {
			const nodes = slots.default?.() ?? [];
			const first = nodes[0];
			if (!first || !props.state) return nodes;
			return [cloneVNode(first, {
				class: STATUS_FIELD_STATE[props.state],
				...props.state === "error" ? { "aria-invalid": "true" } : {},
				"aria-describedby": props.message ? messageId : void 0
			}), ...nodes.slice(1)];
		});
		const wrap = computed(() => cn(STATUS_FIELD_WRAP, props.state && STATUS_FIELD_PAD, !props.messageBelow && props.class));
		const tone = computed(() => props.state ? cn(STATUS_FIELD_ICON, STATUS_FIELD_TONE[props.state]) : void 0);
		const below = computed(() => props.state ? cn(STATUS_FIELD_MESSAGE, STATUS_FIELD_TONE[props.state]) : void 0);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(__props.messageBelow ? props.class : void 0),
				"data-slot": __props.messageBelow ? "status-field" : void 0
			}, [createElementVNode("div", { class: normalizeClass(wrap.value) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(control.value, (node, i) => {
				return openBlock(), createBlock(resolveDynamicComponent(node), { key: i });
			}), 128)), __props.state && __props.message ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(Tooltip_default, { content: __props.message }, {
				default: withCtx(() => [createElementVNode("span", { class: normalizeClass(tone.value) }, [(openBlock(), createElementBlock("svg", {
					class: normalizeClass(unref(STATUS_FIELD_ICON_SIZE)),
					viewBox: "0 0 15 15",
					fill: "none",
					"aria-hidden": "true",
					xmlns: "http://www.w3.org/2000/svg"
				}, [__props.state === "success" ? (openBlock(), createElementBlock("path", _hoisted_2)) : (openBlock(), createElementBlock("path", _hoisted_3))], 2))], 2)]),
				_: 1
			}, 8, ["content"]), !__props.messageBelow ? (openBlock(), createElementBlock("span", {
				key: 0,
				id: unref(messageId),
				class: "sr-only"
			}, toDisplayString(__props.message), 9, _hoisted_4)) : createCommentVNode("", true)], 64)) : createCommentVNode("", true)], 2), __props.messageBelow && __props.state && __props.message ? (openBlock(), createElementBlock("p", {
				key: 0,
				id: unref(messageId),
				class: normalizeClass(below.value)
			}, toDisplayString(__props.message), 11, _hoisted_5)) : createCommentVNode("", true)], 10, _hoisted_1);
		};
	}
});
//#endregion
export { StatusField_vue_vue_type_script_setup_true_lang_default as default };

