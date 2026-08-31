import { FREE_ROUTES } from "@viliha/vui-core";
import { computed, ref } from "vue";

/**
 * Real paths, in about fifty lines. `/alerts`, not `#/alerts`.
 *
 * **This was a hash router, and the reason it gave was true but not the whole story.** Its docblock
 * argued that history mode "would ask that host to rewrite every unknown path to `index.html`, which
 * is exactly the kind of thing that works locally and 404s once deployed", and closed by admitting
 * "the cost is cosmetic and worth stating: the React demo's links read `/alerts` and these read
 * `#/alerts`". The dev caught that cost on 2026-08-26 and asked why (`PD-124`).
 *
 * The part the argument missed is that **the reference solves the same problem without a hash**.
 * `apps/web/free-react` is a static export too, served from the same `public/preview/` directory, and
 * Next emits one HTML file per route: `alerts.html` is a real file, so a deep link is a file read and
 * not a rewrite. `vite.config.ts` emits the same shape now, so the two editions have **identical**
 * hosting requirements rather than one hash and one rewrite rule, which is one problem to get right
 * instead of two.
 *
 * `FREE_ROUTES` decides what is a route, so an address this app cannot answer falls to the not-found
 * screen rather than rendering a blank shell. That list is derived from the shared sidebar, so the
 * three cannot disagree.
 */
const HOME = "/";

const known = new Set(FREE_ROUTES);

/**
 * Where the app is mounted, without its trailing slash.
 *
 * `/` in development and `/preview/free-vue` in a build, and every route sits under it. Stripping the
 * trailing slash here means `BASE + "/alerts"` composes without producing a double slash, and the one
 * awkward case is the home route, handled at the two call sites below.
 */
const BASE = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

/** The route part of an address: what is left after the base, with any query dropped. */
function routeOf(pathname: string): string {
  const rest = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  // The query is dropped rather than parsed: no screen in the free tier takes one, and inventing a
  // parser for a case that does not exist is the speculative generality `E-03` forbids.
  const path = (rest.split("?")[0] ?? HOME).replace(/\/$/, "");
  return path === "" ? HOME : path;
}

const current = ref(routeOf(globalThis.location?.pathname ?? HOME));

/** The href to put on an anchor. Plain, real, and shareable, which a hash link never quite is. */
export const to = (route: string) => `${BASE}${route === HOME ? "/" : route}`;

export const path = computed(() => current.value);
/** Whether the current address is one this demo answers. The shell renders the 404 screen when not. */
export const found = computed(() => known.has(current.value));

export function go(route: string) {
  if (current.value === route) return;
  globalThis.history.pushState({}, "", to(route));
  current.value = route;
  // A new page starts at the top. The browser does this for a real navigation and not for a pushState.
  globalThis.scrollTo?.({ top: 0 });
}

/**
 * One delegated listener rather than a `<RouterLink>` on every anchor.
 *
 * Every link in this app stays a plain `<a href="/alerts">`, which is what makes it work with the
 * middle mouse button, with a modifier held, in a right-click menu and when JavaScript has not run
 * yet. A component wrapper would have to reimplement all four, and the three editions of this demo
 * would each reimplement them differently.
 *
 * The guards are the whole substance: anything that is not a plain left click on a same-origin link
 * this app knows about is left to the browser.
 */
if (globalThis.addEventListener) {
  globalThis.addEventListener("popstate", () => {
    current.value = routeOf(globalThis.location.pathname);
  });

  globalThis.addEventListener("click", (event) => {
    const mouse = event as MouseEvent;
    if (mouse.defaultPrevented || mouse.button !== 0) return;
    if (mouse.metaKey || mouse.ctrlKey || mouse.shiftKey || mouse.altKey) return;

    const anchor = (mouse.target as Element | null)?.closest?.("a");
    if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
    // `href` is the resolved absolute URL, so a cross-origin link is caught here rather than by
    // inspecting the attribute, which may be relative.
    const url = new URL(anchor.href, globalThis.location.href);
    if (url.origin !== globalThis.location.origin) return;

    const route = routeOf(url.pathname);
    if (!known.has(route)) return;

    mouse.preventDefault();
    go(route);
  });
}
