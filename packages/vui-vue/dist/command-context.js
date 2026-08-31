import { inject, ref } from "vue";
//#region src/command-context.ts
var COMMAND = Symbol("vui-command");
function createCommandContext() {
	const search = ref("");
	const matched = /* @__PURE__ */ new Set();
	const visible = ref(0);
	return {
		search,
		standalone: false,
		visible,
		report: (id, isMatch) => {
			if (isMatch === matched.has(id)) return;
			if (isMatch) matched.add(id);
			else matched.delete(id);
			visible.value = matched.size;
		},
		matches: (haystack) => {
			const term = search.value.trim().toLowerCase();
			return !term || haystack.toLowerCase().includes(term);
		}
	};
}
/** Falls back to a context that matches everything, so a part used alone still renders. */
var useCommand = () => inject(COMMAND, {
	search: ref(""),
	standalone: true,
	visible: ref(0),
	report: () => {},
	matches: () => true
});
//#endregion
export { COMMAND, createCommandContext, useCommand };

