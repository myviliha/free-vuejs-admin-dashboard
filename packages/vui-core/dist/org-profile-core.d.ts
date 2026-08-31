/**
 * The organization profile, framework-free: what a company's profile holds, the twenty-five fields it
 * is made of, and the rules the brand-asset control needs.
 *
 * **The field list is data, so it is shared rather than written twice.** Only three things about a field
 * belong to a framework (its icon, its read renderer and its edit control), so the list here names an
 * icon by string and marks the two brand-asset fields by name, and each edition maps those to its own
 * components. Twenty-five field definitions is exactly the kind of list that drifts silently: one
 * edition gains a `required`, or a label is fixed in one place.
 *
 * Lifted out of `organization-profile.tsx` on 2026-08-20 for wave 6 of the Vue parity epic.
 */
import type { FieldRules } from "./record-field-core.js";
export type OrgProfile = {
    id: number;
    legalName: string;
    displayName: string;
    orgId: string;
    domain: string;
    registrationNo: string;
    industry: string;
    country: string;
    region: string;
    description: string;
    logo: string;
    favicon: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    billingEmail: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postalCode: string;
    timezone: string;
    currency: string;
    dateFormat: string;
    measurement: string;
    language: string;
};
export declare const ORGANIZATION_PROFILE_DESCRIPTION = "This is your organization's profile: the company details, branding, contact information and locale that appear across the app, its portal, documents and emails. Switch to Edit to change anything, then Save. Fields marked with * are required.";
/**
 * Details for the line under a brand asset. Every part is optional; only the ones you supply are shown.
 */
export type BrandAssetMeta = {
    name?: string;
    /** File type shown as-is, e.g. `"PNG"`, `"SVG"`. */
    format?: string;
    width?: number;
    height?: number;
    sizeBytes?: number;
    uploadedAt?: string | Date;
};
/**
 * What `onPick` may return: the URL to display, optionally with details for the preview line. Return
 * nothing if you drive `value` yourself.
 */
export type BrandAssetPick = string | {
    url: string;
    meta?: BrandAssetMeta;
};
export declare const formatBytes: (n: number) => string;
export declare const fileMeta: (file: File) => BrandAssetMeta;
export declare const readDataUrl: (file: File) => Promise<string>;
/**
 * The line under the preview: name, format, dimensions, size, upload date, in that order, with the
 * absent parts dropped rather than rendered empty. Shared because it is the part a reader actually
 * reads, and two implementations would order or format it differently.
 */
export declare function assetDetails(info: BrandAssetMeta | undefined, dims?: {
    width: number;
    height: number;
}): string[];
/**
 * One step of a pick, with no framework in it: the size check, the "no uploader" case, and what the
 * caller's return value means. Returns the new url and meta, `null` when the caller drives `value`
 * itself, or an error message to show.
 */
export declare function pickAsset(file: File, args: {
    onPick?: (file: File) => BrandAssetPick | void | Promise<BrandAssetPick | void>;
    inline?: boolean;
    maxBytes?: number;
}): Promise<{
    url: string;
    meta: BrandAssetMeta;
} | null | {
    error: string;
}>;
/** The icons this profile uses, named rather than imported: each edition maps these to its own. */
export type OrgProfileIcon = "idCard" | "globe" | "mapPin" | "person" | "mail" | "building";
/**
 * One field of the profile, with the three framework-owned parts replaced by names. `brandAsset` marks
 * the two that render an image control rather than a value.
 */
export type OrgProfileFieldSpec = FieldRules<OrgProfile> & {
    iconName?: OrgProfileIcon;
    brandAsset?: "logo" | "favicon";
};
export declare const LOGO: {
    label: string;
    description: string;
    maxBytes: number;
};
export declare const FAVICON: {
    label: string;
    description: string;
    maxBytes: number;
};
/** The organization profile's fields, in the order they appear, sections and all. */
export declare const ORG_PROFILE_FIELD_SPECS: readonly OrgProfileFieldSpec[];
export declare function getOrgPrimary(row: OrgProfile): {
    title: string;
    subtitle: string;
    initials: string;
};
