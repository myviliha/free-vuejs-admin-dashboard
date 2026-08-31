/** The current organization: the wanted one if it still exists, else the first. */
export function resolveCurrentId(organizations, wanted) {
    if (wanted && organizations.some((o) => o.id === wanted))
        return wanted;
    return organizations[0]?.id;
}
/** Where the create row points: a handler wins, then this instance's route, then the app's config. */
export function resolveAddTarget(onAdd, addHref, configuredHref) {
    if (onAdd)
        return { onAdd };
    const href = addHref ?? configuredHref;
    return href ? { href } : {};
}
