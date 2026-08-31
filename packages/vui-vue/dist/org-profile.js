import BrandAsset_default from "./BrandAsset.js";
import { ICONS } from "./icons.js";
import { h } from "vue";
import { FAVICON, LOGO, ORGANIZATION_PROFILE_DESCRIPTION, ORG_PROFILE_FIELD_SPECS, getOrgPrimary } from "@viliha/vui-core";
//#region src/org-profile.ts
/** The building glyph the profile page uses for its title. */
var ORGANIZATION_PROFILE_ICON = ICONS.building;
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
function orgProfileFields(hosts = {}) {
	return ORG_PROFILE_FIELD_SPECS.map((spec) => {
		const { iconName, brandAsset, ...field } = spec;
		const base = {
			...field,
			icon: iconName ? ICONS[iconName] : void 0
		};
		if (!brandAsset) return base;
		const square = brandAsset === "favicon";
		const host = {
			inline: true,
			maxBytes: (brandAsset === "logo" ? LOGO : FAVICON).maxBytes,
			...hosts[brandAsset]
		};
		return {
			...base,
			render: (row) => h(BrandAsset_default, {
				...host,
				value: row[brandAsset],
				square,
				readOnly: true
			}),
			renderInput: ({ value, onChange }) => h(BrandAsset_default, {
				...host,
				value,
				square,
				"onUpdate:value": onChange
			})
		};
	});
}
/** The demo default, pre-built: `inline` brand assets and no uploader. */
var organizationProfileFields = orgProfileFields();
//#endregion
export { ORGANIZATION_PROFILE_DESCRIPTION, ORGANIZATION_PROFILE_ICON, getOrgPrimary, orgProfileFields, organizationProfileFields };

