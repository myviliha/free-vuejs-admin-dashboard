/**
 * The settings screen's sections, its theme switch and its preference lists (`PD-040`).
 *
 * **`applyColorScheme` is the reason this module exists.** Light, dark and system is not a preference
 * stored in one place: it toggles a class on `<html>`, and "system" means *forget the choice* rather
 * than *store the word system*, so a reader who picks it follows the operating system afterwards.
 * Two editions implementing that separately is two different behaviours for the same three buttons,
 * and the bug is invisible until someone changes their OS theme.
 *
 * It is `applyColorScheme` and not `applyTheme` because `theme-config.ts` already owns that name for
 * a different job: applying a `ThemeConfig`'s token values as CSS custom properties. Light, dark and
 * system is the **colour scheme**, which is one class on `<html>`, and the barrel refused to compile
 * two `applyTheme`s, which is how the confusion got a name instead of a bug.
 *
 * The preference lists live here rather than in an app because they are the same product decision in
 * every edition: what clicking a record name does, whether a saved row flashes, and whether a delete
 * asks first. `apps/web/reactjs/lib/app-config.ts` re-exports them rather than declaring its own, so
 * there is one list and not a third copy.
 *
 * The first version of these lists was written from a partial reading of the React app's and was
 * **two rows short**, which made "confirm before deleting" unreachable in the Vue edition while
 * `coercePreference` still handled its value. That is the tell worth remembering: a coercion for a
 * key no list offers means the list is the thing that is wrong.
 */
export type ThemeChoice = "light" | "dark" | "system";
/** Three choices, each with a glyph key. A component cannot cross the boundary; a string can. */
export declare const THEME_OPTIONS: readonly {
    value: ThemeChoice;
    label: string;
    icon: string;
}[];
export declare const THEME_STORAGE_KEY = "theme";
/**
 * Put the choice into effect.
 *
 * `system` **removes** the stored value rather than storing the word, which is what makes the
 * operating system's own preference win from then on. Storage can throw in a private window, and a
 * theme switch is not worth an error dialog, so that failure is swallowed deliberately.
 */
export declare function applyColorScheme(theme: ThemeChoice, root: HTMLElement, storage?: Storage): void;
/**
 * The three keys the behaviour section holds.
 *
 * A union rather than `string`, because the React app indexes its `BehaviourConfig` with it and a
 * widened key turns that into an implicit `any`. The list and the config agree by construction.
 */
export type BehaviourPreferenceKey = "rowClick" | "flashMs" | "confirmDelete";
export interface PreferenceField {
    key: BehaviourPreferenceKey;
    label: string;
    hint: string;
    options: readonly {
        value: string;
        label: string;
    }[];
}
export declare const DATA_TABLE_PREFERENCES: readonly PreferenceField[];
/** The `VuiConfig` section these preferences live under. One name, so neither edition guesses. */
export declare const PREFERENCE_SECTION: "behaviour";
/**
 * A `<Select>` hands back a string; the config wants the real type.
 *
 * Per key, and shared, because storing `"1600"` where a number is expected is a preference that
 * reads back as set and behaves as unset. React coerces `flashMs` to a number and `confirmDelete` to
 * a boolean inline; this is the same three branches with one owner.
 */
export declare function coercePreference(key: string, value: string): string | number | boolean;
export declare const NOTIFICATION_PREFERENCES: readonly {
    key: string;
    label: string;
    hint: string;
}[];
export declare const SETTINGS_COPY: {
    readonly title: "Settings";
    readonly sections: {
        readonly profile: {
            readonly title: "Profile";
            readonly description: "Your personal information.";
        };
        readonly appearance: {
            readonly title: "Appearance";
            readonly description: "Choose how the app looks.";
        };
        readonly notifications: {
            readonly title: "Notifications";
            readonly description: "Pick what you want to hear about.";
        };
        readonly dataTable: {
            readonly title: "Data tables";
            readonly description: "How record lists behave for you. Saved to this browser, and only these are yours to change: the rest of the layout is the app's.";
        };
        readonly theme: {
            readonly title: "Theme";
            readonly description: "The tokens every edition of this product reads.";
        };
    };
    readonly reset: "Reset to defaults";
    readonly fields: {
        readonly name: "Name";
        readonly email: "Email";
        readonly role: "Role";
        readonly logo: "Logo";
    };
};
export declare const ROLE_OPTIONS: readonly [{
    readonly value: "administrator";
    readonly label: "Administrator";
}, {
    readonly value: "manager";
    readonly label: "Manager";
}, {
    readonly value: "viewer";
    readonly label: "Viewer";
}];
/** The profile this demo opens with, so a screenshot of one edition is a screenshot of the other. */
export declare const DEMO_PROFILE: {
    readonly name: "Admin User";
    readonly email: "admin@viliha.example";
    readonly role: "administrator";
};
