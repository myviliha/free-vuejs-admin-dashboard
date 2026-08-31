import { computed, createElementBlock, createElementVNode, defineComponent, nextTick, normalizeClass, openBlock, ref, toDisplayString, unref } from "vue";
import { VIDEO_FRAME, VIDEO_HINT, VIDEO_IFRAME, VIDEO_PLAY, VIDEO_PLAY_ICON, VIDEO_POSTER, VIDEO_RATIOS, cn } from "@viliha/vui-core";
//#region src/VideoEmbed.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["src", "title"];
var _hoisted_2 = ["aria-label"];
/**
* A ratio-locked video frame that **loads nothing until it is asked to**.
*
* The reference renders a provider `<iframe>` on mount, four of them on one page, which is four
* third-party connections, roughly a megabyte of player and a set of cookies for a visitor who may
* never press play. In a template that ships into other people's products that is a privacy decision
* made on their behalf, in jurisdictions we know nothing about. So the frame is ours until the click,
* the URL is `youtube-nocookie`, and the visitor chooses.
*
* **Focus moves to the player when it mounts**, because the button that asked for it stops existing
* in the same tick. Without it a keyboard user pressing Enter has focus reset to `<body>` and the
* player they just asked for becomes the hardest thing on the page to reach: the whole cost of
* click-to-load landing on the one person who cannot see that it worked. Skipped for `eager`, where
* nothing was pressed and stealing focus would be the defect.
*
* The ratio is a real `aspect-ratio` rather than the padding-top trick, so the box reserves its own
* height and the page does not jump when the player arrives.
*/
var VideoEmbed_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VideoEmbed",
	props: {
		videoId: {},
		title: {},
		ratio: { default: "16:9" },
		provider: { default: "youtube" },
		eager: {
			type: Boolean,
			default: false
		},
		class: {}
	},
	setup(__props) {
		const props = __props;
		const playing = ref(props.eager);
		const frame = ref(null);
		const SRC = {
			youtube: (id) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
			vimeo: (id) => `https://player.vimeo.com/video/${id}?autoplay=1`
		};
		const src = computed(() => SRC[props.provider](props.videoId));
		const classes = computed(() => cn(VIDEO_FRAME, VIDEO_RATIOS[props.ratio], props.class));
		async function play() {
			playing.value = true;
			await nextTick();
			frame.value?.focus();
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(classes.value),
				"data-slot": "video-embed"
			}, [playing.value ? (openBlock(), createElementBlock("iframe", {
				key: 0,
				ref_key: "frame",
				ref: frame,
				src: src.value,
				title: __props.title,
				class: normalizeClass(unref(VIDEO_IFRAME)),
				tabindex: "-1",
				allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
				allowfullscreen: ""
			}, null, 10, _hoisted_1)) : (openBlock(), createElementBlock("button", {
				key: 1,
				type: "button",
				class: normalizeClass(unref(VIDEO_POSTER)),
				"aria-label": `Play ${__props.title}. Loads the player from ${__props.provider}.`,
				onClick: play
			}, [createElementVNode("span", { class: normalizeClass(unref(VIDEO_PLAY)) }, [(openBlock(), createElementBlock("svg", {
				class: normalizeClass(unref(VIDEO_PLAY_ICON)),
				viewBox: "0 0 15 15",
				fill: "none",
				"aria-hidden": "true",
				xmlns: "http://www.w3.org/2000/svg"
			}, [..._cache[0] || (_cache[0] = [createElementVNode("path", {
				d: "M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181Z",
				fill: "currentColor",
				"fill-rule": "evenodd",
				"clip-rule": "evenodd"
			}, null, -1)])], 2))], 2), createElementVNode("span", { class: normalizeClass(unref(VIDEO_HINT)) }, toDisplayString(__props.title), 3)], 10, _hoisted_2))], 2);
		};
	}
});
//#endregion
export { VideoEmbed_vue_vue_type_script_setup_true_lang_default as default };

