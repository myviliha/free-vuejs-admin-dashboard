import { inject, ref } from "vue";
import { vuiPreset as vuiPreset$1 } from "@viliha/vui-core";
//#region src/config-context.ts
var VUI_CONFIG = Symbol("vui-config");
var VUI_PREFERENCES = Symbol("vui-preferences");
/**
* The effective config.
*
* **Falls back to `vuiPreset` when there is no provider**, which is React's behaviour: the provider is
* optional and the components use the theme as shipped without it. Three different absent-provider
* behaviours across this wave, and each one is deliberate.
*/
var useVuiConfig = () => inject(VUI_CONFIG, ref(vuiPreset$1));
/** The preference layer, or `null` where there is no provider, so a settings panel can hide itself. */
var useVuiPreferences = () => inject(VUI_PREFERENCES, null);
//#endregion
export { VUI_CONFIG, VUI_PREFERENCES, useVuiConfig, useVuiPreferences, vuiPreset$1 as vuiPreset };

