import { type BrandAssetMeta, type BrandAssetPick } from "@viliha/vui-core";
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
type __VLS_Props = {
    /** The URL to display. Whatever you store is your business; this only renders it. */
    value: string;
    /** Called with the picked file. Upload it and return the URL to show. Async is fine. */
    onPick?: (file: File) => BrandAssetPick | void | Promise<BrandAssetPick | void>;
    /** Called when Remove is clicked, before the value is cleared. */
    onRemove?: () => void;
    /** Details for the current asset, shown under the preview. */
    meta?: BrandAssetMeta;
    /** File picker filter. Defaults to every image type. */
    accept?: string;
    /** Reject anything larger, before `onPick` is called. */
    maxBytes?: number;
    /** Force the busy state, e.g. while a save is in flight. */
    busy?: boolean;
    /**
     * Demo escape hatch: with no backend, read the file as a base64 data URI and use that as the
     * value. Never ship this against a real API — the whole image ends up in the field.
     */
    inline?: boolean;
    square?: boolean;
    /** What the empty box shows. Defaults to "None"; an avatar passes initials. */
    placeholder?: string;
    /** `contain` keeps a logo whole (default); `cover` fills the box, for a photo. */
    fit?: "contain" | "cover";
    readOnly?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:value": (value: string) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:value"?: ((value: string) => any) | undefined;
}>, {
    accept: string;
    fit: "contain" | "cover";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
