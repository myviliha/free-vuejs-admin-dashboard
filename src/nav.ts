import { FREE_NAV, FREE_NAV_HREFS, type FreeNavEntry, type FreeNavGroup } from "@viliha/vui-core";

/**
 * The free demo's navigation, from the shared source.
 *
 * There is nothing edition-specific in the list itself, which is the point of it living in
 * `@viliha/vui-core`: this demo and the React one are the same product, so a sidebar that differed
 * between them would be a defect rather than a variation. What this app owns is how a row is *drawn*,
 * and that is `NavIcon.vue` mapping the entry's `icon` name to a glyph.
 */
export const NAV = FREE_NAV;
export const NAV_HREFS = FREE_NAV_HREFS;

export type { FreeNavEntry as NavEntry, FreeNavGroup as NavGroup };
