<script setup lang="ts">
import {
  DEMO_ACCOUNT_LINKS,
  DEMO_USER,
  HEADER_PANEL_OFFSET,
  MENU_ROW,
  cn,
} from "@viliha/vui-core";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@viliha/vui-vue";
import { ref } from "vue";

import { to } from "./router";

import NavIcon from "./NavIcon.vue";

/**
 * The account menu, ported from `apps/web/free-react/app/account-menu.tsx`.
 *
 * It was a `<span>` holding an avatar and a name, so **the Vue demo had no sign-out affordance at
 * all**: the one place a reader looks to leave an admin app was decoration.
 *
 * The panel is 260px wide with the person's name and address at the top, three links, a rule, and Sign
 * out below it. All four point at `/profile` or `/signin`, which is honest about a demo having one
 * screen behind them rather than inventing routes that 404.
 *
 * The chevron turns with the panel, and `v-model:open` is what makes that true rather than a local flag
 * that would drift the moment the panel closed on an outside click. A chevron that does not turn is
 * worse than no chevron.
 */
const open = ref(false);
</script>

<template>
  <DropdownMenu v-model:open="open">
    <!-- No border, no background, no radius: the avatar is the control's whole visual weight. -->
    <DropdownMenuTrigger
      bare
      class="flex items-center text-foreground/80"
      aria-label="Account menu"
    >
      <!--
        An illustration, not a photograph, with the initials still beneath it. The reference uses a
        picture of a real person, which dates, has to be licensed by whoever redistributes the download,
        and sits on a buyer's product until they change it. `DEMO_USER` is the one identity, shared with
        React, so this and the profile card cannot disagree.
      -->
      <Avatar class="mr-3 size-11">
        <AvatarImage :src="DEMO_USER.photo" alt="" />
        <AvatarFallback class="text-sm font-medium">{{ DEMO_USER.initials }}</AvatarFallback>
      </Avatar>
      <span class="mr-1 hidden text-sm font-medium sm:inline">{{ DEMO_USER.name }}</span>
      <NavIcon
        name="chevron-down"
        :class="cn('size-4 transition-transform duration-200', open && 'rotate-180')"
      />
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" :side-offset="HEADER_PANEL_OFFSET" class="w-[260px] p-3">
      <div class="px-1">
        <p class="text-sm font-medium">{{ DEMO_USER.name }}</p>
        <p class="mt-0.5 text-xs text-muted-foreground">{{ DEMO_USER.email }}</p>
      </div>
      <ul class="flex flex-col gap-1 border-b border-border pt-4 pb-3">
        <li v-for="link in DEMO_ACCOUNT_LINKS" :key="link.label">
          <a :href="to(link.href)" :class="MENU_ROW" role="menuitem">
            <NavIcon :name="link.icon" class="size-5 text-muted-foreground" />
            {{ link.label }}
          </a>
        </li>
      </ul>
      <a :href="to('/signin')" :class="cn(MENU_ROW, 'mt-3')" role="menuitem">
        <NavIcon name="log-out" class="size-5 text-muted-foreground" />
        Sign out
      </a>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
