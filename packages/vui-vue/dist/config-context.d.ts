import { filterUserPreferences, mergeConfig, type UserConfigurable, type VuiConfig, type VuiPreferences, vuiPreset } from "@viliha/vui-core";
import { type ComputedRef, type InjectionKey, type Ref } from "vue";
/**
 * The config, injected.
 *
 * **The contract is shared, not redeclared.** `VuiConfig` and its parts come from
 * `@viliha/vui-core`, so a host writes one config object and it type-checks against either edition.
 * `mergeConfig`, `filterUserPreferences` and `vuiPreset` are the same functions React uses, so the two
 * cannot disagree about what a preference is allowed to override.
 */
export interface VuiPreferencesContext {
    /** The stored choices, as saved. */
    preferences: Ref<VuiPreferences>;
    /** Which keys this app opened up. Drive a settings UI from it. */
    userConfigurable: ComputedRef<UserConfigurable>;
    /** Set one key. Ignored, with no write, when the app did not allow it. */
    setPreference: <K extends keyof VuiConfig>(section: K, key: keyof NonNullable<VuiConfig[K]>, value: unknown) => void;
    /** Forget every stored choice and fall back to the app's config. */
    reset: () => void;
}
export declare const VUI_CONFIG: InjectionKey<ComputedRef<VuiConfig>>;
export declare const VUI_PREFERENCES: InjectionKey<VuiPreferencesContext>;
/**
 * The effective config.
 *
 * **Falls back to `vuiPreset` when there is no provider**, which is React's behaviour: the provider is
 * optional and the components use the theme as shipped without it. Three different absent-provider
 * behaviours across this wave, and each one is deliberate.
 */
export declare const useVuiConfig: () => ComputedRef<VuiConfig>;
/** The preference layer, or `null` where there is no provider, so a settings panel can hide itself. */
export declare const useVuiPreferences: () => VuiPreferencesContext | null;
export { filterUserPreferences, mergeConfig, vuiPreset };
