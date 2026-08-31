<script setup lang="ts">
import { HEADER_CONTROL, PAGE_HEADER, cn } from "@viliha/vui-core";
import { Button, Input, Kbd } from "@viliha/vui-vue";
import { onMounted, onUnmounted, ref } from "vue";

import AccountMenu from "./AccountMenu.vue";
import NavIcon from "./NavIcon.vue";
import Notifications from "./Notifications.vue";
import ThemeToggle from "./ThemeToggle.vue";

/**
 * The top bar: the sidebar toggle, a command search, and the three right-hand controls.
 *
 * **Every control here does what it looks like it does.** This bar shipped with three that did not: a
 * `⌘K` badge with no listener, a bell with no panel, and a `<span>` where the account menu belongs, so
 * the Vue demo had no sign-out at all. React's `header.tsx` states the standard in the same diff, which
 * is the part that stings: "A badge advertising a shortcut that does nothing is worse than no badge",
 * and "Both of these were buttons that did nothing." The port copied the appearance and left the
 * sentences behind.
 *
 * The collapse control is a `Button variant="outline" size="icon"`, as React's is, not a circle wearing
 * `HEADER_CONTROL`: the same control drawn two ways across two editions is the drift this demo exists to
 * disprove. `HEADER_CONTROL` is still right for the bell, which *is* a circle in the reference.
 */
defineProps<{ collapsed: boolean }>();
defineEmits<{ toggle: [] }>();

const searchFocused = ref(false);

/**
 * The shortcut the badge advertises.
 *
 * Focuses the field rather than opening a palette, because that is what the badge sits on: the command
 * *palette* is a separate component and this is a search field, so the hint promises exactly what it
 * delivers. `metaKey || ctrlKey` so it works on both platforms, and `preventDefault` because Firefox
 * binds ⌘K to its own search bar.
 */
function onKey(event: KeyboardEvent) {
  if (event.key.toLowerCase() !== "k" || !(event.metaKey || event.ctrlKey)) return;
  event.preventDefault();
  document.getElementById("free-demo-search")?.focus();
}
onMounted(() => window.addEventListener("keydown", onKey));
onUnmounted(() => window.removeEventListener("keydown", onKey));
</script>

<template>
  <header :class="cn(PAGE_HEADER, 'sticky top-0 z-30 h-16 justify-start bg-card lg:h-[76px] lg:px-6')">
    <!--
      One icon that rotates, not two that swap: `pin-left` is an arrow into a bar on the left, the set's
      nearest thing to a panel closing leftwards, and turned 180 degrees it is the same arrow pointing
      out. 44px, which is what every control on the reference's header row measures and also the smallest
      comfortable touch target.
    -->
    <Button
      variant="outline"
      size="icon"
      class="size-10 lg:size-11"
      :aria-expanded="!collapsed"
      :aria-label="collapsed ? 'Expand the sidebar' : 'Collapse the sidebar'"
      @click="$emit('toggle')"
    >
      <NavIcon
        name="pin-left"
        :class="cn('transition-transform duration-300 ease-in-out', collapsed && 'rotate-180')"
      />
    </Button>

    <!-- Measured: `h-11 rounded-lg pl-12 pr-14 text-sm`, and `xl:max-w-[430px]` rather than stretching
         to fill, so the header keeps its right cluster where the reference has it. -->
    <div class="relative hidden flex-1 md:block xl:max-w-[430px]">
      <NavIcon
        name="search"
        class="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        id="free-demo-search"
        type="search"
        placeholder="Search or type command..."
        aria-label="Search"
        class="h-11 rounded-lg pl-12 pr-14"
        @focus="searchFocused = true"
        @blur="searchFocused = false"
      />
      <Kbd
        :class="
          cn(
            'pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transition-opacity',
            searchFocused && 'opacity-0',
          )
        "
      >
        ⌘K
      </Kbd>
    </div>

    <!-- `gap-2 sm:gap-3`, which is the reference's `gap-2 2xsm:gap-3`. -->
    <div class="ml-auto flex items-center gap-2 sm:gap-3">
      <ThemeToggle />
      <Notifications />
      <AccountMenu />
    </div>
  </header>
</template>
