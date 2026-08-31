import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { DEMO_ACCOUNT_LINKS, DEMO_ICON_PATHS, SHELL_LAYOUTS } from "@viliha/vui-core";
import { describe, expect, it } from "vitest";

const here = dirname(fileURLToPath(import.meta.url));
const SHELL = readFileSync(join(here, "src", "AppShell.vue"), "utf8");
const FOOTER = readFileSync(join(here, "src", "Footer.vue"), "utf8");
const CHROME = ["Header.vue", "AccountMenu.vue", "Notifications.vue", "AppShell.vue", "Brand.vue"]
  .map((file) => readFileSync(join(here, "src", file), "utf8"))
  .join("\n");

/**
 * Every assertion `apps/web/free-react/shell-rail.test.ts` holds, against this shell's source, plus the
 * ones this edition needs on its own.
 *
 * **Not a copy for the sake of symmetry.** Each ported case is a defect the React shell shipped and was
 * fixed in, and every one of them is expressible in Vue: the six layouts are shared data, so the shell
 * that reads them can get the same things wrong. A port inherits a component's behaviour and none
 * of the tests that pinned it, which is how the second edition of a fixed bug gets written.
 *
 * Source text rather than a mounted render, matching React's, and for the same reason: what is being
 * pinned is *the condition*. A render can pass while the condition is `layout.navIcons` alone, as long
 * as the layout under test happens to set it.
 */
