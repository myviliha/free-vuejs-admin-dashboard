import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { DEMO_ICON_PATHS, FREE_ROUTES } from "@viliha/vui-core";
import { expect, it } from "vitest";

import { NAV, NAV_HREFS } from "./src/nav";
import { SCREENS, TITLES, titleOf } from "./src/screens";

/**
 * The route list, the screen map and the sidebar, held against each other in **every** direction.
 *
 * `FREE_ROUTES` is derived from `FREE_NAV` in `@viliha/vui-core`, so the addresses and the sidebar
 * cannot disagree by construction. What this file adds is the third side of the triangle: that this
 * edition has something to render at each of them. A route with no screen is a blank page, and a screen
 * with no route is a file nobody can reach; both survive a screenshot.
 */
const HERE = dirname(fileURLToPath(import.meta.url));

it("the shared route list is not empty, so the comparisons below mean something", () => {
  expect(FREE_ROUTES.length).toBeGreaterThan(15);
});

it("every route resolves to a screen, with nothing waived", () => {
  // **`SCREENS` is total over `FREE_ROUTES` and there is no second table.** There was an `UNBUILT` map
  // and a `PlaceholderScreen` for routes an edition had not ported; it was empty, so its branch in
  // `App.vue` was unreachable and this file waived the placeholder file by name to stay green. All
  // nineteen are ported, so the honest assertion is the unconditional one.
  for (const route of FREE_ROUTES) {
    expect(Boolean(SCREENS[route]), `${route} resolves to nothing`).toBe(true);
  }
});

it("the map invents no route", () => {
  // The other direction, and the one a screen count cannot see: a screen mapped to an address the free
  // tier does not have is a file nobody reaches.
  for (const route of Object.keys(SCREENS)) expect(FREE_ROUTES, route).toContain(route);
});

it("every screen file in the folder is mapped", () => {
  /**
   * Written to catch the failure mode this app is most likely to have next.
   *
   * Adding a screen is two edits, the file and the map, and forgetting the second leaves a component
   * that compiles, type-checks and is unreachable.
   *
   * **Nothing is exempt.** There was a `NOT_ROUTED` set here holding one filename, and that waiver was
   * the only thing keeping a dead component and its unreachable branch in the tree. An exemption list
   * on a completeness test is where dead code goes to look accounted for, so if this ever needs one
   * again, the entry has to say why the file exists at all.
   */
  const files = readdirSync(join(HERE, "src", "screens")).filter((f) => f.endsWith(".vue"));
  expect(files.length).toBeGreaterThan(10);
  const mapped = new Set(
    Object.values(SCREENS).map((component) => (component as { __name?: string }).__name),
  );
  for (const file of files) {
    expect(mapped, `${file} is not in SCREENS`).toContain(file.replace(/\.vue$/, ""));
  }
});

it("every sidebar entry names an icon this edition can actually draw", () => {
  // `NavIcon` reads `DEMO_ICON_PATHS`, so an icon name with no markup renders an empty `<svg>`: a row
  // that is present, sized, and invisible. Three of the ten were missing when the nav moved here.
  for (const entry of NAV.flatMap((group) => group.entries)) {
    expect(DEMO_ICON_PATHS[entry.icon], `${entry.label} (${entry.icon})`).toBeTruthy();
  }
});

it("the sidebar's hrefs are all real routes", () => {
  for (const href of NAV_HREFS) expect(FREE_ROUTES, href).toContain(href);
});

it("every route has a title, and the template is applied", () => {
  /**
   * **This edition shipped one static title for all nineteen screens**, set in `index.html` and never
   * changed, so every tab read the same thing. Nothing in the markup or the types could show that:
   * only holding the title map against the route list can.
   */
  for (const route of FREE_ROUTES) {
    expect(TITLES[route], `${route} has no title`).toBeTruthy();
  }
  for (const route of Object.keys(TITLES)) expect(FREE_ROUTES, route).toContain(route);
  expect(titleOf("Alerts")).toBe("Alerts \u00b7 VuiAdmin free");
  expect(titleOf(undefined)).toBe("VuiAdmin free");
});
