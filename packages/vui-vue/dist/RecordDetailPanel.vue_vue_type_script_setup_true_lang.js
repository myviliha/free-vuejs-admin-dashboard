import Button_default from "./Button.js";
import Breadcrumbs_default from "./Breadcrumbs.js";
import { useVuiConfig } from "./config-context.js";
import { RECORD_FORM } from "./record-form-context.js";
import RecordFormBody_default from "./RecordFormBody.js";
import RecordFormFooter_default from "./RecordFormFooter.js";
import { clearPersisted, usePersistentState } from "./record-field.js";
import { Fragment, computed, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, guardReactiveProps, normalizeClass, normalizeProps, openBlock, provide, ref, renderList, renderSlot, toDisplayString, unref, watch, withCtx } from "vue";
import { FORM_BACKDROP, FORM_BACKDROP_STATES, FORM_CLOSE_BUTTON, FORM_CLOSE_ICON, FORM_DOC_BODY, FORM_DOC_ICON, FORM_DOC_INTRO, FORM_DOC_ITEM, FORM_DOC_LIST, FORM_DOC_PANEL, FORM_DOC_TERM, FORM_DOC_TEXT, FORM_DOC_TITLE, FORM_PAGE, FORM_PAGE_BAR, FORM_PAGE_CARD, FORM_PAGE_MAIN, FORM_PAGE_ROW, FORM_PAGE_SCROLL, FORM_PAGE_WIDTH, FORM_PANEL, FORM_PANEL_BODY, FORM_PANEL_HEADER, FORM_PANEL_ICON, FORM_PANEL_ICON_CHIP, FORM_PANEL_STATES, FORM_PANEL_TITLE, FORM_PANEL_TITLE_EMPTY, actionRequiresValid, cn, defaultFormActions, resolveFormActions, resolveFormRows, saveOutcome, validateField } from "@viliha/vui-core";
//#region src/RecordDetailPanel.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["aria-label"];
var _hoisted_2 = ["aria-label"];
/**
* Create, edit or view one record: a slide-over by default, a full page with `layout="page"`.
*
* **Nothing about where a field sits is decided here.** `resolveFormRows` puts the sections on rows,
* `groupSlots` places a host's slots, `validateField` runs the rules, and `defaultFormActions` builds
* the footer — all of them `@viliha/vui-core`, all of them the same functions the React edition calls,
* so a `fields` array renders the same form in both. What is written twice is the reactivity: React
* buffers the draft in `useState` and cascades in an effect, this buffers it in a `ref` and cascades in
* a watcher (`D18`).
*
* **`onSave`/`onCancel` are emits here, not props**, which is the Vue convention and costs nothing: a
* host writing `@save` gets React's `onSave` contract, including the `then` argument that lets
* "Save & New" hand the form a blank record.
*/
var RecordDetailPanel_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RecordDetailPanel",
	props: {
		fields: {},
		row: {},
		singular: {},
		getPrimary: {},
		readOnly: {
			type: Boolean,
			default: false
		},
		onEdit: {},
		layout: { default: "panel" },
		columns: { default: 1 },
		isNew: {
			type: Boolean,
			default: false
		},
		title: {},
		onHome: {},
		formDescription: {},
		persistKey: {},
		formActions: {},
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
		const config = useVuiConfig();
		const formConfig = computed(() => config.value.form ?? {});
		/**
		* Errors highlight the control's border and live on the field's info icon by default: a line of red
		* text under a control pushes the rest of the form down while someone is still typing in it.
		*/
		const errorDisplay = computed(() => formConfig.value.errorDisplay ?? "tooltip");
		const behaviour = computed(() => props.behaviour ?? config.value.behaviour ?? {});
		const rows = computed(() => resolveFormRows(props.fields, props.formRows, props.sections, formConfig.value.sectionColumns ?? (props.layout === "page" && props.columns === 2 ? 2 : void 0)));
		const draftKey = computed(() => props.persistKey ? `${props.persistKey}::draft` : void 0);
		const draft = usePersistentState(draftKey.value, props.row);
		const errors = ref(/* @__PURE__ */ new Map());
		/**
		* **Reset only when a genuinely different record is opened.** Watching the id rather than the object is
		* what lets a restored or in-progress draft survive a re-render that hands the same row back — the
		* failure being a half-typed form wiped by its parent re-rendering.
		*/
		watch(() => props.row.id, () => {
			draft.value = props.row;
			errors.value = /* @__PURE__ */ new Map();
		});
		/**
		* Cascading options: after the draft changes, clear any choice field whose value is no longer valid
		* once its options recompute — changing Region drops a now-invalid Country. Only function-options
		* fields cascade; static ones never invalidate. Settles in one pass, since a cleared value is `""` and
		* skips.
		*
		* **`immediate`, because React's effect runs on mount and this watcher did not.** A form opened on an
		* already-inconsistent row — a stored country that its stored region no longer offers — then saved the
		* stale pair, which is the exact failure the cascade exists to prevent. `fields` is a source for the
		* same reason it is in React's dependency list: a host that swaps the array swaps the `options`
		* closures with it.
		*/
		watch([draft, () => props.fields], ([d]) => {
			const stale = props.fields.filter((f) => {
				if (typeof f.options !== "function") return false;
				const v = d[f.key];
				if (v == null || v === "") return false;
				return !f.options(d).some((o) => o.value === String(v));
			});
			if (!stale.length) return;
			const next = { ...d };
			for (const f of stale) next[f.key] = "";
			draft.value = next;
		}, {
			deep: true,
			immediate: true
		});
		const primary = computed(() => props.getPrimary(draft.value));
		const asString = (row, key) => String(row[key] ?? "");
		/** Fields whose rules run here: editable, and not a custom read-only renderer. */
		const editableFields = computed(() => props.fields.filter((f) => f.editable && !f.render));
		/** Run one field's rules against `next`, and set or clear its inline message. */
		const validateOne = (field, next) => {
			const msg = validateField(field, asString(next, field.key), next);
			const m = new Map(errors.value);
			if (msg) m.set(field.key, msg);
			else m.delete(field.key);
			errors.value = m;
			return msg;
		};
		const setField = (key, value) => {
			draft.value = {
				...draft.value,
				[key]: value
			};
			if (errors.value.has(key)) {
				const field = props.fields.find((f) => f.key === key);
				if (field) validateOne(field, draft.value);
			}
		};
		const closing = ref(false);
		let pending = null;
		/** A page form has no slide-out, so its action runs immediately. */
		const dismiss = (action) => {
			if (props.layout === "page") {
				action();
				return;
			}
			pending = action;
			closing.value = true;
		};
		const animationEnd = (e) => {
			if (e.target !== e.currentTarget || !closing.value || !pending) return;
			const run = pending;
			pending = null;
			run();
		};
		/**
		* Trim the fields that asked for it, then validate everything. Returns the cleaned draft, or `null`
		* when a field fails — its message is already inline by then.
		*/
		const validateDraft = () => {
			let next = draft.value;
			for (const f of editableFields.value) {
				if (!f.trim) continue;
				const v = asString(next, f.key);
				if (v.trim() !== v) next = {
					...next,
					[f.key]: v.trim()
				};
			}
			const found = /* @__PURE__ */ new Map();
			for (const f of editableFields.value) {
				const msg = validateField(f, asString(next, f.key), next);
				if (msg) found.set(f.key, msg);
			}
			draft.value = next;
			errors.value = found;
			return found.size ? null : next;
		};
		const confirmDiscard = ref(false);
		const discard = () => {
			confirmDiscard.value = false;
			clearPersisted(draftKey.value);
			dismiss(() => emit("cancel"));
		};
		const handleCancel = () => {
			if ((behaviour.value.confirmDiscardWhenDirty ?? false) && !props.readOnly && JSON.stringify(draft.value) !== JSON.stringify(props.row)) {
				confirmDiscard.value = true;
				return;
			}
			discard();
		};
		const ctx = computed(() => ({
			mode: props.readOnly ? "view" : props.isNew ? "create" : "edit",
			row: draft.value,
			dirty: JSON.stringify(draft.value) !== JSON.stringify(props.row),
			valid: errors.value.size === 0,
			errors: errors.value,
			close: handleCancel,
			reset: () => {
				draft.value = props.row;
				errors.value = /* @__PURE__ */ new Map();
			},
			edit: props.onEdit
		}));
		const actions = computed(() => resolveFormActions(defaultFormActions({
			readOnly: props.readOnly,
			canEdit: Boolean(props.onEdit)
		}), props.formActions ?? formConfig.value.actions));
		/**
		* Run one action. The rule, in one sentence: an action closes the form when it finishes unless it
		* returns `false`, and an action that validates (the primary one, by default) commits the draft on the
		* way out. That is why the shipped Save has an empty `onAct` — committing is this function's job, so
		* any action a host marks `requiresValid` saves the same way, with the same validation and the same
		* discarded draft.
		*/
		const run = async (action) => {
			const validated = actionRequiresValid(action) ? validateDraft() : draft.value;
			if (!validated) return;
			if (await action.onAct({
				...ctx.value,
				row: validated
			}) === false) return;
			if (actionRequiresValid(action)) {
				clearPersisted(draftKey.value);
				const outcome = saveOutcome(action.after, behaviour.value);
				if (outcome === "close") dismiss(() => emit("save", validated, outcome));
				else emit("save", validated, outcome);
			} else handleCancel();
		};
		provide(RECORD_FORM, {
			fields: computed(() => props.fields),
			draft,
			errors,
			readOnly: computed(() => props.readOnly),
			errorDisplay,
			rows,
			slots: computed(() => props.formSlots),
			setField,
			blurField: (field) => void validateOne(field, draft.value),
			actions,
			ctx,
			run,
			confirmDiscard,
			discard,
			singular: computed(() => props.singular)
		});
		const documentedFields = computed(() => props.fields.filter((f) => f.description));
		const hasDocPanel = computed(() => Boolean(props.formDescription) || documentedFields.value.length > 0);
		const crumbLabel = computed(() => props.readOnly ? primary.value.title || `View ${props.singular.toLowerCase()}` : props.isNew ? `Create new ${props.singular.toLowerCase()}` : `Update ${props.singular.toLowerCase()}`);
		const pageCrumbs = computed(() => props.crumbs ?? [
			...props.onHome ? [{
				label: "Home",
				onClick: props.onHome
			}] : [],
			{
				label: props.title ?? props.singular,
				onClick: () => emit("cancel")
			},
			{ label: crumbLabel.value }
		]);
		return (_ctx, _cache) => {
			return __props.layout === "page" ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: normalizeClass(unref(FORM_PAGE))
			}, [createElementVNode("div", { class: normalizeClass(unref(FORM_PAGE_BAR)) }, [createVNode(Breadcrumbs_default, {
				crumbs: pageCrumbs.value,
				"on-back": () => emit("cancel")
			}, null, 8, ["crumbs", "on-back"])], 2), createElementVNode("div", { class: normalizeClass(unref(FORM_PAGE_MAIN)) }, [createElementVNode("div", { class: normalizeClass(unref(FORM_PAGE_ROW)) }, [createElementVNode("div", { class: normalizeClass(unref(FORM_PAGE_CARD)) }, [createElementVNode("div", { class: normalizeClass(unref(FORM_PAGE_SCROLL)) }, [createElementVNode("div", { class: normalizeClass(unref(FORM_PAGE_WIDTH)) }, [createVNode(RecordFormBody_default)], 2)], 2), createVNode(RecordFormFooter_default, null, {
				"action-icon": withCtx((p) => [renderSlot(_ctx.$slots, "action-icon", normalizeProps(guardReactiveProps(p)))]),
				_: 3
			})], 2), hasDocPanel.value ? (openBlock(), createElementBlock("aside", {
				key: 0,
				"aria-label": `${__props.title ?? __props.singular} help`,
				class: normalizeClass(unref(FORM_DOC_PANEL))
			}, [createElementVNode("div", { class: normalizeClass(unref(FORM_DOC_BODY)) }, [createElementVNode("div", { class: normalizeClass(unref(FORM_DOC_INTRO)) }, [createElementVNode("h2", { class: normalizeClass(unref(FORM_DOC_TITLE)) }, [(openBlock(), createElementBlock("svg", {
				class: normalizeClass(unref(FORM_DOC_ICON)),
				xmlns: "http://www.w3.org/2000/svg",
				width: "15",
				height: "15",
				viewBox: "0 0 15 15",
				fill: "none",
				"aria-hidden": "true"
			}, [..._cache[0] || (_cache[0] = [createElementVNode("path", {
				d: "M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z",
				fill: "currentColor",
				"fill-rule": "evenodd",
				"clip-rule": "evenodd"
			}, null, -1)])], 2)), createTextVNode(" About " + toDisplayString(__props.title ?? __props.singular), 1)], 2), __props.formDescription ? (openBlock(), createElementBlock("p", {
				key: 0,
				class: normalizeClass(unref(FORM_DOC_TEXT))
			}, toDisplayString(__props.formDescription), 3)) : createCommentVNode("", true)], 2), documentedFields.value.length ? (openBlock(), createElementBlock("dl", {
				key: 0,
				class: normalizeClass(unref(FORM_DOC_LIST))
			}, [(openBlock(true), createElementBlock(Fragment, null, renderList(documentedFields.value, (f) => {
				return openBlock(), createElementBlock("div", {
					key: f.key,
					class: normalizeClass(unref(FORM_DOC_ITEM))
				}, [createElementVNode("dt", { class: normalizeClass(unref(FORM_DOC_TERM)) }, toDisplayString(f.label), 3), createElementVNode("dd", { class: normalizeClass(unref(FORM_DOC_TEXT)) }, toDisplayString(f.description), 3)], 2);
			}), 128))], 2)) : createCommentVNode("", true)], 2)], 10, _hoisted_1)) : createCommentVNode("", true)], 2)], 2)], 2)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createElementVNode("div", {
				class: normalizeClass(unref(cn)(unref(FORM_BACKDROP), unref(FORM_BACKDROP_STATES)[closing.value ? "out" : "in"])),
				"aria-hidden": "true",
				onClick: handleCancel
			}, null, 2), createElementVNode("aside", {
				"aria-label": `${__props.singular} form`,
				class: normalizeClass(unref(cn)(unref(FORM_PANEL), unref(FORM_PANEL_STATES)[closing.value ? "out" : "in"])),
				onAnimationend: animationEnd
			}, [
				createElementVNode("div", { class: normalizeClass(unref(FORM_PANEL_HEADER)) }, [
					createElementVNode("span", { class: normalizeClass(unref(FORM_PANEL_ICON_CHIP)) }, [renderSlot(_ctx.$slots, "icon", { class: normalizeClass(unref(FORM_PANEL_ICON)) }, () => [(openBlock(), createElementBlock("svg", {
						class: normalizeClass(unref(FORM_PANEL_ICON)),
						xmlns: "http://www.w3.org/2000/svg",
						width: "15",
						height: "15",
						viewBox: "0 0 15 15",
						fill: "none",
						"aria-hidden": "true"
					}, [..._cache[1] || (_cache[1] = [createElementVNode("path", {
						d: "M0.877075 7.49991C0.877075 3.84222 3.84222 0.877075 7.49991 0.877075C11.1576 0.877075 14.1227 3.84222 14.1227 7.49991C14.1227 11.1576 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1576 0.877075 7.49991ZM7.49991 1.82708C4.36689 1.82708 1.82708 4.36689 1.82708 7.49991C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49991C13.1727 4.36689 10.6329 1.82708 7.49991 1.82708Z",
						fill: "currentColor",
						"fill-rule": "evenodd",
						"clip-rule": "evenodd"
					}, null, -1)])], 2))])], 2),
					createElementVNode("span", { class: normalizeClass(unref(cn)(unref(FORM_PANEL_TITLE), !primary.value.title && unref(FORM_PANEL_TITLE_EMPTY))) }, toDisplayString(primary.value.title || `New ${__props.singular}`), 3),
					createVNode(Button_default, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Close",
						class: normalizeClass(unref(FORM_CLOSE_BUTTON)),
						onClick: handleCancel
					}, {
						default: withCtx(() => [(openBlock(), createElementBlock("svg", {
							class: normalizeClass(unref(FORM_CLOSE_ICON)),
							xmlns: "http://www.w3.org/2000/svg",
							width: "15",
							height: "15",
							viewBox: "0 0 15 15",
							fill: "none",
							"aria-hidden": "true"
						}, [..._cache[2] || (_cache[2] = [createElementVNode("path", {
							d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
							fill: "currentColor",
							"fill-rule": "evenodd",
							"clip-rule": "evenodd"
						}, null, -1)])], 2))]),
						_: 1
					}, 8, ["class"])
				], 2),
				createElementVNode("div", { class: normalizeClass(unref(FORM_PANEL_BODY)) }, [createVNode(RecordFormBody_default)], 2),
				createVNode(RecordFormFooter_default, null, {
					"action-icon": withCtx((p) => [renderSlot(_ctx.$slots, "action-icon", normalizeProps(guardReactiveProps(p)))]),
					_: 3
				})
			], 42, _hoisted_2)], 64));
		};
	}
});
//#endregion
export { RecordDetailPanel_vue_vue_type_script_setup_true_lang_default as default };

