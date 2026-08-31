import { applyTheme, mergeThemes, parseTheme, THEME_FIELDS, THEME_PRESETS, type ThemeConfig } from "@viliha/vui-core";
import { type ComputedRef, type InjectionKey, type Ref } from "vue";
/**
 * Where a theme is read and changed.
 *
 * **The engine is already shared and is not reimplemented here.** `parseTheme`, `mergeThemes`,
 * `applyTheme`, `THEME_FIELDS` and `THEME_PRESETS` live in `@viliha/vui-core`, so this edition is a
 * reactive shell over the same functions React uses. What is worth asserting about it is the CSS
 * variables that land on the element, not the shell.
 */
export interface ThemeSource {
    /** Read this user's saved theme. Return `null` when they have none. */
    load: () => Promise<ThemeConfig | null> | ThemeConfig | null;
    /** Persist it. Awaited, so the UI can show a saving state and report a failure. */
    save: (theme: ThemeConfig) => Promise<void> | void;
}
export interface ThemeContext {
    /** What is on screen: the organization's theme with the user's on top. */
    theme: ComputedRef<ThemeConfig>;
    /** The organization's, as passed in. The floor a user overrides. */
    orgTheme: ComputedRef<ThemeConfig>;
    /** This user's overrides only. What gets saved. */
    userTheme: Ref<ThemeConfig>;
    /** Change one value. `undefined` drops the override and falls back to the organization's. */
    setValue: (key: keyof ThemeConfig, value: string | undefined) => void;
    /** Apply a named preset from `THEME_PRESETS` as the user's theme. */
    applyPreset: (id: string) => void;
    /** Drop every personal override. */
    reset: () => void;
    saving: Ref<boolean>;
    error: Ref<unknown>;
    fields: typeof THEME_FIELDS;
    presets: typeof THEME_PRESETS;
}
export declare const THEME: InjectionKey<ThemeContext>;
/**
 * Read and change the theme, for a settings screen.
 *
 * **Returns `null` when there is no provider above**, which is React's behaviour and is deliberate: a
 * settings section hides itself rather than crashing the page it is part of. `useAuth` throws instead,
 * because a missing auth adapter is a wiring bug rather than an absent feature.
 */
export declare const useThemeConfig: () => ThemeContext | null;
export { applyTheme, mergeThemes, parseTheme, THEME_FIELDS, THEME_PRESETS };
