import { THEME } from "./theme-context.js";
import { computed, defineComponent, onMounted, onUnmounted, provide, ref, renderSlot, watch } from "vue";
import { THEME_FIELDS, THEME_PRESETS, applyTheme, mergeThemes, parseTheme } from "@viliha/vui-core";
//#region src/ThemeConfigProvider.vue?vue&type=script&setup=true&lang.ts
/**
* Applies a theme to the document and manages the two layers: the organization sets the brand, and each
* person overrides the parts they care about.
*
* With no `source` the user's theme is kept in `localStorage`, which is the same trade React's makes:
* it works with no backend, and it does not follow anyone to another browser.
*/
var ThemeConfigProvider_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ThemeConfigProvider",
	props: {
		orgTheme: {},
		source: {},
		storageKey: { default: "vui.theme" }
	},
	setup(__props) {
		const props = __props;
		const org = computed(() => parseTheme(props.orgTheme ?? {}));
		const userTheme = ref({});
		const saving = ref(false);
		const error = ref(null);
		const theme = computed(() => mergeThemes(org.value, userTheme.value));
		/**
		* Loaded after mount, so the server-rendered HTML and the first client render agree. A personal theme
		* therefore lands one frame late; the organization's is applied from the start because it renders with
		* the page. React's provider makes exactly the same trade and says so.
		*/
		onMounted(async () => {
			try {
				if (props.source) {
					userTheme.value = parseTheme(await props.source.load() ?? {});
					return;
				}
				const raw = localStorage.getItem(props.storageKey);
				if (raw) userTheme.value = parseTheme(JSON.parse(raw));
			} catch (e) {
				error.value = e;
			}
		});
		let undo;
		watch(theme, (next) => {
			if (typeof document === "undefined") return;
			undo?.();
			undo = applyTheme(next, document.documentElement);
		}, {
			immediate: true,
			flush: "post"
		});
		onUnmounted(() => undo?.());
		const commit = async (next) => {
			userTheme.value = next;
			error.value = null;
			if (!props.source) {
				try {
					localStorage.setItem(props.storageKey, JSON.stringify(next));
				} catch {}
				return;
			}
			saving.value = true;
			try {
				await props.source.save(next);
			} catch (e) {
				error.value = e;
			} finally {
				saving.value = false;
			}
		};
		provide(THEME, {
			theme,
			orgTheme: org,
			userTheme,
			setValue: (key, value) => {
				const next = { ...userTheme.value };
				if (value == null || value === "") delete next[key];
				else next[key] = value;
				commit(next);
			},
			applyPreset: (id) => {
				const preset = THEME_PRESETS.find((p) => p.id === id);
				if (preset) commit(parseTheme(preset.theme));
			},
			reset: () => void commit({}),
			saving,
			error,
			fields: THEME_FIELDS,
			presets: THEME_PRESETS
		});
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default");
		};
	}
});
//#endregion
export { ThemeConfigProvider_vue_vue_type_script_setup_true_lang_default as default };

