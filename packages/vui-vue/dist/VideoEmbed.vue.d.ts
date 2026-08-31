import { type VideoRatio } from "@viliha/vui-core";
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
type __VLS_Props = {
    /** The provider's id, not a full URL: the URL is the provider's shape and belongs in here. */
    videoId: string;
    /** What the video is. Required, because a frame with no name is unusable without sight. */
    title: string;
    ratio?: VideoRatio;
    provider?: "youtube" | "vimeo";
    /**
     * Load the player on mount instead of on click.
     *
     * Off by default, and that default is the point of this component. Reach for it only when the
     * video **is** the page and the visitor came for it.
     */
    eager?: boolean;
    class?: string;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    ratio: VideoRatio;
    provider: "youtube" | "vimeo";
    eager: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
