import { inject } from "vue";
//#region src/org-context.ts
var ORG = Symbol("vui-org");
/** Returns `null` with no provider, so a switcher renders nothing rather than crashing the sidebar. */
var useOrg = () => inject(ORG, null);
//#endregion
export { ORG, useOrg };

