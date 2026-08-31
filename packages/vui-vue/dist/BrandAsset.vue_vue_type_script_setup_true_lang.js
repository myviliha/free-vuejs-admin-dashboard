import Button_default from "./Button.js";
import { computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, normalizeClass, openBlock, ref, toDisplayString, unref, withCtx } from "vue";
import { BRAND_ASSET_ACTIONS, BRAND_ASSET_BOX, BRAND_ASSET_BOX_SIZES, BRAND_ASSET_DETAILS, BRAND_ASSET_EMPTY, BRAND_ASSET_ERROR, BRAND_ASSET_FITS, BRAND_ASSET_INPUT, BRAND_ASSET_ROOT, BRAND_ASSET_ROW, assetDetails, cn, pickAsset } from "@viliha/vui-core";
//#region src/BrandAsset.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["src"];
var _hoisted_2 = ["accept"];
/**
* Logo / favicon control: a preview, an optional details line, and Replace / Remove.
*
* **It never uploads anything itself** — you hand it an `onPick` that stores the file and returns a
* URL. The size check, the missing-uploader case and what a return value means are `pickAsset`'s, so
* both editions accept and reject the same files with the same words, which matters because those
* words are what a user reads when a file is refused.
*
* ```vue
* <BrandAsset :value="org.logoUrl" :on-pick="upload" :max-bytes="2 * 1024 * 1024" />
* ```
*/
var BrandAsset_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BrandAsset",
	props: {
		value: {},
		onPick: {},
		onRemove: {},
		meta: {},
		accept: { default: "image/*" },
		maxBytes: {},
		busy: { type: Boolean },
		inline: { type: Boolean },
		square: { type: Boolean },
		placeholder: {},
		fit: { default: "contain" },
		readOnly: { type: Boolean }
	},
	emits: ["update:value"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const input = ref();
		/** Details from the last pick, kept only while they describe the current value — so a Cancel that
		*  reverts `value` drops them too. */
		const picked = ref();
		const dims = ref();
		const uploading = ref(false);
		const error = ref("");
		const working = computed(() => props.busy || uploading.value);
		const info = computed(() => picked.value?.url === props.value ? picked.value.meta : props.meta);
		const details = computed(() => assetDetails(info.value, dims.value));
		const handleFile = async (file) => {
			error.value = "";
			uploading.value = true;
			const result = await pickAsset(file, {
				onPick: props.onPick,
				inline: props.inline,
				maxBytes: props.maxBytes
			});
			uploading.value = false;
			if (!result) return;
			if ("error" in result) {
				error.value = result.error;
				return;
			}
			picked.value = result;
			dims.value = void 0;
			emit("update:value", result.url);
		};
		const onFile = (e) => {
			const el = e.target;
			const file = el.files?.[0];
			el.value = "";
			if (file) handleFile(file);
		};
		const remove = () => {
			error.value = "";
			picked.value = void 0;
			dims.value = void 0;
			props.onRemove?.();
			emit("update:value", "");
		};
		/** The intrinsic size, read off the loaded image, so a host that supplies no `meta` still gets it. */
		const measure = (e) => {
			const img = e.target;
			dims.value = {
				width: img.naturalWidth,
				height: img.naturalHeight
			};
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(BRAND_ASSET_ROOT)) }, [
				createElementVNode("div", { class: normalizeClass(unref(BRAND_ASSET_ROW)) }, [createElementVNode("div", { class: normalizeClass(unref(cn)(unref(BRAND_ASSET_BOX), unref(BRAND_ASSET_BOX_SIZES)[__props.square ? "square" : "wide"])) }, [__props.value ? (openBlock(), createElementBlock("img", {
					key: 0,
					src: __props.value,
					alt: "",
					class: normalizeClass(unref(BRAND_ASSET_FITS)[__props.fit]),
					onLoad: measure
				}, null, 42, _hoisted_1)) : (openBlock(), createElementBlock("span", {
					key: 1,
					class: normalizeClass(unref(BRAND_ASSET_EMPTY))
				}, toDisplayString(__props.placeholder ?? "None"), 3))], 2), !__props.readOnly ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: normalizeClass(unref(BRAND_ASSET_ACTIONS))
				}, [
					createVNode(Button_default, {
						size: "sm",
						type: "button",
						disabled: working.value,
						onClick: _cache[0] || (_cache[0] = ($event) => input.value?.click())
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(working.value ? "Uploading…" : __props.value ? "Replace" : "Upload"), 1)]),
						_: 1
					}, 8, ["disabled"]),
					__props.value ? (openBlock(), createBlock(Button_default, {
						key: 0,
						size: "sm",
						variant: "ghost",
						type: "button",
						disabled: working.value,
						onClick: remove
					}, {
						default: withCtx(() => [..._cache[1] || (_cache[1] = [createTextVNode(" Remove ", -1)])]),
						_: 1
					}, 8, ["disabled"])) : createCommentVNode("", true),
					createElementVNode("input", {
						ref_key: "input",
						ref: input,
						type: "file",
						accept: __props.accept,
						class: normalizeClass(unref(BRAND_ASSET_INPUT)),
						onChange: onFile
					}, null, 42, _hoisted_2)
				], 2)) : createCommentVNode("", true)], 2),
				details.value.length ? (openBlock(), createElementBlock("p", {
					key: 0,
					class: normalizeClass(unref(BRAND_ASSET_DETAILS))
				}, toDisplayString(details.value.join(" · ")), 3)) : createCommentVNode("", true),
				error.value ? (openBlock(), createElementBlock("p", {
					key: 1,
					class: normalizeClass(unref(BRAND_ASSET_ERROR))
				}, toDisplayString(error.value), 3)) : createCommentVNode("", true)
			], 2);
		};
	}
});
//#endregion
export { BrandAsset_vue_vue_type_script_setup_true_lang_default as default };

