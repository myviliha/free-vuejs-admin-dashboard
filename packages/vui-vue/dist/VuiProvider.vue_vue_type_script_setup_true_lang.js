import { VUI_CONFIG, VUI_PREFERENCES } from "./config-context.js";
import { computed, defineComponent, onMounted, provide, ref, renderSlot } from "vue";
import { filterUserPreferences, mergeConfig, vuiPreset } from "@viliha/vui-core";
//#region src/VuiProvider.vue?vue&type=script&setup=true&lang.ts
/**
* Apply a config to everything below. Optional: without it the components use `vuiPreset`, the theme as
* shipped.
*
* Pass `userConfigurable` to let the person using the app override some of it from inside the app. Their
* choices are saved per browser and merged over the host's config, so a preconfigured theme stays
* changeable at runtime **without the host giving up control of what may change**, which is what
* `filterUserPreferences` enforces on the way in.
*/
var VuiProvider_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VuiProvider",
	props: {
		config: {},
		userConfigurable: {},
		storageKey: { default: "vui.prefs" }
	},
	setup(__props) {
		const props = __props;
		const preferences = ref({});
		const editable = computed(() => props.userConfigurable ?? {});
		onMounted(() => {
			try {
				const raw = localStorage.getItem(props.storageKey);
				if (!raw) return;
				const parsed = JSON.parse(raw);
				if (parsed && typeof parsed === "object") preferences.value = parsed;
			} catch {}
		});
		const effective = computed(() => mergeConfig(vuiPreset, props.config, filterUserPreferences(preferences.value, editable.value)));
		provide(VUI_CONFIG, effective);
		provide(VUI_PREFERENCES, {
			preferences,
			userConfigurable: editable,
			setPreference: (section, key, value) => {
				if (!editable.value[section]?.includes(key)) return;
				const next = {
					...preferences.value,
					[section]: {
						...preferences.value[section] ?? {},
						[key]: value
					}
				};
				preferences.value = next;
				try {
					localStorage.setItem(props.storageKey, JSON.stringify(next));
				} catch {}
			},
			reset: () => {
				preferences.value = {};
				try {
					localStorage.removeItem(props.storageKey);
				} catch {}
			}
		});
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default");
		};
	}
});
//#endregion
export { VuiProvider_vue_vue_type_script_setup_true_lang_default as default };

