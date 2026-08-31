/**
 * The configuration contract, framework-free.
 *
 * `config.tsx` was 525 lines with **sixteen React references**: three type fields and the provider. So
 * it was a framework-free contract wearing a React provider, and the contract is the half both editions
 * need. A host writes one config object and it type-checks against either edition, which is the promise
 * of selling two editions of one system.
 *
 * **Three fields carry a framework value, and each takes one generic with a default.** `FormSlot`'s
 * `render` returns a node, and `IoAction` and `FormAction` carry an icon component. React re-exports
 * each bound to `React.ReactNode` and `React.ComponentType`, so its public API is unchanged; Vue binds
 * its own.
 *
 * This is the correction to wave 4's one failed move as much as it is wave 5's keystone: that attempt
 * invented a structural subset of `FormActionOutcome` without reading it, guessed narrower than the
 * real union, and broke three consumers. **Move the real type with the framework-specific parts
 * generic** is the version that works.
 */
/**
 * The finished theme, as a value. These are the shipped defaults, and the
 * components read them from here rather than keeping their own copies, which is
 * what makes "the preconfigured theme is a config" true rather than a slogan.
 */
/**
 * The theme as shipped.
 *
 * **`satisfies` rather than an annotation**, and that is load-bearing. The preset carries no icons, so
 * pinning its `Icon` parameter makes it unmergeable: `VuiConfig<never>` fails contravariantly against
 * `VuiConfig<unknown>` because the action-list members are functions. Inferring the literal's own type
 * and checking it with `satisfies` keeps it assignable to every edition's binding while still failing
 * the build if a key stops being valid.
 */
export const vuiPreset = {
    behaviour: {
        rowClick: "view",
        closeOnSave: true,
        flashMs: 1600,
        confirmDelete: true,
        confirmDiscardWhenDirty: false,
    },
};
/** Identity helper for authoring a config with full type checking. */
export function defineConfig(config) {
    return config;
}
/** Merge configs left to right; a later object overrides only the keys it sets. */
export function mergeConfig(...configs) {
    const out = {};
    for (const config of configs) {
        if (!config)
            continue;
        for (const [group, values] of Object.entries(config)) {
            if (values == null)
                continue;
            const key = group;
            out[key] = { ...(out[key] ?? {}), ...values };
        }
    }
    return out;
}
export function filterUserPreferences(preferences, userConfigurable) {
    const out = {};
    for (const [group, values] of Object.entries(preferences)) {
        const section = group;
        const keys = userConfigurable[section];
        if (!keys || values == null)
            continue;
        const kept = Object.fromEntries(Object.entries(values).filter(([k]) => keys.includes(k)));
        if (Object.keys(kept).length)
            out[section] = kept;
    }
    return out;
}
