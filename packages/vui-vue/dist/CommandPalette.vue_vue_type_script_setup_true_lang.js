import Kbd_default from "./Kbd.js";
import { Fragment, computed, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, mergeModels, nextTick, normalizeClass, onBeforeUnmount, openBlock, ref, renderList, renderSlot, toDisplayString, unref, useModel, vModelText, watch, withCtx, withDirectives } from "vue";
import { PALETTE_EMPTY, PALETTE_GROUP, PALETTE_GROUP_LABEL, PALETTE_INPUT, PALETTE_ITEM, PALETTE_ITEM_HINT, PALETTE_ITEM_ICON, PALETTE_ITEM_LABEL, PALETTE_LIST, PALETTE_OVERLAY, PALETTE_PANEL, PALETTE_SEARCH_ICON, PALETTE_SEARCH_ROW, cn, filterActions, groupActions } from "@viliha/vui-core";
//#region src/CommandPalette.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["placeholder", "aria-label"];
var _hoisted_2 = [
	"data-active",
	"onMousemove",
	"onClick"
];
var CommandPalette_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CommandPalette",
	props: /*@__PURE__*/ mergeModels({
		actions: {},
		placeholder: { default: "Search…" },
		emptyMessage: {}
	}, {
		"open": {
			type: Boolean,
			default: false
		},
		"openModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["close"], ["update:open"]),
	setup(__props, { emit: __emit }) {
		const open = useModel(__props, "open");
		const props = __props;
		const emit = __emit;
		const query = ref("");
		const active = ref(0);
		const list = ref(null);
		const panel = ref(null);
		const input = ref(null);
		const results = computed(() => filterActions(props.actions, query.value));
		const groups = computed(() => groupActions(results.value));
		/** The flat index of each action, so a grouped list still highlights one row at a time. */
		const flatIndex = computed(() => new Map(results.value.map((a, i) => [a.id, i])));
		const close = () => {
			open.value = false;
			emit("close");
		};
		const run = (action) => {
			close();
			action.onSelect();
		};
		const onOutside = (e) => {
			if (panel.value && !panel.value.contains(e.target)) close();
		};
		/**
		* **No `immediate`, and every `document` touch is behind a mount.** An immediate watcher runs inside
		* `setup`, which on a server has no `document` at all, so rendering this component during SSR threw
		* before it rendered anything. The package advertises Nuxt, and the parity suite runs on `node`, so
		* nothing here would have caught it either.
		*/
		watch(open, async (isOpen) => {
			if (typeof document === "undefined") return;
			if (!isOpen) {
				document.removeEventListener("mousedown", onOutside);
				return;
			}
			query.value = "";
			active.value = 0;
			await nextTick();
			input.value?.focus();
			document.addEventListener("mousedown", onOutside);
		});
		onBeforeUnmount(() => {
			if (typeof document !== "undefined") document.removeEventListener("mousedown", onOutside);
		});
		watch(() => results.value.length, (len) => {
			if (active.value >= len) active.value = Math.max(len - 1, 0);
		});
		watch([active, open], async () => {
			await nextTick();
			list.value?.querySelector("[data-active=\"true\"]")?.scrollIntoView({ block: "nearest" });
		});
		const onKeydown = (e) => {
			if (e.key === "ArrowDown") {
				e.preventDefault();
				active.value = Math.min(active.value + 1, results.value.length - 1);
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				active.value = Math.max(active.value - 1, 0);
			} else if (e.key === "Enter") {
				e.preventDefault();
				const action = results.value[active.value];
				if (action) run(action);
			} else if (e.key === "Escape") {
				e.preventDefault();
				close();
			}
		};
		return (_ctx, _cache) => {
			return open.value ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: normalizeClass(unref(PALETTE_OVERLAY))
			}, [createElementVNode("div", {
				ref_key: "panel",
				ref: panel,
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Command palette",
				class: normalizeClass(unref(PALETTE_PANEL)),
				style: { "--vui-pop-origin": "top center" }
			}, [createElementVNode("div", { class: normalizeClass(unref(PALETTE_SEARCH_ROW)) }, [
				(openBlock(), createElementBlock("svg", {
					xmlns: "http://www.w3.org/2000/svg",
					width: "24",
					height: "24",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					"stroke-width": "2",
					"stroke-linecap": "round",
					"stroke-linejoin": "round",
					class: normalizeClass(unref(PALETTE_ITEM_HINT)),
					"aria-hidden": "true"
				}, [..._cache[2] || (_cache[2] = [createElementVNode("circle", {
					cx: "11",
					cy: "11",
					r: "8"
				}, null, -1), createElementVNode("path", { d: "m21 21-4.3-4.3" }, null, -1)])], 2)),
				withDirectives(createElementVNode("input", {
					ref_key: "input",
					ref: input,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => query.value = $event),
					placeholder: __props.placeholder,
					"aria-label": __props.placeholder,
					class: normalizeClass(unref(PALETTE_INPUT)),
					onInput: _cache[1] || (_cache[1] = ($event) => active.value = 0),
					onKeydown
				}, null, 42, _hoisted_1), [[vModelText, query.value]]),
				createVNode(Kbd_default, { class: normalizeClass(unref(PALETTE_SEARCH_ICON)) }, {
					default: withCtx(() => [..._cache[3] || (_cache[3] = [createTextVNode("Esc", -1)])]),
					_: 1
				}, 8, ["class"])
			], 2), createElementVNode("div", {
				ref_key: "list",
				ref: list,
				class: normalizeClass(unref(PALETTE_LIST))
			}, [results.value.length === 0 ? (openBlock(), createElementBlock("p", {
				key: 0,
				class: normalizeClass(unref(PALETTE_EMPTY))
			}, toDisplayString(__props.emptyMessage ?? `No results for “${query.value}”.`), 3)) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(groups.value, ([group, items]) => {
				return openBlock(), createElementBlock("div", {
					key: group || "_",
					class: normalizeClass(unref(PALETTE_GROUP))
				}, [group ? (openBlock(), createElementBlock("p", {
					key: 0,
					class: normalizeClass(unref(PALETTE_GROUP_LABEL))
				}, toDisplayString(group), 3)) : createCommentVNode("", true), (openBlock(true), createElementBlock(Fragment, null, renderList(items, (action) => {
					return openBlock(), createElementBlock("button", {
						key: action.id,
						type: "button",
						"data-active": flatIndex.value.get(action.id) === active.value,
						class: normalizeClass(unref(PALETTE_ITEM)),
						onMousemove: ($event) => active.value = flatIndex.value.get(action.id) ?? 0,
						onClick: ($event) => run(action)
					}, [_ctx.$slots.icon ? (openBlock(), createElementBlock("span", {
						key: 0,
						class: normalizeClass(unref(cn)(unref(PALETTE_ITEM_ICON), action.iconClass ?? "text-muted-foreground"))
					}, [renderSlot(_ctx.$slots, "icon", { action })], 2)) : createCommentVNode("", true), createElementVNode("span", { class: normalizeClass(unref(PALETTE_ITEM_LABEL)) }, toDisplayString(action.label), 3)], 42, _hoisted_2);
				}), 128))], 2);
			}), 128))], 2)], 2)], 2)) : createCommentVNode("", true);
		};
	}
});
//#endregion
export { CommandPalette_vue_vue_type_script_setup_true_lang_default as default };

