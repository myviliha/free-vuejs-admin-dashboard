import RecordForm_default from "./RecordForm.js";
import { computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createSlots, defineComponent, guardReactiveProps, normalizeClass, normalizeProps, openBlock, ref, renderSlot, resolveDynamicComponent, unref, withCtx } from "vue";
import { PROFILE_SKELETON_BAR, PROFILE_SKELETON_BODY, PROFILE_SKELETON_CARD, PROFILE_SKELETON_ROOT } from "@viliha/vui-core";
//#region src/ProfileForm.vue?vue&type=script&setup=true&lang.ts
/**
* A pre-designed profile page: one record shown read-only, with an **Edit** button that switches to
* edit mode with the standard Cancel + Save footer. Feed it `fields` (grouped into sections by each
* field's `group`) and `data`; it owns the view/edit toggle, reverts on Cancel, and shows a skeleton
* while loading.
*
* **The revert is a remount, and that is the whole trick.** `RecordForm` buffers a draft, so the way to
* throw the draft away is to give it a new `key` and let it re-seed from the record. React bumps a
* `formKey` for exactly this; the counter here does the same job, and the alternative — reaching into
* the form to reset it — would need an API the form does not have and should not grow.
*/
var ProfileForm_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ProfileForm",
	props: {
		data: {},
		fields: {},
		getPrimary: {},
		title: { default: "Profile" },
		singular: { default: "profile" },
		icon: {},
		formDescription: {},
		columns: { default: 2 },
		onHome: {},
		crumbs: {},
		loading: { type: Boolean }
	},
	emits: ["save", "exit"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const mode = ref("view");
		/** Bumped on Save and Cancel to remount the form so its buffered draft re-seeds from the record. */
		const formKey = ref(0);
		const busy = computed(() => (props.loading ?? props.data == null) || !props.data);
		const save = (row) => {
			emit("save", row);
			mode.value = "view";
			formKey.value += 1;
		};
		const cancel = () => {
			if (mode.value === "edit") {
				mode.value = "view";
				formKey.value += 1;
				return;
			}
			emit("exit");
		};
		return (_ctx, _cache) => {
			return busy.value ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: normalizeClass(unref(PROFILE_SKELETON_ROOT))
			}, [createElementVNode("div", { class: normalizeClass(unref(PROFILE_SKELETON_BAR)) }, null, 2), createElementVNode("div", { class: normalizeClass(unref(PROFILE_SKELETON_BODY)) }, [createElementVNode("div", { class: normalizeClass(unref(PROFILE_SKELETON_CARD)) }, null, 2)], 2)], 2)) : __props.data ? (openBlock(), createBlock(RecordForm_default, {
				key: formKey.value,
				columns: __props.columns,
				"read-only": mode.value === "view",
				"on-edit": () => mode.value = "edit",
				fields: __props.fields,
				row: __props.data,
				title: __props.title,
				singular: __props.singular,
				"get-primary": __props.getPrimary,
				"form-description": __props.formDescription,
				"on-home": __props.onHome,
				crumbs: __props.crumbs,
				onSave: save,
				onCancel: cancel
			}, createSlots({ _: 2 }, [__props.icon || _ctx.$slots.icon ? {
				name: "icon",
				fn: withCtx((p) => [renderSlot(_ctx.$slots, "icon", normalizeProps(guardReactiveProps(p)), () => [(openBlock(), createBlock(resolveDynamicComponent(__props.icon), { class: normalizeClass(p.class) }, null, 8, ["class"]))])]),
				key: "0"
			} : void 0, _ctx.$slots["action-icon"] ? {
				name: "action-icon",
				fn: withCtx((p) => [renderSlot(_ctx.$slots, "action-icon", normalizeProps(guardReactiveProps(p)))]),
				key: "1"
			} : void 0]), 1032, [
				"columns",
				"read-only",
				"on-edit",
				"fields",
				"row",
				"title",
				"singular",
				"get-primary",
				"form-description",
				"on-home",
				"crumbs"
			])) : createCommentVNode("", true);
		};
	}
});
//#endregion
export { ProfileForm_vue_vue_type_script_setup_true_lang_default as default };

