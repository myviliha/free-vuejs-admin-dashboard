/**
 * Apply a host's `actions` config to the shipped list. An array replaces it; a function receives the
 * defaults and returns the list it wants.
 */
export function resolveFormActions(defaults, config) {
    if (!config)
        return defaults;
    return typeof config === "function" ? config(defaults) : config;
}
/**
 * What the form does after a successful save: the acting button's `after` if it named one, otherwise
 * `behaviour.closeOnSave`. One helper so the form and the table cannot disagree about it.
 */
export function saveOutcome(after, behaviour) {
    return after ?? ((behaviour?.closeOnSave ?? true) ? "close" : "stay");
}
/** An action validates first when it says so, and by default when it is primary. */
export const actionRequiresValid = (action) => action.requiresValid ?? action.variant === "primary";
/**
 * The footer buttons the theme ships: Cancel + Save while editing, Close + Edit while viewing. They are
 * ordinary {@link FormAction}s, which is the point — a host changes them with the same API that builds
 * them, and anything it does not mention keeps working.
 *
 * **The four icons are injected rather than imported**, which is the only reason this could not live
 * here before. Each edition passes its own components, and an edition whose footer takes the icon as a
 * slot passes none: the ids, the labels, the variants and — the part that matters — which action
 * validates and commits are then the same list in both, rather than two lists that agree today.
 */
export function defaultFormActions({ readOnly, canEdit, icons = {}, }) {
    // These return `false` ("I handled it") so the caller does not close on top of what they already
    // did. Save is the exception: it returns nothing, which is what makes the caller commit the draft
    // and close.
    if (readOnly) {
        const actions = [
            {
                id: "close",
                label: "Close",
                icon: icons.close,
                onAct: (ctx) => {
                    ctx.close();
                    return false;
                },
            },
        ];
        if (canEdit)
            actions.push({
                id: "edit",
                label: "Edit",
                icon: icons.edit,
                variant: "primary",
                // Switching to edit keeps the form open, and edits nothing yet.
                requiresValid: false,
                onAct: (ctx) => {
                    ctx.edit?.();
                    return false;
                },
            });
        return actions;
    }
    return [
        {
            id: "cancel",
            label: "Cancel",
            icon: icons.cancel,
            onAct: (ctx) => {
                ctx.close();
                return false;
            },
        },
        { id: "save", label: "Save", icon: icons.save, variant: "primary", onAct: () => { } },
    ];
}
