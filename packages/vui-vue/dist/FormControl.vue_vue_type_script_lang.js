import { useFormFieldOrThrow } from "./form-context.js";
import { cloneVNode, defineComponent } from "vue";
//#region src/FormControl.vue?vue&type=script&lang.ts
/**
* Wires the control it wraps to the row's ids, the same job React does with a Radix `Slot`.
*
* A render function rather than a template, for the reason `Field.vue` documents: `cloneVNode` is
* Vue's equivalent of `cloneElement`, and doing it inside a props-less child component is a shape
* whose update behaviour is not worth relying on. The wiring goes on the first node that can carry an
* attribute, and every other node is returned untouched, so a caller passing a control plus a sibling
* keeps the sibling.
*/
var FormControl_vue_vue_type_script_lang_default = defineComponent({
	name: "VuiFormControl",
	setup(_, { slots }) {
		const field = useFormFieldOrThrow();
		return () => {
			const nodes = slots.default?.() ?? [];
			const target = nodes.find((n) => typeof n.type !== "symbol");
			if (!target) return nodes;
			const invalid = Boolean(field.error.value);
			const extra = {
				id: field.controlId,
				"aria-describedby": invalid ? `${field.descriptionId} ${field.messageId}` : field.descriptionId,
				"aria-invalid": invalid ? true : void 0,
				"data-slot": "form-control"
			};
			/**
			* **The child's own props win**, which is what Radix's `Slot` does and what `cloneVNode` does
			* not: `mergeProps` gives the later object precedence, so an `<Input id="email">` had its id
			* replaced by the generated one and its `data-slot` overwritten. Spreading the child's props
			* last restores React's precedence.
			*/
			return nodes.map((n) => n === target ? cloneVNode(n, {
				...extra,
				...n.props ?? {}
			}) : n);
		};
	}
});
//#endregion
export { FormControl_vue_vue_type_script_lang_default as default };

