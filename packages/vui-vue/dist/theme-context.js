import { inject } from "vue";
import "@viliha/vui-core";
//#region src/theme-context.ts
var THEME = Symbol("vui-theme-config");
/**
* Read and change the theme, for a settings screen.
*
* **Returns `null` when there is no provider above**, which is React's behaviour and is deliberate: a
* settings section hides itself rather than crashing the page it is part of. `useAuth` throws instead,
* because a missing auth adapter is a wiring bug rather than an absent feature.
*/
var useThemeConfig = () => inject(THEME, null);
//#endregion
export { THEME, useThemeConfig };

