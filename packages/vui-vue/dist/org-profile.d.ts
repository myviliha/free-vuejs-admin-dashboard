import { type OrgProfile } from "@viliha/vui-core";
import BrandAsset from "./BrandAsset.vue";
import type { RecordField } from "./record-field";
/**
 * The organization profile preset for Vue: the shared field list, bound to this edition's icons and
 * brand-asset control.
 *
 * **The twenty-five field definitions are not here** — they are `@viliha/vui-core`'s, and this file is
 * the three things a framework owns: the icon component, the read renderer and the edit control. That
 * is the whole point of the split: a `required` added to one edition's list, or a label fixed in one
 * place, cannot happen.
 */
export type { OrgProfile } from "@viliha/vui-core";
export { type BrandAssetMeta, type BrandAssetPick, getOrgPrimary, ORGANIZATION_PROFILE_DESCRIPTION, } from "@viliha/vui-core";
/** The building glyph the profile page uses for its title. */
export declare const ORGANIZATION_PROFILE_ICON: import("vue").FunctionalComponent<{
    class?: string;
}, {}, any, {}>;
/**
 * Everything `BrandAsset` takes except the props the field itself supplies (`value`, the change
 * handler, `square` and `readOnly`). Derived from the component's own props with `Omit`, so a prop
 * added there is in scope here without a second declaration to update.
 */
export type BrandAssetHost = Omit<InstanceType<typeof BrandAsset>["$props"], "value" | "onUpdate:value" | "square" | "readOnly">;
export interface OrgProfileFieldOptions {
    logo?: BrandAssetHost;
    favicon?: BrandAssetHost;
}
/**
 * The organization profile fields, with your uploader wired into the Logo and Favicon controls:
 *
 * ```ts
 * const fields = orgProfileFields({ logo: { onPick: (f) => upload(f) } });
 * ```
 *
 * Pass nothing and the brand assets fall back to `inline` (base64 data URI) mode, which is fine for a
 * demo with no backend and wrong for anything else.
 */
export declare function orgProfileFields(hosts?: OrgProfileFieldOptions): RecordField<OrgProfile>[];
/** The demo default, pre-built: `inline` brand assets and no uploader. */
export declare const organizationProfileFields: RecordField<OrgProfile>[];
