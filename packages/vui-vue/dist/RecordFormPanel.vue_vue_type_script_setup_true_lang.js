import RecordDetailPanel_default from "./RecordDetailPanel.js";
import { createBlock, defineComponent, guardReactiveProps, mergeProps, normalizeProps, openBlock, renderSlot, withCtx } from "vue";
//#region src/RecordFormPanel.vue?vue&type=script&setup=true&lang.ts
/**
* The standard Add / Edit / View **slide-over**, used outside a table (on a Kanban board, from a
* toolbar). Same overlay, same `fields`-driven layout and same footer as the panel `RecordView` opens.
* Never hand-roll an add/edit form.
*/
var RecordFormPanel_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RecordFormPanel",
	props: {
		fields: {},
		row: {},
		singular: {},
		getPrimary: { type: Function },
		readOnly: { type: Boolean },
		onEdit: { type: Function },
		layout: {},
		columns: {},
		isNew: { type: Boolean },
		title: {},
		onHome: { type: Function },
		formDescription: {},
		persistKey: {},
		formActions: { type: [Array, Function] },
		formSlots: {},
		behaviour: {},
		formRows: {},
		sections: {},
		crumbs: {}
	},
	emits: ["save", "cancel"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		/** Named, because a template expression cannot carry a type annotation. */
		const onSave = (row, then) => emit("save", row, then);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(RecordDetailPanel_default, mergeProps(props, {
				layout: "panel",
				onSave,
				onCancel: _cache[0] || (_cache[0] = ($event) => emit("cancel"))
			}), {
				icon: withCtx((p) => [renderSlot(_ctx.$slots, "icon", normalizeProps(guardReactiveProps(p)))]),
				"action-icon": withCtx((p) => [renderSlot(_ctx.$slots, "action-icon", normalizeProps(guardReactiveProps(p)))]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
export { RecordFormPanel_vue_vue_type_script_setup_true_lang_default as default };

