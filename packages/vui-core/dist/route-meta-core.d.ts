/**
 * Route to label, colour and breadcrumb trail, shared by every edition's demo.
 *
 * This was `apps/web/reactjs/app/_components/route-meta.ts`. It moved for the same reason the
 * navigation tree did (`CR-VP-001`, `V3`): a breadcrumb that reads "Organizations" in one demo and
 * "organizations" in another is two products, and the logic here is the sort that is easy to
 * reimplement slightly differently. Framework-free already, so the move was a rename.
 *
 * Route → display label + brand color, mirroring the sidebar navigation.
 * Powers the breadcrumb trail and the colored page-title icon. */
export declare const SEGMENT_LABELS: Record<string, string>;
/** Full pathname → icon color (Tailwind text-* class). */
export declare const ROUTE_COLORS: Record<string, string>;
/** Full pathname → raw accent color (drives the --page-accent CSS variable so
 * shared components like tables can tint their icons per module). */
export declare const ROUTE_ACCENT: Record<string, string>;
export declare function accentFor(pathname: string): string;
export declare function labelFor(segment: string): string;
export declare function colorFor(pathname: string): string;
export type Crumb = {
    label: string;
    href: string;
    isLast: boolean;
};
/** Build a breadcrumb trail (always rooted at Home) from a pathname. */
export declare function crumbsFor(pathname: string): Crumb[];
