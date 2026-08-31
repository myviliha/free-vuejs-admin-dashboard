import Button_default from "./Button.js";
import ConfirmDialog_default from "./ConfirmDialog.js";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, defineComponent, normalizeClass, openBlock, ref, renderList, renderSlot, toDisplayString, unref, withCtx } from "vue";
import { FORM_ACTION_ICON, FORM_FOOTER, FORM_FOOTER_BAR, actionRequiresValid, cn } from "@viliha/vui-core";
//#region src/FormFooter.vue?vue&type=script&setup=true&lang.ts
/**
* The form footer: the resolved actions, `align: "start"` ones on the left, and the confirm dialog and
* busy state while an async action settles.
*
* **This family could not port until wave 5**, because its entire surface (`FormAction`,
* `FormActionContext`, `BehaviourConfig`) is declared in the `config` family. Now that the contract is
* shared, a host's action list type-checks against either edition, and `actionRequiresValid`,
* `resolveFormActions` and `saveOutcome` are the same functions in both.
*
* **The icon is a slot rather than a prop**, and that is the one shape difference. React's `FormAction`
* carries a component; a Vue caller passes a template. The action's `icon` field is bound to `unknown`
* here for that reason, and the slot receives the action so a caller can switch on its id.
*/
var FormFooter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "FormFooter",
	props: {
		actions: {},
		ctx: {},
		run: { type: Function },
		class: {}
	},
	setup(__props, { expose: __expose }) {
		const props = __props;
		const confirming = ref(null);
		const busy = ref(null);
		const visible = computed(() => props.actions.filter((a) => a.visible?.(props.ctx) ?? true));
		const start = computed(() => visible.value.filter((a) => a.align === "start"));
		const end = computed(() => visible.value.filter((a) => a.align !== "start"));
		const barClasses = computed(() => cn(props.class ?? FORM_FOOTER_BAR));
		const act = async (action) => {
			busy.value = action.id;
			try {
				await props.run(action);
			} finally {
				busy.value = null;
			}
		};
		const press = (action) => {
			if (action.confirm) confirming.value = action;
			else act(action);
		};
		const disabled = (action) => busy.value !== null || (action.disabled?.(props.ctx) ?? false);
		const confirmed = () => {
			const action = confirming.value;
			confirming.value = null;
			if (action) act(action);
		};
		__expose({ actionRequiresValid });
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createElementVNode("div", { class: normalizeClass(barClasses.value) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(start.value, (action) => {
				return openBlock(), createBlock(Button_default, {
					key: action.id,
					type: "button",
					variant: action.variant,
					disabled: disabled(action),
					onClick: ($event) => press(action)
				}, {
					default: withCtx(() => [_ctx.$slots.icon && action.icon ? (openBlock(), createElementBlock("span", {
						key: 0,
						class: normalizeClass(unref(FORM_ACTION_ICON))
					}, [renderSlot(_ctx.$slots, "icon", { action })], 2)) : createCommentVNode("", true), createTextVNode(" " + toDisplayString(action.label), 1)]),
					_: 2
				}, 1032, [
					"variant",
					"disabled",
					"onClick"
				]);
			}), 128)), createElementVNode("div", { class: normalizeClass(unref(FORM_FOOTER)) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(end.value, (action) => {
				return openBlock(), createBlock(Button_default, {
					key: action.id,
					type: "button",
					variant: action.variant,
					disabled: disabled(action),
					onClick: ($event) => press(action)
				}, {
					default: withCtx(() => [_ctx.$slots.icon && action.icon ? (openBlock(), createElementBlock("span", {
						key: 0,
						class: normalizeClass(unref(FORM_ACTION_ICON))
					}, [renderSlot(_ctx.$slots, "icon", { action })], 2)) : createCommentVNode("", true), createTextVNode(" " + toDisplayString(action.label), 1)]),
					_: 2
				}, 1032, [
					"variant",
					"disabled",
					"onClick"
				]);
			}), 128))], 2)], 2), confirming.value ? (openBlock(), createBlock(ConfirmDialog_default, {
				key: 0,
				open: true,
				title: confirming.value.confirm?.title ?? "",
				description: confirming.value.confirm?.body,
				"confirm-label": confirming.value.confirm?.confirmLabel ?? confirming.value.label,
				destructive: confirming.value.variant === "destructive",
				onConfirm: confirmed,
				onCancel: _cache[0] || (_cache[0] = ($event) => confirming.value = null)
			}, null, 8, [
				"title",
				"description",
				"confirm-label",
				"destructive"
			])) : createCommentVNode("", true)], 64);
		};
	}
});
//#endregion
export { FormFooter_vue_vue_type_script_setup_true_lang_default as default };

