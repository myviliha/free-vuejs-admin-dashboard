import RequiredMark_default from "./RequiredMark.js";
import Tooltip_default from "./Tooltip.js";
import { cloneVNode, computed, defineComponent, h, onBeforeUnmount, onMounted, ref, useId, watch } from "vue";
import { FIELD_CONTROL, FIELD_CONTROL_INNER, FIELD_ERROR_ICON, FIELD_ERROR_ICON_CENTERED, FIELD_ERROR_ICON_MULTILINE, FIELD_ERROR_ICON_SIZE, FIELD_ERROR_PAD, FIELD_HINT, FIELD_LABEL, FIELD_LABEL_MULTILINE, FIELD_ROW, SR_ONLY, cn } from "@viliha/vui-core";
//#region src/Field.vue?vue&type=script&lang.ts
/**
* One field row: a left-aligned label in column 1 and its control in column 2. **Must be a direct
* child of `FieldGrid`.**
*
* Pass `error` for the theme's inline validation: the control border turns red via its
* `aria-invalid` styling and an alert triangle carries the message in a tooltip, with no layout
* shift and the full text announced to screen readers. The error **clears the moment the user edits
* the field** and re-arms on the next form submit, so a page sets `error` and never clears it on
* change. Set `multiline` when the control is a `Textarea`.
*
* **This is a render function rather than a template, and the honest reason is decision `D10`**,
* which specified that shape. React's `Field` uses `cloneElement` to push the aria wiring into
* whatever control it wraps; the Vue equivalent is `cloneVNode`, and the `mergeProps` inside it
* chains `onInput` with the control's own handler rather than replacing it.
*
* A review argued that doing the clone inside a props-less child component froze the control on its
* first vnode, because such a component fails Vue's `shouldUpdateComponent` check. **That did not
* reproduce**: the original template version passes every test in `field-updates.test.ts`. The shape
* stays because it is the recorded decision and it removes the question, not because it fixed a
* proven defect. Cloning in the component's own render effect cannot go stale by construction.
*/
var Field_vue_vue_type_script_lang_default = defineComponent({
	name: "VuiField",
	props: {
		label: {
			type: String,
			required: true
		},
		htmlFor: String,
		/** Show the required marker next to the label. */
		required: Boolean,
		/** Helper text under the control (hidden while an error shows). */
		hint: String,
		/** Inline validation message. Falsy = valid. */
		error: String,
		/** Position the alert icon at the top (for a `Textarea`) instead of centered. */
		multiline: Boolean,
		/** Extra classes on the control cell (column 2). */
		class: String
	},
	setup(props, { slots }) {
		const errorId = useId();
		const edited = ref(false);
		watch(() => props.error, () => {
			edited.value = false;
		});
		const showError = computed(() => Boolean(props.error) && !edited.value);
		const anchor = ref(null);
		let form = null;
		const rearm = () => {
			edited.value = false;
		};
		onMounted(() => {
			form = anchor.value?.closest("form") ?? null;
			form?.addEventListener("submit", rearm);
		});
		onBeforeUnmount(() => form?.removeEventListener("submit", rearm));
		const labelClasses = computed(() => cn(FIELD_LABEL, props.multiline && FIELD_LABEL_MULTILINE));
		const controlClasses = computed(() => cn(FIELD_CONTROL, props.class));
		const innerClasses = computed(() => cn(FIELD_CONTROL_INNER, showError.value && FIELD_ERROR_PAD));
		const iconClasses = computed(() => cn(FIELD_ERROR_ICON, props.multiline ? FIELD_ERROR_ICON_MULTILINE : FIELD_ERROR_ICON_CENTERED));
		/**
		* The wiring goes on the first vnode that can carry an attribute, and **every other node is
		* returned untouched**. Two cases made that necessary rather than tidy: a caller passing a
		* control plus a sibling had the sibling silently dropped, and outside a production build a
		* leading HTML comment is itself a vnode, so cloning `nodes[0]` cloned the comment and the
		* control vanished. Comments, text and fragments carry a `symbol` type; an element is a string
		* and a component is an object or a function.
		*/
		const control = () => {
			const nodes = slots.default?.() ?? [];
			const target = nodes.find((n) => typeof n.type !== "symbol");
			if (!target) return nodes;
			const extra = {
				"aria-invalid": showError.value ? true : void 0,
				"aria-describedby": showError.value ? errorId : void 0,
				onInput: () => {
					if (props.error) edited.value = true;
				}
			};
			return nodes.map((n) => n === target ? cloneVNode(n, extra) : n);
		};
		const errorIcon = () => h("span", { class: iconClasses.value }, h(Tooltip_default, { content: props.error }, () => h("svg", {
			class: FIELD_ERROR_ICON_SIZE,
			width: "15",
			height: "15",
			viewBox: "0 0 15 15",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true"
		}, h("path", {
			d: "M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z",
			fill: "currentColor",
			"fill-rule": "evenodd",
			"clip-rule": "evenodd"
		}))));
		return () => h("div", { class: FIELD_ROW }, [h("label", {
			ref: anchor,
			for: props.htmlFor,
			class: labelClasses.value
		}, [props.label, props.required ? h(RequiredMark_default) : null]), h("div", { class: controlClasses.value }, [
			h("div", { class: innerClasses.value }, [...control(), showError.value ? errorIcon() : null]),
			showError.value ? h("span", {
				id: errorId,
				class: SR_ONLY
			}, props.error) : null,
			props.hint && !showError.value ? h("p", { class: FIELD_HINT }, props.hint) : null
		])]);
	}
});
//#endregion
export { Field_vue_vue_type_script_lang_default as default };

