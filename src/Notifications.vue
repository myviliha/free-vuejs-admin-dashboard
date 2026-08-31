<script setup lang="ts">
import {
  DEMO_NOTIFICATIONS,
  HEADER_CONTROL,
  HEADER_PANEL_OFFSET,
  cn,
  initialsOf,
} from "@viliha/vui-core";
import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@viliha/vui-vue";
import { ref } from "vue";

import { to } from "./router";

import NavIcon from "./NavIcon.vue";

/**
 * The notification panel, ported from `apps/web/free-react/app/notifications.tsx`.
 *
 * It was a `<button aria-label="Notifications">` with no handler and no panel: a control that looks
 * interactive and is not is the first thing a reader clicks and the first thing that disappoints them.
 * React's own comment in this same diff says so, and the port had shipped the button without it.
 *
 * A titled header with a rule under it, a scrolling list, and a full-width link at the foot. Each row
 * is an avatar with a presence dot, a sentence where the actor and the subject are emphasised and the
 * verb is not, then a muted `Project · 5 min ago` line. The rows come from `DEMO_NOTIFICATIONS` so the
 * two editions cannot disagree about the inbox.
 *
 * **Reka's primitives, not React's `Dropdown` wrapper.** `@viliha/vui-vue` ships the parts rather than
 * the convenience component, and `v-model:open` is what lets the panel's own X close it: an X that does
 * not close is worse than no X.
 */
const open = ref(false);
</script>

<template>
  <DropdownMenu v-model:open="open">
    <DropdownMenuTrigger
      bare
      :class="HEADER_CONTROL"
      :aria-label="`Notifications, ${DEMO_NOTIFICATIONS.length} unread`"
    >
      <NavIcon name="bell" class="size-5" />
      <!-- Decorative: the count is in the trigger's accessible name above. `theme.css` clamps every
           animation under `prefers-reduced-motion`, so the pulse is already covered. -->
      <span
        aria-hidden="true"
        class="absolute top-0.5 right-0 z-10 flex size-2 rounded-full bg-warning"
      >
        <span
          class="absolute inline-flex size-full animate-ping rounded-full bg-warning opacity-75"
        />
      </span>
    </DropdownMenuTrigger>

    <!-- A fixed 480px tall panel at 350px wide, rising to 361 at `sm`. The height is fixed on purpose
         so the list scrolls inside a stable panel rather than the panel growing with the inbox. -->
    <DropdownMenuContent
      align="end"
      :side-offset="HEADER_PANEL_OFFSET"
      class="flex h-[480px] w-[350px] flex-col p-3 sm:w-[361px]"
    >
      <div class="mb-3 flex items-center justify-between border-b border-border pb-3">
        <h5 class="text-lg font-semibold">Notification</h5>
        <button
          type="button"
          aria-label="Close notifications"
          class="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
          @click="open = false"
        >
          <NavIcon name="close" class="size-5" />
        </button>
      </div>

      <!-- `h-auto overflow-y-auto` inside a fixed-height panel is what makes the list the part that
           scrolls. `vui-scroll` is the theme's own thin scrollbar. -->
      <ul class="vui-scroll flex h-auto flex-col overflow-y-auto">
        <li v-for="item in DEMO_NOTIFICATIONS" :key="item.name">
          <a
            :href="to('/blank')"
            role="menuitem"
            class="flex gap-3 rounded-lg border-b border-border px-[18px] py-3 transition-colors hover:bg-accent"
          >
            <span class="relative block size-10 shrink-0">
              <Avatar class="size-10">
                <AvatarFallback class="text-xs">{{ initialsOf(item.name) }}</AvatarFallback>
              </Avatar>
              <span
                aria-hidden="true"
                :class="
                  cn(
                    'absolute right-0 bottom-0 z-10 size-2.5 rounded-full border-[1.5px] border-card',
                    item.online ? 'bg-success' : 'bg-destructive',
                  )
                "
              />
              <span class="sr-only">{{ item.online ? "Online" : "Offline" }}</span>
            </span>

            <span class="block">
              <span class="mb-1.5 block space-x-1 text-sm text-muted-foreground">
                <span class="font-medium text-foreground">{{ item.name }}</span>
                <span>requests permission to change</span>
                <span class="font-medium text-foreground">Project - Nganter App</span>
              </span>
              <span class="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Project</span>
                <span aria-hidden="true" class="size-1 rounded-full bg-muted-foreground" />
                <span>{{ item.when }}</span>
              </span>
            </span>
          </a>
        </li>
      </ul>

      <!-- A bordered link, not a filled button, as the reference's footer is. -->
      <a
        :href="to('/blank')"
        class="mt-3 block rounded-lg border border-border bg-card px-4 py-2 text-center text-sm font-medium text-foreground/80 transition-colors hover:bg-accent"
      >
        View All Notifications
      </a>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
