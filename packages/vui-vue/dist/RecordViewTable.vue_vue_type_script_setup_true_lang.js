import MissingValue_default from "./MissingValue.js";
import AsyncFieldValue_default from "./AsyncFieldValue.js";
import Checkbox_default from "./Checkbox.js";
import Table_default from "./Table.js";
import TableBody_default from "./TableBody.js";
import TableCell_default from "./TableCell.js";
import TableHead_default from "./TableHead.js";
import TableHeader_default from "./TableHeader.js";
import TableRow_default from "./TableRow.js";
import RequiredMark_default from "./RequiredMark.js";
import Tooltip_default from "./Tooltip.js";
import { ICONS } from "./icons.js";
import MultiFieldValue_default from "./MultiFieldValue.js";
import { useRecordView } from "./record-view-context.js";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, mergeProps, normalizeClass, normalizeStyle, openBlock, renderList, resolveDynamicComponent, toDisplayString, unref, withCtx, withKeys, withModifiers } from "vue";
import { IDENTITY_COL, RV_ACTIONS_CELL, RV_ACTIONS_HEAD, RV_ACTIONS_HEAD_LABEL, RV_ACTIONS_W, RV_ALIGN_BOX, RV_ALIGN_TEXT, RV_CELL_ACTION, RV_CELL_ACTIONS, RV_CELL_BUTTON, RV_CELL_CUSTOM, RV_CELL_EDITABLE, RV_CELL_FLUSH, RV_CELL_INPUT, RV_CELL_MULTI, RV_CELL_READ, RV_CHECKBOX_W, RV_COPIED_ICON, RV_EMPTY, RV_FULL_WIDTH, RV_GRIP, RV_GRIP_ICON, RV_GRIP_SPACER, RV_HEAD_CARET, RV_HEAD_CARET_IDLE, RV_HEAD_CELL, RV_HEAD_ICON, RV_HEAD_INNER, RV_HEAD_LABEL, RV_HEAD_SORTABLE, RV_ICON, RV_INITIALS, RV_INLINE_ROW, RV_NAME_BUTTON, RV_NAME_COL, RV_NAME_DEFAULT_W, RV_NAME_HEAD_BUTTON, RV_NAME_HEAD_STATIC, RV_RESIZE_HANDLE, RV_ROW, RV_ROW_ACTION, RV_ROW_ACTIONS, RV_ROW_ACTION_DESTRUCTIVE, RV_ROW_ICON_DELETE, RV_ROW_ICON_EDIT, RV_ROW_ICON_RESTORE, RV_ROW_ICON_VIEW, RV_ROW_INERT, RV_SCROLL, RV_SELECT_CELL, RV_SKELETON_ACTIONS, RV_SKELETON_AVATAR, RV_SKELETON_CHECKBOX, RV_SKELETON_NAME, RV_SKELETON_VALUE, RV_SPACER_CELL, RV_SPACER_HEAD, RV_TABLE_HEADER, RV_TRUNCATE, clipCell, cn, fieldDefaultWidth, isAsyncLabeled } from "@viliha/vui-core";
//#region src/RecordViewTable.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = [
	"aria-label",
	"onMousedown",
	"onKeydown"
];
var _hoisted_2 = ["aria-label", "onDragstart"];
var _hoisted_3 = ["disabled", "onClick"];
var _hoisted_4 = ["value", "aria-label"];
var _hoisted_5 = [
	"aria-label",
	"title",
	"onClick"
];
var _hoisted_6 = [
	"aria-label",
	"title",
	"onClick"
];
var _hoisted_7 = ["aria-label", "onClick"];
var _hoisted_8 = ["aria-label", "onClick"];
var _hoisted_9 = ["aria-label", "onClick"];
var _hoisted_10 = ["aria-label", "onClick"];
var RecordViewTable_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RecordViewTable",
	setup(__props) {
		const view = useRecordView();
		const { orderedCols, colWidths, totalWidth, paged, hasRows, loading, pageSize, showSelection, allSelected, selected, activeId, flashId, dragId, dragOverId, editing, cellDraft, copiedKey, maxCellChars, rowClick, canEdit, canRestore, trash, singular, emptyLabel, sort, resizableColumns } = view;
		/**
		* One descriptor per column, so the header, the skeleton and the body iterate the same list in the
		* same order. **The identity column carries the same four display fields a field column does** (its
		* width key, its label, its glyph and whether it is mandatory), which is what lets the header ask
		* `sortKey` once instead of branching between `nameSortKey` and `canSortField` twice over.
		*/
		const cols = computed(() => orderedCols.value.map((col) => {
			if (col === IDENTITY_COL) return {
				kind: "identity",
				key: RV_NAME_COL,
				label: view.nameLabel.value,
				icon: view.icon.value ?? ICONS.circle,
				required: view.nameRequired.value,
				sortKey: view.nameSortKey.value
			};
			const field = col;
			return {
				kind: "field",
				key: field.key,
				label: field.label,
				icon: field.icon ?? ICONS.circle,
				required: Boolean(field.required),
				sortKey: view.canSort(field) ? field.key : void 0,
				field
			};
		}));
		/** A column that has never been dragged has no width at all, so the header sizes to its own label. */
		const widthStyle = (px) => px ? { width: `${px}px` } : void 0;
		const maxWidthStyle = (px) => ({ maxWidth: `${px}px` });
		const fixedWidth = (px) => ({ width: `${px}px` });
		const tableStyle = computed(() => ({
			minWidth: `${totalWidth.value}px`,
			tableLayout: "auto"
		}));
		const bodyWidth = (col) => colWidths.value[col.key] ?? (col.kind === "identity" ? RV_NAME_DEFAULT_W : fieldDefaultWidth(col.field));
		/** The header caret: solid in the sorted direction, muted two-way when the column merely sorts. */
		const caretFor = (col) => {
			const on = sort.value;
			if (!on || on.key !== col.sortKey) return ICONS.caretSort;
			return on.dir === "asc" ? ICONS.caretUp : ICONS.caretDown;
		};
		const caretClass = (col) => {
			const on = sort.value;
			return on && on.key === col.sortKey ? RV_HEAD_CARET : RV_HEAD_CARET_IDLE;
		};
		const headClass = (col) => col.kind === "identity" ? col.sortKey ? RV_NAME_HEAD_BUTTON : RV_NAME_HEAD_STATIC : cn(RV_HEAD_INNER, RV_ALIGN_BOX[view.alignOf(col.key)], col.sortKey && RV_HEAD_SORTABLE);
		/** The header's element and its props travel together: a sortable column is a button that toggles,
		*  and anything else is a span with no listener at all. */
		const headProps = (col) => {
			const sortKey = col.sortKey;
			return sortKey ? {
				type: "button",
				class: headClass(col),
				onClick: () => view.toggleSort(sortKey)
			} : { class: headClass(col) };
		};
		/** Arrow keys resize a column without a mouse, which is the only way to do it from the keyboard. */
		const onHandleKey = (col, event) => {
			if (event.key === "ArrowLeft") {
				event.preventDefault();
				view.nudgeColumn(col, -1);
			}
			if (event.key === "ArrowRight") {
				event.preventDefault();
				view.nudgeColumn(col, 1);
			}
		};
		const primary = (row) => view.getPrimary(row);
		const nameClip = (row) => clipCell(primary(row).title, maxCellChars.value);
		const rowFlag = (a, b) => a === b;
		const onContextMenu = (row, event) => {
			event.preventDefault();
			view.openMenu(row.id, event.clientX, event.clientY);
		};
		const onDragStart = (row, event) => {
			if (event.dataTransfer) {
				event.dataTransfer.effectAllowed = "move";
				event.dataTransfer.setData("text/plain", String(row.id));
			}
			dragId.value = row.id;
		};
		const onDragEnd = () => {
			dragId.value = null;
			dragOverId.value = null;
		};
		const onDragOver = (row, event) => {
			if (dragId.value === null) return;
			event.preventDefault();
			if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
			dragOverId.value = row.id;
		};
		const onDrop = (row, event) => {
			const source = dragId.value;
			if (source === null) return;
			event.preventDefault();
			view.reorder(source, row.id);
			dragId.value = null;
			dragOverId.value = null;
		};
		const isEditing = (row, field) => editing.value?.id === row.id && editing.value.key === field.key;
		const rawText = (row, field) => String(row[field.key] ?? "");
		/** For a choice field, show the option's friendly label (SYSTEM → "System") while the cell stays
		*  editable: no `render`, no read-only. */
		const displayText = (row, field) => {
			const explicit = field.displayValue?.(row);
			if (explicit !== void 0) return explicit;
			if (field.input === "checkbox") return row[field.key] ? "Yes" : "No";
			const value = rawText(row, field);
			if (Array.isArray(field.options)) return field.options.find((o) => o.value === value)?.label ?? value;
			return value;
		};
		const clip = (row, field) => clipCell(displayText(row, field), field.maxChars ?? maxCellChars.value);
		const cellKey = (row, field) => `${row.id}:${field.key}`;
		const values = (row, field) => {
			const v = row[field.key];
			return Array.isArray(v) ? v : [];
		};
		const showsActions = (row, field) => Boolean(field.editable) || Boolean(field.copyable && rawText(row, field));
		const asyncLabelled = (row, field) => isAsyncLabeled(field) && Boolean(rawText(row, field));
		/**
		* **One stable component type per render function**, as `RecordFormBody` needs for the same reason:
		* `<component :is="fn">` uses the function itself as the vnode type, so a helper returning a fresh
		* closure each render remounts the subtree on every change, and a `render` cell holding its own state
		* would reset while someone typed in a different row.
		*/
		const Render = (p) => p.fn();
		const renderCell = (row, field) => () => field.render?.(row);
		/**
		* **The read value sits in a button on an editable cell and directly in the cell otherwise**, and
		* `Bare` is what lets it be written once. React shares it as a local variable; a template has no such
		* thing, and the alternatives were forty duplicated lines or a fifth component for one cell. The read
		* cell must not gain a wrapper element: the whole point of `RV_CELL_READ` is that it is the flex box,
		* so `Bare` renders its children and contributes no element. (`Fragment` cannot do this job:
		* `<component :is>` passes children as a slots object, which a raw fragment vnode drops on the floor,
		* and the read cells came out empty.)
		*/
		const Bare = (_props, { slots }) => slots.default?.();
		const cellShell = (field) => field.editable ? "button" : Bare;
		const cellShellProps = (row, field) => field.editable ? {
			type: "button",
			class: cn(RV_CELL_BUTTON, RV_ALIGN_BOX[view.alignOf(field.key)]),
			onClick: () => view.startEdit(row, field.key)
		} : {};
		const cellClass = (field) => field.editable ? RV_CELL_EDITABLE : cn(RV_CELL_READ, RV_ALIGN_BOX[view.alignOf(field.key)]);
		const onCellInput = (event) => {
			cellDraft.value = event.target.value;
		};
		/**
		* Focus and select the inline editor as it mounts, which is the moment React's effect keyed on
		* `editing` runs.
		*
		* **The identity guard is the whole point, and without it the cell ate every character but the last.**
		* Vue calls a function ref on every patch of that vnode, not only on mount, and the input's `:value`
		* is bound to the draft: so each keystroke re-rendered it, re-ran `select()`, and the next character
		* replaced the selection. Typing `abc` committed `c`. Any unrelated re-render while the editor was
		* open, the flash timer clearing or a background refetch landing, re-selected the text under the
		* user's cursor for the same reason.
		*/
		let focused = null;
		const focusCell = (el) => {
			const input = el;
			if (!input) {
				focused = null;
				return;
			}
			if (input === focused) return;
			focused = input;
			input.focus();
			input.select();
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(RV_SCROLL)) }, [createVNode(Table_default, {
				style: normalizeStyle(tableStyle.value),
				class: normalizeClass(unref(RV_FULL_WIDTH))
			}, {
				default: withCtx(() => [createVNode(TableHeader_default, { class: normalizeClass(unref(RV_TABLE_HEADER)) }, {
					default: withCtx(() => [createVNode(TableRow_default, { class: normalizeClass(unref(RV_ROW_INERT)) }, {
						default: withCtx(() => [
							unref(showSelection) ? (openBlock(), createBlock(TableHead_default, {
								key: 0,
								style: normalizeStyle(fixedWidth(unref(RV_CHECKBOX_W))),
								class: normalizeClass(unref(RV_CELL_FLUSH))
							}, {
								default: withCtx(() => [createElementVNode("div", { class: normalizeClass(unref(RV_SELECT_CELL)) }, [createElementVNode("span", {
									"aria-hidden": "true",
									class: normalizeClass(unref(RV_GRIP_SPACER))
								}, null, 2), createVNode(Checkbox_default, {
									"model-value": unref(allSelected),
									"aria-label": "Select all",
									"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(view).toggleSelectAll())
								}, null, 8, ["model-value"])], 2)]),
								_: 1
							}, 8, ["style", "class"])) : createCommentVNode("", true),
							(openBlock(true), createElementBlock(Fragment, null, renderList(cols.value, (col) => {
								return openBlock(), createBlock(TableHead_default, {
									key: col.key,
									class: normalizeClass(unref(RV_HEAD_CELL)),
									style: normalizeStyle(widthStyle(unref(colWidths)[col.key]))
								}, {
									default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(col.sortKey ? "button" : "span"), mergeProps({ ref_for: true }, headProps(col)), {
										default: withCtx(() => [
											(openBlock(), createBlock(resolveDynamicComponent(col.icon), { class: normalizeClass(unref(RV_HEAD_ICON)) }, null, 8, ["class"])),
											createElementVNode("span", { class: normalizeClass(unref(RV_HEAD_LABEL)) }, [createTextVNode(toDisplayString(col.label) + " ", 1), col.required ? (openBlock(), createBlock(RequiredMark_default, { key: 0 })) : createCommentVNode("", true)], 2),
											col.sortKey ? (openBlock(), createBlock(resolveDynamicComponent(caretFor(col)), {
												key: 0,
												class: normalizeClass(caretClass(col))
											}, null, 8, ["class"])) : createCommentVNode("", true)
										]),
										_: 2
									}, 1040)), unref(resizableColumns) ? (openBlock(), createElementBlock("button", {
										key: 0,
										type: "button",
										"aria-label": `Resize ${col.label} column`,
										title: "Drag to resize",
										class: normalizeClass(unref(RV_RESIZE_HANDLE)),
										onMousedown: ($event) => unref(view).startResize(col.key, $event),
										onClick: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"])),
										onKeydown: ($event) => onHandleKey(col.key, $event)
									}, null, 42, _hoisted_1)) : createCommentVNode("", true)]),
									_: 2
								}, 1032, ["class", "style"]);
							}), 128)),
							createVNode(TableHead_default, {
								"aria-hidden": "true",
								class: normalizeClass(unref(RV_SPACER_HEAD))
							}, null, 8, ["class"]),
							createVNode(TableHead_default, {
								style: normalizeStyle(fixedWidth(unref(RV_ACTIONS_W))),
								class: normalizeClass(unref(RV_ACTIONS_HEAD))
							}, {
								default: withCtx(() => [createElementVNode("span", { class: normalizeClass(unref(RV_ACTIONS_HEAD_LABEL)) }, "Actions", 2)]),
								_: 1
							}, 8, ["style", "class"])
						]),
						_: 1
					}, 8, ["class"])]),
					_: 1
				}, 8, ["class"]), createVNode(TableBody_default, null, {
					default: withCtx(() => [unref(loading) ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(Math.min(unref(pageSize), 8), (i) => {
						return openBlock(), createBlock(TableRow_default, {
							key: `skeleton-${i}`,
							class: normalizeClass(unref(RV_ROW_INERT))
						}, {
							default: withCtx(() => [
								createVNode(TableCell_default, { style: normalizeStyle(fixedWidth(unref(RV_CHECKBOX_W))) }, {
									default: withCtx(() => [createElementVNode("div", { class: normalizeClass(unref(RV_SKELETON_CHECKBOX)) }, null, 2)]),
									_: 1
								}, 8, ["style"]),
								(openBlock(true), createElementBlock(Fragment, null, renderList(cols.value, (col) => {
									return openBlock(), createBlock(TableCell_default, {
										key: col.key,
										style: normalizeStyle(widthStyle(unref(colWidths)[col.key]))
									}, {
										default: withCtx(() => [col.kind === "identity" ? (openBlock(), createElementBlock("div", {
											key: 0,
											class: normalizeClass(unref(RV_INLINE_ROW))
										}, [createElementVNode("div", { class: normalizeClass(unref(RV_SKELETON_AVATAR)) }, null, 2), createElementVNode("div", { class: normalizeClass(unref(RV_SKELETON_NAME)) }, null, 2)], 2)) : (openBlock(), createElementBlock("div", {
											key: 1,
											class: normalizeClass(unref(RV_SKELETON_VALUE))
										}, null, 2))]),
										_: 2
									}, 1032, ["style"]);
								}), 128)),
								createVNode(TableCell_default, {
									"aria-hidden": "true",
									class: normalizeClass(unref(RV_SPACER_CELL))
								}, null, 8, ["class"]),
								createVNode(TableCell_default, { style: normalizeStyle(fixedWidth(unref(RV_ACTIONS_W))) }, {
									default: withCtx(() => [createElementVNode("div", { class: normalizeClass(unref(RV_SKELETON_ACTIONS)) }, null, 2)]),
									_: 1
								}, 8, ["style"])
							]),
							_: 1
						}, 8, ["class"]);
					}), 128)) : unref(hasRows) ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(paged), (row) => {
						return openBlock(), createBlock(TableRow_default, {
							key: row.id,
							"data-active": rowFlag(unref(activeId), row.id),
							"data-flash": rowFlag(unref(flashId), row.id),
							"data-dragover": rowFlag(unref(dragOverId), row.id) && unref(dragId) !== row.id,
							class: normalizeClass(unref(RV_ROW)),
							onContextmenu: ($event) => onContextMenu(row, $event),
							onDragover: ($event) => onDragOver(row, $event),
							onDrop: ($event) => onDrop(row, $event)
						}, {
							default: withCtx(() => [
								unref(showSelection) ? (openBlock(), createBlock(TableCell_default, {
									key: 0,
									class: normalizeClass(unref(RV_CELL_FLUSH)),
									style: normalizeStyle(fixedWidth(unref(RV_CHECKBOX_W)))
								}, {
									default: withCtx(() => [createElementVNode("div", { class: normalizeClass(unref(RV_SELECT_CELL)) }, [createElementVNode("div", {
										draggable: "true",
										"aria-label": `Drag ${primary(row).title || unref(singular)} to reorder`,
										title: "Drag to reorder",
										class: normalizeClass(unref(RV_GRIP)),
										onDragstart: ($event) => onDragStart(row, $event),
										onDragend: onDragEnd
									}, [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).grip), { class: normalizeClass(unref(RV_GRIP_ICON)) }, null, 8, ["class"]))], 42, _hoisted_2), createVNode(Checkbox_default, {
										"model-value": unref(selected).has(row.id),
										"aria-label": `Select ${primary(row).title}`,
										"onUpdate:modelValue": ($event) => unref(view).toggleSelect(row.id)
									}, null, 8, [
										"model-value",
										"aria-label",
										"onUpdate:modelValue"
									])], 2)]),
									_: 2
								}, 1032, ["class", "style"])) : createCommentVNode("", true),
								(openBlock(true), createElementBlock(Fragment, null, renderList(cols.value, (col) => {
									return openBlock(), createElementBlock(Fragment, { key: col.key }, [col.kind === "identity" ? (openBlock(), createBlock(TableCell_default, {
										key: 0,
										class: normalizeClass(unref(RV_CELL_FLUSH)),
										style: normalizeStyle(maxWidthStyle(bodyWidth(col)))
									}, {
										default: withCtx(() => [createElementVNode("button", {
											type: "button",
											disabled: unref(rowClick) === "none",
											class: normalizeClass(unref(RV_NAME_BUTTON)),
											onClick: ($event) => unref(view).openRow(row.id)
										}, [createElementVNode("span", { class: normalizeClass(unref(RV_INITIALS)) }, toDisplayString(primary(row).initials), 3), nameClip(row).full ? (openBlock(), createBlock(Tooltip_default, {
											key: 0,
											content: nameClip(row).full
										}, {
											default: withCtx(() => [createElementVNode("span", { class: normalizeClass(unref(RV_TRUNCATE)) }, toDisplayString(nameClip(row).text), 3)]),
											_: 2
										}, 1032, ["content"])) : (openBlock(), createElementBlock("span", {
											key: 1,
											class: normalizeClass(unref(RV_TRUNCATE))
										}, toDisplayString(nameClip(row).text || "—"), 3))], 10, _hoisted_3)]),
										_: 2
									}, 1032, ["class", "style"])) : (openBlock(), createBlock(TableCell_default, {
										key: 1,
										class: normalizeClass(unref(RV_CELL_FLUSH)),
										style: normalizeStyle(maxWidthStyle(bodyWidth(col)))
									}, {
										default: withCtx(() => [col.field.render ? (openBlock(), createElementBlock("div", {
											key: 0,
											class: normalizeClass(unref(cn)(unref(RV_CELL_CUSTOM), unref(RV_ALIGN_TEXT)[unref(view).alignOf(col.key)]))
										}, [createVNode(Render, { fn: renderCell(row, col.field) }, null, 8, ["fn"])], 2)) : isEditing(row, col.field) ? (openBlock(), createElementBlock("input", {
											key: 1,
											ref_for: true,
											ref: focusCell,
											value: unref(cellDraft),
											"aria-label": `Edit ${col.field.label}`,
											class: normalizeClass(unref(cn)(unref(RV_CELL_INPUT), unref(RV_ALIGN_TEXT)[unref(view).alignOf(col.key)])),
											onInput: onCellInput,
											onBlur: _cache[2] || (_cache[2] = ($event) => unref(view).commitEdit()),
											onKeydown: [_cache[3] || (_cache[3] = withKeys(($event) => unref(view).commitEdit(), ["enter"])), _cache[4] || (_cache[4] = withKeys(($event) => unref(view).cancelEdit(), ["esc"]))]
										}, null, 42, _hoisted_4)) : (openBlock(), createElementBlock("div", {
											key: 2,
											class: normalizeClass(cellClass(col.field))
										}, [(openBlock(), createBlock(resolveDynamicComponent(cellShell(col.field)), mergeProps({ ref_for: true }, cellShellProps(row, col.field)), {
											default: withCtx(() => [col.field.displayValue ? (openBlock(), createElementBlock("span", {
												key: 0,
												class: normalizeClass(unref(RV_TRUNCATE))
											}, [clip(row, col.field).text ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(clip(row, col.field).text), 1)], 64)) : (openBlock(), createBlock(MissingValue_default, { key: 1 }))], 2)) : col.field.multiple ? (openBlock(), createElementBlock("span", {
												key: 1,
												class: normalizeClass(unref(RV_CELL_MULTI))
											}, [createVNode(MultiFieldValue_default, {
												field: col.field,
												values: values(row, col.field),
												row
											}, null, 8, [
												"field",
												"values",
												"row"
											])], 2)) : asyncLabelled(row, col.field) ? (openBlock(), createElementBlock("span", {
												key: 2,
												class: normalizeClass(unref(RV_TRUNCATE))
											}, [createVNode(AsyncFieldValue_default, {
												field: col.field,
												value: rawText(row, col.field),
												values: row
											}, null, 8, [
												"field",
												"value",
												"values"
											])], 2)) : clip(row, col.field).full ? (openBlock(), createBlock(Tooltip_default, {
												key: 3,
												content: clip(row, col.field).full
											}, {
												default: withCtx(() => [createElementVNode("span", { class: normalizeClass(unref(RV_TRUNCATE)) }, toDisplayString(clip(row, col.field).text), 3)]),
												_: 2
											}, 1032, ["content"])) : (openBlock(), createElementBlock("span", {
												key: 4,
												class: normalizeClass(unref(RV_TRUNCATE))
											}, [clip(row, col.field).text ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(clip(row, col.field).text), 1)], 64)) : (openBlock(), createBlock(MissingValue_default, { key: 1 }))], 2))]),
											_: 2
										}, 1040)), showsActions(row, col.field) ? (openBlock(), createElementBlock("span", {
											key: 0,
											class: normalizeClass(unref(RV_CELL_ACTIONS))
										}, [col.field.copyable && rawText(row, col.field) ? (openBlock(), createElementBlock("button", {
											key: 0,
											type: "button",
											"aria-label": `Copy ${col.field.label}`,
											title: `Copy ${col.field.label}`,
											class: normalizeClass(unref(RV_CELL_ACTION)),
											onClick: withModifiers(($event) => unref(view).copyValue(cellKey(row, col.field), rawText(row, col.field)), ["stop"])
										}, [unref(copiedKey) === cellKey(row, col.field) ? (openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).check), {
											key: 0,
											class: normalizeClass(unref(RV_COPIED_ICON))
										}, null, 8, ["class"])) : (openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).copy), {
											key: 1,
											class: normalizeClass(unref(RV_ICON))
										}, null, 8, ["class"]))], 10, _hoisted_5)) : createCommentVNode("", true), col.field.editable ? (openBlock(), createElementBlock("button", {
											key: 1,
											type: "button",
											"aria-label": `Edit ${col.field.label}`,
											title: `Edit ${col.field.label}`,
											class: normalizeClass(unref(RV_CELL_ACTION)),
											onClick: withModifiers(($event) => unref(view).startEdit(row, col.field.key), ["stop"])
										}, [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).pencil), { class: normalizeClass(unref(RV_ICON)) }, null, 8, ["class"]))], 10, _hoisted_6)) : createCommentVNode("", true)], 2)) : createCommentVNode("", true)], 2))]),
										_: 2
									}, 1032, ["class", "style"]))], 64);
								}), 128)),
								createVNode(TableCell_default, {
									"aria-hidden": "true",
									class: normalizeClass(unref(RV_SPACER_HEAD))
								}, null, 8, ["class"]),
								createVNode(TableCell_default, {
									class: normalizeClass(unref(RV_ACTIONS_CELL)),
									style: normalizeStyle(fixedWidth(unref(RV_ACTIONS_W)))
								}, {
									default: withCtx(() => [createElementVNode("div", { class: normalizeClass(unref(RV_ROW_ACTIONS)) }, [
										createElementVNode("button", {
											type: "button",
											"aria-label": `View ${primary(row).title || unref(singular)}`,
											title: "View",
											class: normalizeClass(unref(RV_ROW_ACTION)),
											onClick: ($event) => unref(view).openView(row.id)
										}, [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).eye), { class: normalizeClass(unref(RV_ROW_ICON_VIEW)) }, null, 8, ["class"]))], 10, _hoisted_7),
										!unref(trash) && unref(canEdit) ? (openBlock(), createElementBlock("button", {
											key: 0,
											type: "button",
											"aria-label": `Edit ${primary(row).title || unref(singular)}`,
											title: "Edit",
											class: normalizeClass(unref(RV_ROW_ACTION)),
											onClick: ($event) => unref(view).openEdit(row.id)
										}, [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).pencil), { class: normalizeClass(unref(RV_ROW_ICON_EDIT)) }, null, 8, ["class"]))], 10, _hoisted_8)) : createCommentVNode("", true),
										unref(trash) && unref(canRestore) ? (openBlock(), createElementBlock("button", {
											key: 1,
											type: "button",
											"aria-label": `Restore ${primary(row).title || unref(singular)}`,
											title: "Restore",
											class: normalizeClass(unref(RV_ROW_ACTION)),
											onClick: ($event) => unref(view).askRestore(row.id)
										}, [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).reset), { class: normalizeClass(unref(RV_ROW_ICON_RESTORE)) }, null, 8, ["class"]))], 10, _hoisted_9)) : !unref(trash) ? (openBlock(), createElementBlock("button", {
											key: 2,
											type: "button",
											"aria-label": `Delete ${primary(row).title || unref(singular)}`,
											title: "Delete",
											class: normalizeClass(unref(RV_ROW_ACTION_DESTRUCTIVE)),
											onClick: ($event) => unref(view).requestDelete(row.id)
										}, [(openBlock(), createBlock(resolveDynamicComponent(unref(ICONS).trash), { class: normalizeClass(unref(RV_ROW_ICON_DELETE)) }, null, 8, ["class"]))], 10, _hoisted_10)) : createCommentVNode("", true)
									], 2)]),
									_: 2
								}, 1032, ["class", "style"])
							]),
							_: 2
						}, 1032, [
							"data-active",
							"data-flash",
							"data-dragover",
							"class",
							"onContextmenu",
							"onDragover",
							"onDrop"
						]);
					}), 128)) : (openBlock(), createBlock(TableRow_default, {
						key: 2,
						class: normalizeClass(unref(RV_ROW_INERT))
					}, {
						default: withCtx(() => [createVNode(TableCell_default, {
							colspan: cols.value.length + (unref(showSelection) ? 3 : 2),
							class: normalizeClass(unref(RV_EMPTY))
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(unref(emptyLabel)), 1)]),
							_: 1
						}, 8, ["colspan", "class"])]),
						_: 1
					}, 8, ["class"]))]),
					_: 1
				})]),
				_: 1
			}, 8, ["style", "class"])], 2);
		};
	}
});
//#endregion
export { RecordViewTable_vue_vue_type_script_setup_true_lang_default as default };

