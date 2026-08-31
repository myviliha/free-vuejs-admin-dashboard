<script setup lang="ts">
import { computed, watchEffect } from "vue";

import AppShell from "./AppShell.vue";
import RouteProgress from "./RouteProgress.vue";
import { found, path } from "./router";
import NotFoundScreen from "./screens/NotFoundScreen.vue";
import { SCREENS, TITLES, titleOf } from "./screens";

/**
 * The root: pick a screen, and decide whether it goes inside the shell.
 *
 * **There is no placeholder branch.** There was one, over an `UNBUILT` table that was empty, so both
 * `v-else` arms were unreachable and `routes.test.ts` carried a `NOT_ROUTED` exemption naming the
 * placeholder file, which is what stopped anyone noticing. A dead branch and a test exemption that
 * hides it are the same defect twice: the exemption is the tell. All nineteen routes are ported, so
 * `SCREENS` is total over `FREE_ROUTES` and the test asserts exactly that with nothing waived. When an
 * edition does have an unported route, the table it needs is fifteen lines and belongs in that
 * edition's `screens.ts`, not kept warm here.
 */

/**
 * The routes that render **without** the shell.
 *
 * The two authentication screens, because a sign-in page offering navigation is offering a way around
 * itself, and the not-found screen, because a 404 wrapped in working navigation implies the navigation
 * is trustworthy on a page that just failed to resolve an address. This mirrors the React demo's route
 * groups, where the same three sit outside `(shell)`.
 */
const FULL_WIDTH = new Set(["/signin", "/signup", "/error-404"]);

/**
 * The document title, keyed on the address.
 *
 * One effect rather than a line in nineteen screens: the title is a property of the route, and
 * `TITLES` is where the routes are. `watchEffect` runs once immediately and then on every change to
 * `path`, which is exactly the two moments the title has to be right.
 */
watchEffect(() => {
  document.title = titleOf(TITLES[path.value]);
});

const screen = computed(() => SCREENS[path.value]);
const bare = computed(() => FULL_WIDTH.has(path.value));
</script>

<template>
  <RouteProgress />
  <NotFoundScreen v-if="!found" />
  <component :is="screen" v-else-if="bare" />
  <AppShell v-else>
    <component :is="screen" />
  </AppShell>
</template>
