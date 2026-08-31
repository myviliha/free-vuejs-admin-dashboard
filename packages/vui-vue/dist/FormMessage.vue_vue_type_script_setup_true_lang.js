import { useFormField } from "./form-context.js";
import { Fragment, computed, createCommentVNode, createElementBlock, createTextVNode, defineComponent, normalizeClass, openBlock, renderSlot, toDisplayString, unref, useSlots } from "vue";
import { FORM_MESSAGE, cn } from "@viliha/vui-core";
//#region src/FormMessage.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["id"];
/**
* The row's validation message. Renders **nothing at all** when there is neither an error nor slot
* content, exactly as React's returns `null`, so an empty message never takes up a line.
*/
var FormMessage_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "FormMessage",
	props: { class: {} },
	setup(__props) {
		const props = __props;
		const field = useFormField();
		const classes = computed(() => cn(FORM_MESSAGE, props.class));
		const slots = useSlots();
		/**
		* **The error wins, and the slot is the fallback.** It was the other way round, so
		* `<FormMessage>Must be 8 characters</FormMessage>` inside an errored field rendered the hint and
		* swallowed the validation message. React computes `error ? error.message : children`, and this now
		* matches. The slot's rendered content is what decides whether anything renders at all, not the mere
		* presence of a slot, or an empty slot produced an empty red paragraph where React renders nothing.
		*/
		const slotText = () => (slots.default?.() ?? []).map((n) => typeof n.children === "string" ? n.children.trim() : n.children ? "x" : "").join("");
		const body = computed(() => Boolean(field.error.value) || Boolean(slotText()));
		return (_ctx, _cache) => {
			return body.value ? (openBlock(), createElementBlock("p", {
				key: 0,
				id: unref(field).messageId,
				class: normalizeClass(classes.value),
				"data-slot": "form-message"
			}, [unref(field).error.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(unref(field).error.value), 1)], 64)) : renderSlot(_ctx.$slots, "default", {}, void 0, void 0, 1)], 10, _hoisted_1)) : createCommentVNode("", true);
		};
	}
});
//#endregion
export { FormMessage_vue_vue_type_script_setup_true_lang_default as default };

