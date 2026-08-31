import { computed, createBlock, createCommentVNode, createTextVNode, defineComponent, normalizeClass, openBlock, renderSlot, toDisplayString, unref, withCtx } from "vue";
import { ListboxGroup, ListboxGroupLabel } from "reka-ui";
import { COMMAND_GROUP, cn } from "@viliha/vui-core";
//#region src/CommandGroup.vue?vue&type=script&setup=true&lang.ts
/**
* A labelled section of the list.
*
* **`cmdk-group-heading` on the label is load-bearing, not a leftover.** `COMMAND_GROUP` styles its
* heading through `[&_[cmdk-group-heading]]:` variants, because React's `cmdk` puts that attribute on
* the heading element. Reka does not, so this component emits it: a shared class string is only shared
* if every edition emits the attributes it selects on, which is `D23` of the Vue parity spec. Without
* it the heading renders unstyled and the parity test still passes, because the string is identical.
*
* **A group does not hide itself when its items are filtered out**, where `cmdk` does. Hiding on the
* family's total match count deadlocks: the group disappears before its items mount, so they never
* report a match and the count never recovers. Doing it properly needs a per-group registry, and a
* heading above an empty section is the cheaper failure of the two.
*/
var CommandGroup_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CommandGroup",
	props: {
		heading: {},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const classes = computed(() => cn(COMMAND_GROUP, props.class));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ListboxGroup), {
				class: normalizeClass(classes.value),
				"data-slot": "command-group"
			}, {
				default: withCtx(() => [__props.heading ? (openBlock(), createBlock(unref(ListboxGroupLabel), {
					key: 0,
					"cmdk-group-heading": ""
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(__props.heading), 1)]),
					_: 1
				})) : createCommentVNode("", true), renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["class"]);
		};
	}
});
//#endregion
export { CommandGroup_vue_vue_type_script_setup_true_lang_default as default };