describe("the Vue shell's collapsed sidebar", () => {
  it("renders icons whenever it is a rail, not only when the layout asks for them", () => {
    // Three of six layouts drop icons from the expanded list on purpose. A rail has room for nothing
    // else, so reading that same flag for the rail collapsed them to a column of empty rows.
    // **Re-expressed when the rail gained its own branch** (`PD-116`), the same way React's was. A
    // leaf row still asks `rail || layout.navIcons` because one element renders both states; a group
    // row does not, because `v-else-if="rail"` returns a flyout whose trigger is the icon alone, and
    // the expanded branch after it is only ever reached without a rail. The invariant is that **no
    // rail rendering consults `navIcons`**.
    expect(SHELL).toContain('v-if="rail || layout.navIcons"');
    const railBranch = SHELL.slice(
      SHELL.indexOf('v-else-if="rail"'),
      SHELL.indexOf("</DropdownMenu>"),
    );
    expect(railBranch).not.toContain("navIcons");
    expect(railBranch).toContain('<NavIcon :name="entry.icon"');
  });

  it("there is a layout this actually matters for", () => {
    // Without one, the assertion above is guarding nothing.
    expect(SHELL_LAYOUTS.filter((l) => !l.navIcons).length).toBeGreaterThan(0);
  });

  it("every layout closes with the licence strip", () => {
    expect(SHELL_LAYOUTS.every((l) => l.footer === "compact")).toBe(true);
    expect(SHELL).toContain("layout.footer === 'compact'");
  });

  it("the strip sits at the bottom of a short page rather than under the last card", () => {
    // `mt-auto` inside the shell's `flex flex-col` scroll column. React's footer has always carried it
    // and this one did not, so `/blank` and `/profile` ended with the licence floating mid-viewport.
    //
    // **The binding, not the file.** `toContain("mt-auto")` passed with the class deleted, because the
    // footer's own docblock explains why `mt-auto` is there. A guard in this repo has already read
    // `PARITY_ROUTES` out of a comment once (`PD-096`); prose that argues for a rule reads exactly like
    // the rule to a substring match, so the match has to name the syntax that makes it take effect.
    expect(FOOTER).toMatch(/:class="cn\(SITE_FOOTER, ['"]mt-auto['"]\)"/);
    expect(SHELL).toMatch(/PAGE_SCROLL, ['"]flex flex-col/);
  });

  it("asks the shared core for its width rather than working it out again", () => {
    // **What changed and why** (`PD-228`). This asserted the literal
    // `"isRail(layout.value) ? layout.value.width"`, a copy of the same expression React carried,
    // and the two editions being byte-similar was the only thing keeping them in step. The
    // behaviour now lives in `console-shell-core` and is tested once there, across every layout
    // preset; what this edition still has to prove is that it *asks*, which a behaviour test in
    // another package cannot say.
    expect(SHELL).toContain("sidebarWidth(layout.value, collapsed.value)");
    expect(SHELL, "the rail must come from the core too").toContain(
      "isRailShowing(layout.value, collapsed.value)",
    );
  });

  it("takes every group holding the route from the core, not the first one it finds", () => {
    // The divergence this rewire closed: the watcher used `.find()` and opened one holder, where
    // React's seed used `.filter()` and opened every one. A route linked from two groups behaved
    // differently in Vue than in React, and no test in either edition could see it.
    expect(SHELL).toContain("initialOpen(NAV, to)");
    // Lazy and newline-crossing, because the first version could not match the code it forbids:
    // `[^)]*` stops at the `)` of `(group)` in `NAV.flatMap((group) => group.entries).find(`, so
    // pasting the old search back left this green. Checked by running it against the pre-change file
    // rather than by reading it.
    expect(SHELL, "no second copy of the holder search").not.toMatch(
      /NAV\.flatMap\([\s\S]*?\.find\(/,
    );
  });

  it("every icon the chrome names is one this edition can actually draw", () => {
    // `NavIcon` looks the name up in `DEMO_ICON_PATHS` and renders an empty `<svg>` when it misses: a
    // control that is present, sized, focusable and invisible. `routes.test.ts` covers the sidebar's
    // ten; the header, the account menu and the brand name nine more, and four of those went into the
    // icon table in this same change. Read out of the source so a new `<NavIcon name="...">` is covered
    // the moment it is written, rather than when someone remembers to list it here.
    const named = [...CHROME.matchAll(/name="([a-z0-9-]+)"/g)].flatMap((m) => m[1] ?? []);
    expect(named.length).toBeGreaterThan(4);
    for (const name of new Set(named)) {
      expect(DEMO_ICON_PATHS[name], `<NavIcon name="${name}"> has no glyph`).toBeTruthy();
    }
    // The account rows carry their icon as data rather than as markup, so they need the same check and
    // the regex above cannot see them.
    for (const link of DEMO_ACCOUNT_LINKS) {
      expect(DEMO_ICON_PATHS[link.icon], `${link.label} (${link.icon})`).toBeTruthy();
    }
  });

  it("a group in the rail opens a flyout, rather than toggling state nothing renders", () => {
    /**
     * The same defect as React's, ported with it and fixed with it (`PD-116`). Seven of ten rail rows
     * were buttons that toggled `open` while `<Submenu v-if="!rail">` rendered nothing, so six of the
     * nineteen pages were unreachable without expanding the sidebar.
     *
     * The branch, not the appearance: a rail looks the same in a screenshot either way.
     */
    //
    // **Scoped to the branch, not the file.** `toContain('side="right"')` passed with the attribute
    // deleted, because the docblock above the branch explains why `side="right"` is native in Reka.
    // Prose arguing for a rule reads exactly like the rule to a substring match, and this repository
    // writes long docblocks by policy: `PD-096`, then `PD-104`, and now this. Third time.
    const flyout = SHELL.slice(SHELL.indexOf('v-else-if="rail"'), SHELL.indexOf("</DropdownMenu>"));
    expect(flyout).toContain("<DropdownMenuTrigger");
    expect(flyout).toContain('side="right"');
    // **`DropdownMenuItem`, not a bare anchor with `role="menuitem"`.** Reka registers close-on-select
    // and arrow-key focus through that primitive's Collection, and a hand-rolled role attribute is
    // invisible to it: measured, the panel navigated and then sat open over the new page (`PD-118`).
    expect(flyout).toContain("<DropdownMenuItem as-child");
    expect(flyout).not.toMatch(/<a[^>]*\srole="menuitem"/);
    expect(SHELL).not.toMatch(/<Submenu v-if="!rail"/);
  });
});
