import Button_default from "./Button.js";
import Combobox_default from "./Combobox.js";
import Checkbox_default from "./Checkbox.js";
import Input_default from "./Input.js";
import DropdownMenu_default from "./DropdownMenu.js";
import DropdownMenuContent_default from "./DropdownMenuContent.js";
import DropdownMenuItem_default from "./DropdownMenuItem.js";
import DropdownMenuLabel_default from "./DropdownMenuLabel.js";
import DropdownMenuTrigger_default from "./DropdownMenuTrigger.js";
import FilterField_default from "./FilterField.js";
import FilterGrid_default from "./FilterGrid.js";
import { ICONS } from "./icons.js";
import Select_default from "./Select.js";
import { useRecordView } from "./record-view-context.js";
import RecordViewFooter_default from "./RecordViewFooter.js";
import { Fragment, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, isRef, mergeProps, normalizeClass, openBlock, ref, renderList, renderSlot, resolveDynamicComponent, toDisplayString, unref, withCtx } from "vue";
import { DROPDOWN_ITEM_CHECK, DROPDOWN_ITEM_LABEL, DROPDOWN_TRIGGER, RV_ADD_BUTTON, RV_BULK_DELETE, RV_BULK_RESTORE, RV_CLEAR_SELECTION, RV_FILE_INPUT, RV_FILTER_CHECK, RV_FILTER_CHECKS, RV_FILTER_FOOTER, RV_FILTER_GRID, RV_FILTER_INPUT, RV_FILTER_PANEL, RV_FULL_WIDTH, RV_HEADER_ACTIONS, RV_ICON, RV_ICON_EXPORT, RV_ICON_FILTER, RV_ICON_IMPORT, RV_ICON_LG, RV_ICON_MORE, RV_ICON_OPTIONS, RV_ICON_SORT, RV_ICON_TITLE, RV_ICON_TRASH, RV_INLINE_ROW, RV_KEYWORD_BODY, RV_KEYWORD_ICON, RV_KEYWORD_INPUT, RV_KEYWORD_WRAP, RV_LABEL_SM, RV_TOOLBAR, RV_TOOLBAR_CONTROLS, RV_TOOLBAR_TITLE, RV_TRASH_TOGGLE_STATES, RV_TRUNCATE, cn } from "@viliha/vui-core";
//#region src/RecordViewToolbar.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["aria-pressed", "aria-label"];
var _hoisted_2 = ["checked", "onChange"];
/**
* The record view's two control rows: the per-record actions in the page header (import, export, the
* overflow menu, add) and the sub-toolbar over the table (what is being listed, the selection bar, the
* Trash toggle, Filter, Sort, Options and the pager).
*
* **One file, two mount points, hence `part`.** React composes both rows inside one function, but they
* are not siblings: the action row belongs to the shell and the sub-toolbar sits inside the card. A
* component can only have one place in the tree, so the alternative was two files that share every
* import and the same context, which is a worse split than a prop naming which row this is.
*/
var RecordViewToolbar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RecordViewToolbar",
	props: {
		part: { default: "toolbar" },
		hasFilterExtras: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const props = __props;
		const view = useRecordView();
		const { title, singular, keyword, filterValues, filterFields, sort, sortFields, tableFields, hidden, selected, bulkFields, trash, showImport, showExport, showAdd, showFilter, showSort, showPagination, showSelection, showTrash, canAdd, canRestore, importMenu, exportMenu } = view;
		const fileInput = ref(null);
		/** The action waiting on a file: one picker, reused by whichever asked. */
		let pendingImport = null;
		const visible = (action) => action.visible?.(view.ioContext()) ?? true;
		/** Run one action, opening the file picker first when it asked for a file. */
		const runIo = (action) => {
			if (action.pickFile) {
				pendingImport = action;
				const el = fileInput.value;
				if (el) {
					el.accept = action.accept ?? "";
					el.click();
				}
				return;
			}
			action.onAct(view.ioContext());
		};
		const onImportFile = async (event) => {
			const el = event.target;
			const file = el.files?.[0];
			el.value = "";
			const action = pendingImport;
			pendingImport = null;
			if (file && action) await action.onAct(view.ioContext(file));
		};
		/**
		* The per-field controls, read exactly as React reads them. Each of these is a named function because
		* **a template expression is parsed as plain JavaScript**, so the `typeof f.filterable === "object"`
		* narrowing and every `as` this needs cannot live in an attribute.
		*/
		const cfgOf = (f) => typeof f.filterable === "object" ? f.filterable : {};
		const controlOf = (f) => cfgOf(f).control ?? "text";
		const labelOf = (f) => cfgOf(f).label ?? f.label;
		const optionsOf = (f) => {
			const cfg = cfgOf(f);
			if (typeof cfg.options === "function") return cfg.options(filterValues.value);
			return cfg.options ?? (Array.isArray(f.options) ? f.options : []);
		};
		const rawOf = (f) => filterValues.value[f.key];
		const textOf = (f) => {
			const v = rawOf(f);
			return typeof v === "string" ? v : "";
		};
		const listOf = (f) => {
			const v = rawOf(f);
			return Array.isArray(v) ? v : [];
		};
		/** Async filter options: lazy-load on open instead of a static list, with a cascade parent's value as
		*  the reset key so a stale list is not reused. */
		const asyncOf = (f) => {
			const cfg = cfgOf(f);
			const loadOptions = cfg.loadOptions;
			if (!loadOptions) return null;
			return {
				source: {
					loadOptions: ({ search, signal }) => loadOptions({
						search,
						signal,
						values: filterValues.value
					}),
					resolveOption: cfg.resolveOption
				},
				resetKey: (cfg.dependsOn ?? []).map((k) => String(filterValues.value[k] ?? "")).join(" ")
			};
		};
		const inputTypeOf = (f) => {
			const control = controlOf(f);
			return control === "number" ? "number" : control === "date" ? "date" : "text";
		};
		const anyPlaceholder = (f) => cfgOf(f).placeholder ?? `Any ${labelOf(f).toLowerCase()}`;
		const containsPlaceholder = (f) => cfgOf(f).placeholder ?? "Contains…";
		const toggleCheck = (f, value) => {
			const on = listOf(f);
			view.setFilterValue(f.key, on.includes(value) ? on.filter((v) => v !== value) : [...on, value]);
		};
		const writeText = (f, value) => view.setFilterValue(f.key, String(value ?? ""));
		/** A sortable column shows its direction: a solid caret for the active one, nothing when it is not
		*  the sorted column (the header's idle caret does that job in the table). */
		const sortIcon = (f) => sort.value?.key === f.key ? sort.value.dir === "asc" ? ICONS.caretUp : ICONS.caretDown : null;
		return (_ctx, _cache) => {
			return props.part === "actions" ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: normalizeClass(unref(RV_HEADER_ACTIONS))
			}, [
				unref(showImport) && unref(importMenu).length > 0 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createElementVNode("input", {
					ref_key: "fileInput",
					ref: fileInput,
					type: "file",
					"aria-hidden": "true",
					class: normalizeClass(unref(RV_FILE_INPUT)),
					onChange: onImportFile
				}, null, 34), createVNode(DropdownMenu_default, null, {
					default: withCtx(() => [createVNode(DropdownMenuTrigger_default, { "aria-label": "Import" }, {
						default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).upload), { class: normalizeClass(unref(RV_ICON_IMPORT)) }, null, 8, ["class"])), createElementVNode("span", { class: normalizeClass(unref(cn)(unref(RV_TRUNCATE), unref(RV_LABEL_SM))) }, "Import", 2)]),
						_: 1
					}), createVNode(DropdownMenuContent_default, { align: "end" }, {
						default: withCtx(() => [createVNode(DropdownMenuLabel_default, null, {
							default: withCtx(() => [..._cache[11] || (_cache[11] = [createTextVNode("Import from", -1)])]),
							_: 1
						}), (openBlock(true), createElementBlock(Fragment, null, renderList(unref(importMenu).filter(visible), (action) => {
							return openBlock(), createBlock(DropdownMenuItem_default, {
								key: action.id,
								onSelect: ($event) => runIo(action)
							}, {
								default: withCtx(() => [createElementVNode("span", { class: normalizeClass(unref(DROPDOWN_ITEM_LABEL)) }, [createElementVNode("span", { class: normalizeClass(unref(RV_INLINE_ROW)) }, [action.icon ? (openBlock(), createBlock(resolveDynamicComponent(action.icon), {
									key: 0,
									class: normalizeClass(unref(RV_ICON))
								}, null, 8, ["class"])) : createCommentVNode("", true), createTextVNode(" " + toDisplayString(action.label), 1)], 2)], 2)]),
								_: 2
							}, 1032, ["onSelect"]);
						}), 128))]),
						_: 1
					})]),
					_: 1
				})], 64)) : createCommentVNode("", true),
				unref(showExport) && unref(exportMenu).length > 0 ? (openBlock(), createBlock(DropdownMenu_default, { key: 1 }, {
					default: withCtx(() => [createVNode(DropdownMenuTrigger_default, { "aria-label": "Export" }, {
						default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).download), { class: normalizeClass(unref(RV_ICON_EXPORT)) }, null, 8, ["class"])), createElementVNode("span", { class: normalizeClass(unref(cn)(unref(RV_TRUNCATE), unref(RV_LABEL_SM))) }, "Export", 2)]),
						_: 1
					}), createVNode(DropdownMenuContent_default, { align: "end" }, {
						default: withCtx(() => [createVNode(DropdownMenuLabel_default, null, {
							default: withCtx(() => [..._cache[12] || (_cache[12] = [createTextVNode("Export as", -1)])]),
							_: 1
						}), (openBlock(true), createElementBlock(Fragment, null, renderList(unref(exportMenu).filter(visible), (action) => {
							return openBlock(), createBlock(DropdownMenuItem_default, {
								key: action.id,
								onSelect: ($event) => runIo(action)
							}, {
								default: withCtx(() => [createElementVNode("span", { class: normalizeClass(unref(DROPDOWN_ITEM_LABEL)) }, [createElementVNode("span", { class: normalizeClass(unref(RV_INLINE_ROW)) }, [action.icon ? (openBlock(), createBlock(resolveDynamicComponent(action.icon), {
									key: 0,
									class: normalizeClass(unref(RV_ICON))
								}, null, 8, ["class"])) : createCommentVNode("", true), createTextVNode(" " + toDisplayString(action.label), 1)], 2)], 2)]),
								_: 2
							}, 1032, ["onSelect"]);
						}), 128))]),
						_: 1
					})]),
					_: 1
				})) : createCommentVNode("", true),
				createVNode(DropdownMenu_default, null, {
					default: withCtx(() => [createVNode(DropdownMenuTrigger_default, { "aria-label": "More actions" }, {
						default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).more), { class: normalizeClass(unref(RV_ICON_MORE)) }, null, 8, ["class"]))]),
						_: 1
					}), createVNode(DropdownMenuContent_default, { align: "end" }, {
						default: withCtx(() => [unref(showSelection) ? (openBlock(), createBlock(DropdownMenuItem_default, {
							key: 0,
							onSelect: _cache[0] || (_cache[0] = ($event) => unref(view).clearSelection())
						}, {
							default: withCtx(() => [createElementVNode("span", { class: normalizeClass(unref(DROPDOWN_ITEM_LABEL)) }, "Clear selection", 2)]),
							_: 1
						})) : createCommentVNode("", true), createVNode(DropdownMenuItem_default, { onSelect: _cache[1] || (_cache[1] = ($event) => unref(view).showAllColumns()) }, {
							default: withCtx(() => [createElementVNode("span", { class: normalizeClass(unref(DROPDOWN_ITEM_LABEL)) }, "Show all columns", 2)]),
							_: 1
						})]),
						_: 1
					})]),
					_: 1
				}),
				unref(showAdd) && unref(canAdd) && !unref(trash) ? (openBlock(), createBlock(Button_default, {
					key: 2,
					variant: "primary",
					size: "sm",
					class: normalizeClass(unref(RV_ADD_BUTTON)),
					onClick: _cache[2] || (_cache[2] = ($event) => unref(view).addRow())
				}, {
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).plus), { class: normalizeClass(unref(RV_ICON_LG)) }, null, 8, ["class"])), createElementVNode("span", { class: normalizeClass(unref(RV_LABEL_SM)) }, toDisplayString(unref(singular)), 3)]),
					_: 1
				}, 8, ["class"])) : createCommentVNode("", true)
			], 2)) : (openBlock(), createElementBlock("div", {
				key: 1,
				class: normalizeClass(unref(RV_TOOLBAR))
			}, [createElementVNode("div", { class: normalizeClass(unref(RV_INLINE_ROW)) }, [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).mixer), { class: normalizeClass(unref(RV_ICON_TITLE)) }, null, 8, ["class"])), unref(selected).size > 0 ? (openBlock(), createElementBlock("span", {
				key: 0,
				class: normalizeClass(unref(RV_INLINE_ROW))
			}, [createElementVNode("span", { class: normalizeClass(unref(RV_TOOLBAR_TITLE)) }, toDisplayString(unref(selected).size) + " selected", 3), createElementVNode("button", {
				type: "button",
				class: normalizeClass(unref(RV_CLEAR_SELECTION)),
				onClick: _cache[3] || (_cache[3] = ($event) => unref(view).clearSelection())
			}, " Clear ", 2)], 2)) : (openBlock(), createElementBlock("span", {
				key: 1,
				class: normalizeClass(unref(RV_TOOLBAR_TITLE))
			}, toDisplayString(unref(trash) ? `Trash · ${unref(title)}` : `All ${unref(title)}`), 3))], 2), createElementVNode("div", { class: normalizeClass(unref(RV_TOOLBAR_CONTROLS)) }, [
				unref(selected).size > 0 ? (openBlock(), createBlock(DropdownMenu_default, { key: 0 }, {
					default: withCtx(() => [createVNode(DropdownMenuTrigger_default, { "aria-label": "Actions" }, {
						default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).more), { class: normalizeClass(unref(RV_ICON_EXPORT)) }, null, 8, ["class"])), createElementVNode("span", { class: normalizeClass(unref(RV_TRUNCATE)) }, "Actions", 2)]),
						_: 1
					}), createVNode(DropdownMenuContent_default, null, {
						default: withCtx(() => [createVNode(DropdownMenuLabel_default, null, {
							default: withCtx(() => [createTextVNode(toDisplayString(unref(selected).size) + " selected", 1)]),
							_: 1
						}), unref(trash) && unref(canRestore) ? (openBlock(), createBlock(DropdownMenuItem_default, {
							key: 0,
							onSelect: _cache[4] || (_cache[4] = ($event) => unref(view).askBulkRestore())
						}, {
							default: withCtx(() => [createElementVNode("span", { class: normalizeClass(unref(DROPDOWN_ITEM_LABEL)) }, [createElementVNode("span", { class: normalizeClass(unref(RV_BULK_RESTORE)) }, [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).reset), { class: normalizeClass(unref(RV_ICON)) }, null, 8, ["class"])), createTextVNode(" Restore " + toDisplayString(unref(selected).size) + " selected ", 1)], 2)], 2)]),
							_: 1
						})) : !unref(trash) ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(bulkFields), (f) => {
							return openBlock(), createElementBlock(Fragment, { key: f.key }, [createVNode(DropdownMenuLabel_default, null, {
								default: withCtx(() => [createTextVNode("Set " + toDisplayString(f.label), 1)]),
								_: 2
							}, 1024), (openBlock(true), createElementBlock(Fragment, null, renderList(Array.isArray(f.options) ? f.options : [], (o) => {
								return openBlock(), createBlock(DropdownMenuItem_default, {
									key: o.value,
									onSelect: ($event) => unref(view).bulkSetField(f.key, o.value)
								}, {
									default: withCtx(() => [createElementVNode("span", { class: normalizeClass(unref(DROPDOWN_ITEM_LABEL)) }, toDisplayString(o.label), 3)]),
									_: 2
								}, 1032, ["onSelect"]);
							}), 128))], 64);
						}), 128)), createVNode(DropdownMenuItem_default, { onSelect: _cache[5] || (_cache[5] = ($event) => unref(view).askBulkDelete()) }, {
							default: withCtx(() => [createElementVNode("span", { class: normalizeClass(unref(DROPDOWN_ITEM_LABEL)) }, [createElementVNode("span", { class: normalizeClass(unref(RV_BULK_DELETE)) }, [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).trash), { class: normalizeClass(unref(RV_ICON)) }, null, 8, ["class"])), createTextVNode(" Delete " + toDisplayString(unref(selected).size) + " selected ", 1)], 2)], 2)]),
							_: 1
						})], 64)) : createCommentVNode("", true)]),
						_: 1
					})]),
					_: 1
				})) : createCommentVNode("", true),
				unref(showTrash) ? (openBlock(), createElementBlock("button", {
					key: 1,
					type: "button",
					"aria-pressed": unref(trash),
					"aria-label": unref(trash) ? "Show live records" : "Show Trash",
					class: normalizeClass(unref(cn)(unref(DROPDOWN_TRIGGER), unref(RV_TRASH_TOGGLE_STATES)[unref(trash) ? "on" : "off"])),
					onClick: _cache[6] || (_cache[6] = ($event) => unref(view).toggleTrash())
				}, [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).trash), { class: normalizeClass(unref(RV_ICON_TRASH)) }, null, 8, ["class"])), createElementVNode("span", { class: normalizeClass(unref(RV_TRUNCATE)) }, "Trash", 2)], 10, _hoisted_1)) : createCommentVNode("", true),
				unref(showFilter) ? (openBlock(), createBlock(DropdownMenu_default, { key: 2 }, {
					default: withCtx(() => [createVNode(DropdownMenuTrigger_default, { "aria-label": "Filter" }, {
						default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).mixer), { class: normalizeClass(unref(RV_ICON_FILTER)) }, null, 8, ["class"])), createElementVNode("span", { class: normalizeClass(unref(RV_TRUNCATE)) }, "Filter", 2)]),
						_: 1
					}), createVNode(DropdownMenuContent_default, null, {
						default: withCtx(() => [unref(filterFields).length > 0 || props.hasFilterExtras ? (openBlock(), createElementBlock("div", {
							key: 0,
							class: normalizeClass(unref(RV_FILTER_PANEL))
						}, [
							createVNode(DropdownMenuLabel_default, null, {
								default: withCtx(() => [..._cache[13] || (_cache[13] = [createTextVNode("Filter", -1)])]),
								_: 1
							}),
							createVNode(FilterGrid_default, { class: normalizeClass(unref(RV_FILTER_GRID)) }, {
								default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(filterFields), (f) => {
									return openBlock(), createBlock(FilterField_default, {
										key: f.key,
										label: labelOf(f)
									}, {
										default: withCtx(() => [controlOf(f) === "combobox" ? (openBlock(), createBlock(Combobox_default, mergeProps({
											key: 0,
											"model-value": textOf(f),
											"aria-label": labelOf(f),
											placeholder: anyPlaceholder(f),
											class: unref(RV_FULL_WIDTH)
										}, { ref_for: true }, asyncOf(f) ?? { options: optionsOf(f) }, { "onUpdate:modelValue": (v) => writeText(f, v) }), null, 16, [
											"model-value",
											"aria-label",
											"placeholder",
											"class",
											"onUpdate:modelValue"
										])) : controlOf(f) === "select" ? (openBlock(), createBlock(Select_default, mergeProps({
											key: 1,
											"model-value": textOf(f),
											"aria-label": labelOf(f),
											placeholder: anyPlaceholder(f),
											class: unref(RV_FULL_WIDTH)
										}, { ref_for: true }, asyncOf(f) ?? { options: optionsOf(f) }, { "onUpdate:modelValue": (v) => writeText(f, v) }), null, 16, [
											"model-value",
											"aria-label",
											"placeholder",
											"class",
											"onUpdate:modelValue"
										])) : controlOf(f) === "checkbox" ? (openBlock(), createElementBlock("div", {
											key: 2,
											class: normalizeClass(unref(RV_FILTER_CHECKS))
										}, [(openBlock(true), createElementBlock(Fragment, null, renderList(optionsOf(f), (o) => {
											return openBlock(), createElementBlock("label", {
												key: o.value,
												class: normalizeClass(unref(RV_FILTER_CHECK))
											}, [createElementVNode("input", {
												type: "checkbox",
												checked: listOf(f).includes(o.value),
												onChange: ($event) => toggleCheck(f, o.value)
											}, null, 40, _hoisted_2), createTextVNode(" " + toDisplayString(o.label), 1)], 2);
										}), 128))], 2)) : (openBlock(), createBlock(Input_default, {
											key: 3,
											type: inputTypeOf(f),
											"model-value": textOf(f),
											placeholder: containsPlaceholder(f),
											"aria-label": labelOf(f),
											class: normalizeClass(unref(RV_FILTER_INPUT)),
											"onUpdate:modelValue": (v) => writeText(f, v)
										}, null, 8, [
											"type",
											"model-value",
											"placeholder",
											"aria-label",
											"class",
											"onUpdate:modelValue"
										]))]),
										_: 2
									}, 1032, ["label"]);
								}), 128)), renderSlot(_ctx.$slots, "filter-extras")]),
								_: 3
							}, 8, ["class"]),
							createElementVNode("div", { class: normalizeClass(unref(RV_FILTER_FOOTER)) }, [createVNode(Button_default, {
								size: "sm",
								onClick: _cache[7] || (_cache[7] = ($event) => unref(view).clearFilters())
							}, {
								default: withCtx(() => [..._cache[14] || (_cache[14] = [createTextVNode("Clear", -1)])]),
								_: 1
							}), createVNode(Button_default, {
								size: "sm",
								variant: "primary",
								onClick: _cache[8] || (_cache[8] = ($event) => unref(view).applyFilters())
							}, {
								default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).search), { class: normalizeClass(unref(RV_ICON)) }, null, 8, ["class"])), _cache[15] || (_cache[15] = createTextVNode(" Search ", -1))]),
								_: 1
							})], 2)
						], 2)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createVNode(DropdownMenuLabel_default, null, {
							default: withCtx(() => [..._cache[16] || (_cache[16] = [createTextVNode("Filter by keyword", -1)])]),
							_: 1
						}), createElementVNode("div", { class: normalizeClass(unref(RV_KEYWORD_BODY)) }, [createElementVNode("div", { class: normalizeClass(unref(RV_KEYWORD_WRAP)) }, [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).search), { class: normalizeClass(unref(RV_KEYWORD_ICON)) }, null, 8, ["class"])), createVNode(Input_default, {
							modelValue: unref(keyword),
							"onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => isRef(keyword) ? keyword.value = $event : null),
							placeholder: "Contains…",
							"aria-label": "Filter",
							class: normalizeClass(unref(RV_KEYWORD_INPUT))
						}, null, 8, ["modelValue", "class"])], 2)], 2)], 64))]),
						_: 3
					})]),
					_: 3
				})) : createCommentVNode("", true),
				unref(showSort) ? (openBlock(), createBlock(DropdownMenu_default, { key: 3 }, {
					default: withCtx(() => [createVNode(DropdownMenuTrigger_default, { "aria-label": "Sort" }, {
						default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).caretSort), { class: normalizeClass(unref(RV_ICON_SORT)) }, null, 8, ["class"])), createElementVNode("span", { class: normalizeClass(unref(RV_TRUNCATE)) }, "Sort", 2)]),
						_: 1
					}), createVNode(DropdownMenuContent_default, null, {
						default: withCtx(() => [
							createVNode(DropdownMenuLabel_default, null, {
								default: withCtx(() => [..._cache[17] || (_cache[17] = [createTextVNode("Sort by", -1)])]),
								_: 1
							}),
							(openBlock(true), createElementBlock(Fragment, null, renderList(unref(sortFields), (f) => {
								return openBlock(), createBlock(DropdownMenuItem_default, {
									key: f.key,
									onSelect: ($event) => unref(view).toggleSort(f.key)
								}, {
									default: withCtx(() => [createElementVNode("span", { class: normalizeClass(unref(DROPDOWN_ITEM_LABEL)) }, toDisplayString(f.label), 3), sortIcon(f) ? (openBlock(), createBlock(resolveDynamicComponent(sortIcon(f)), {
										key: 0,
										class: normalizeClass(unref(RV_ICON))
									}, null, 8, ["class"])) : createCommentVNode("", true)]),
									_: 2
								}, 1032, ["onSelect"]);
							}), 128)),
							unref(sort) ? (openBlock(), createBlock(DropdownMenuItem_default, {
								key: 0,
								onSelect: _cache[10] || (_cache[10] = ($event) => unref(view).clearSort())
							}, {
								default: withCtx(() => [createElementVNode("span", { class: normalizeClass(unref(DROPDOWN_ITEM_LABEL)) }, "Clear sort", 2)]),
								_: 1
							})) : createCommentVNode("", true)
						]),
						_: 1
					})]),
					_: 1
				})) : createCommentVNode("", true),
				createVNode(DropdownMenu_default, null, {
					default: withCtx(() => [createVNode(DropdownMenuTrigger_default, { "aria-label": "Options" }, {
						default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).mixer), { class: normalizeClass(unref(RV_ICON_OPTIONS)) }, null, 8, ["class"])), createElementVNode("span", { class: normalizeClass(unref(RV_TRUNCATE)) }, "Options", 2)]),
						_: 1
					}), createVNode(DropdownMenuContent_default, { align: "end" }, {
						default: withCtx(() => [createVNode(DropdownMenuLabel_default, null, {
							default: withCtx(() => [..._cache[18] || (_cache[18] = [createTextVNode("Visible columns", -1)])]),
							_: 1
						}), (openBlock(true), createElementBlock(Fragment, null, renderList(unref(tableFields), (f) => {
							return openBlock(), createBlock(DropdownMenuItem_default, {
								key: f.key,
								onSelect: ($event) => unref(view).toggleHidden(f.key)
							}, {
								default: withCtx(() => [createElementVNode("span", { class: normalizeClass(unref(DROPDOWN_ITEM_LABEL)) }, toDisplayString(f.label), 3), createVNode(Checkbox_default, {
									"model-value": !unref(hidden).has(f.key),
									readonly: "",
									tabindex: -1,
									"aria-hidden": "true",
									class: normalizeClass(unref(DROPDOWN_ITEM_CHECK))
								}, null, 8, ["model-value", "class"])]),
								_: 2
							}, 1032, ["onSelect"]);
						}), 128))]),
						_: 1
					})]),
					_: 1
				}),
				unref(showPagination) ? (openBlock(), createBlock(RecordViewFooter_default, { key: 4 })) : createCommentVNode("", true)
			], 2)], 2));
		};
	}
});
//#endregion
export { RecordViewToolbar_vue_vue_type_script_setup_true_lang_default as default };

