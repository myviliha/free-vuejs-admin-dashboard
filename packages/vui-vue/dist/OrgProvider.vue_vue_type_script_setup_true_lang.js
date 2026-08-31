import { ORG } from "./org-context.js";
import { computed, defineComponent, onMounted, provide, ref, renderSlot } from "vue";
import { resolveCurrentId } from "@viliha/vui-core";
//#region src/OrgProvider.vue?vue&type=script&setup=true&lang.ts
/**
* Owns which organization is current, and the switch.
*
* Out of the box, selecting one sets it and remembers it per browser, so the choice survives a reload.
* Pass `onSwitch` when a switch means more than that (a server call to move the session, a cookie your
* API reads). **It runs before the current organization changes, and throwing from it cancels the
* switch**, so a failed call leaves the user where they were rather than showing them a tenant they are
* not in. That is React's contract and it is the part worth getting right.
*/
var OrgProvider_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "OrgProvider",
	props: {
		organizations: {},
		defaultOrgId: {},
		onSwitch: {},
		storageKey: { default: "vui.org" },
		persist: {
			type: Boolean,
			default: true
		}
	},
	setup(__props) {
		const props = __props;
		const wanted = ref(props.defaultOrgId);
		const switching = ref();
		const error = ref(null);
		const currentId = computed(() => resolveCurrentId(props.organizations, wanted.value));
		const current = computed(() => props.organizations.find((o) => o.id === currentId.value));
		onMounted(() => {
			if (!props.persist) return;
			try {
				const saved = localStorage.getItem(props.storageKey);
				if (saved) wanted.value = saved;
			} catch {}
		});
		/**
		* **There is deliberately no watcher on `defaultOrgId`.** React initialises from it once and a later
		* change does nothing, so adding one turned a first-load default into a semi-controlled prop that wrote
		* `wanted` without going through the commit that persists it: the UI moved and storage did not, and the
		* next reload dropped back. A host that needs to move the session should call `switchTo`.
		*/
		const switchTo = async (id) => {
			const org = props.organizations.find((o) => o.id === id);
			if (!org || id === currentId.value) return;
			switching.value = id;
			error.value = null;
			try {
				await props.onSwitch?.(org);
				wanted.value = id;
				if (props.persist) try {
					localStorage.setItem(props.storageKey, id);
				} catch {}
			} catch (e) {
				error.value = e;
			} finally {
				switching.value = void 0;
			}
		};
		provide(ORG, {
			organizations: computed(() => props.organizations),
			current,
			currentId,
			switchTo: (id) => void switchTo(id),
			switching,
			error
		});
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default");
		};
	}
});
//#endregion
export { OrgProvider_vue_vue_type_script_setup_true_lang_default as default };

