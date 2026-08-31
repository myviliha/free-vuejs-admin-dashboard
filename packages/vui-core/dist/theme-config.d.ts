/**
 * Theme configuration: the complete list of things a host (or the person using
 * the app) can change about how the theme looks, as data.
 *
 * The rule the rest of the design system follows is that visual values live in
 * `theme.css` and nothing styles itself per component. This does not break that
 * rule, it finishes it: there is still exactly one token surface, and this file
 * gives it a runtime source. Every entry below maps to one CSS variable, so
 * applying a theme is setting variables on an element, and every component
 * follows without knowing this file exists.
 *
 * The package never talks to your database. `ThemeConfigProvider` takes a
 * `source` with `load()` and `save()`, so a theme can live in your API against
 * a user, an organization, or both.
 *
 * ```ts
 * const theme: ThemeConfig = { brand: "#266df0", radius: "0.625rem", fontSans: "inter" };
 * applyTheme(theme);           // sets the CSS variables on :root
 * ```
 */
/** One themeable value: what it is, what it edits, and how to show it. */
export type ThemeField = {
    key: keyof ThemeConfig;
    label: string;
    /** Which control a settings UI should render. */
    type: "color" | "font" | "length" | "choice" | "asset";
    /** The CSS variable it writes. Everything else in `theme.css` derives from
     *  these, which is why the list stays short. */
    cssVar: string;
    group: "Brand" | "Surface" | "Typography" | "Shape" | "Assets";
    /** What it does, in the words you'd put under the control. */
    hint: string;
    /** Options for `choice` and `font`. */
    options?: {
        value: string;
        label: string;
    }[];
    /** Whether a value is required for the theme to render. Optional entries fall
     *  back to whatever `theme.css` ships. */
    optional?: boolean;
};
/**
 * The themeable surface. Twelve entries on purpose: these are the ones with an
 * obvious meaning to whoever is looking at the screen. Everything else in
 * `theme.css` is derived from them (the ring, the selection colour, the button
 * shadow and the hover state all follow `--brand`), so this stays a settings
 * page rather than a stylesheet editor.
 */
export declare const THEME_FIELDS: ThemeField[];
/**
 * A saved theme. Every field is optional: anything unset falls back to the
 * organization's theme, then to what `theme.css` ships, so a partial record from
 * your database is always valid.
 */
export type ThemeConfig = {
    /** Any CSS colour. Hex is what the pickers produce. */
    brand?: string;
    brandForeground?: string;
    accent?: string;
    destructive?: string;
    /** The other three state colours, which used to be raw palette classes and unthemeable. */
    success?: string;
    warning?: string;
    info?: string;
    background?: string;
    foreground?: string;
    border?: string;
    /** A `FONT_FAMILIES` id. */
    fontSans?: string;
    /** A multiplier as a string, e.g. `"1.05"`. */
    fontScale?: string;
    /** A CSS length, e.g. `"0.625rem"`. */
    radius?: string;
    /** A URL, or whatever your uploader returns. */
    logo?: string;
    favicon?: string;
};
/**
 * The font families an app offers. Self-hosted and loaded by the app (with
 * `next/font`, which sets the CSS variable named here), so switching font makes
 * no network request and can't flash or shift the layout.
 *
 * **Every entry must be loaded by the app.** `variable` names a CSS variable the
 * app is expected to define; if it doesn't, the family silently falls back to
 * `stack` and the option looks broken rather than missing. To add one, load it
 * in your root layout, put its variable on `<html>`, and add an entry here. To
 * remove one, do the reverse. The demo loads all of these in
 * `app/layout.tsx`.
 */
export type FontFamily = {
    id: string;
    label: string;
    /** The CSS variable the app's font loader defines, e.g. `--font-inter`. */
    variable: string;
    /** Fallbacks, used until the family loads and if it never does. */
    stack: string;
};
export declare const FONT_FAMILIES: FontFamily[];
/** Named themes for a swatch picker. The first is what the package ships. */
export type ThemePreset = {
    id: string;
    label: string;
    theme: ThemeConfig;
};
export declare const THEME_PRESETS: ThemePreset[];
/** Parse `#rgb` / `#rrggbb` into 0-255 channels. Returns null for anything else,
 *  including the `oklch()` values `theme.css` ships. */
export declare function parseHex(color: string): [number, number, number] | null;
/**
 * Black or white, whichever stays readable on `color`. Uses the WCAG relative
 * luminance, so a mid-tone brand colour lands on the right side of the line
 * instead of shipping white text on yellow.
 *
 * Falls back to white for anything it can't parse, which is what the shipped
 * blue wants.
 */
export declare function readableOn(color: string): "#ffffff" | "#101112";
/**
 * A theme as CSS variables. The dark-mode variants are not computed here: they
 * derive from the same variables in `theme.css` with `color-mix`, so one saved
 * value covers both modes and neither can drift from the other.
 */
export declare function themeToCssVars(theme: ThemeConfig): Record<string, string>;
/**
 * Write a theme onto an element (the document root by default). Passing an
 * element scopes it, which is how a live preview renders one theme inside a page
 * running another.
 *
 * Returns a function that removes what it set, so a preview can clean up.
 */
export declare function applyTheme(theme: ThemeConfig, element?: HTMLElement | null): () => void;
/**
 * Keep only the keys this file knows about, and only string values. Run it on
 * anything arriving from your API: a stored theme is user input, and an unknown
 * key would otherwise be written straight onto the document as a CSS variable.
 */
export declare function parseTheme(input: unknown): ThemeConfig;
/** Later themes win, key by key. Used for organization theme ← user theme. */
export declare function mergeThemes(...themes: (ThemeConfig | undefined)[]): ThemeConfig;
