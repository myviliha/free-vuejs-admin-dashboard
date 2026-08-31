<script setup lang="ts">
import { AVATAR_SIZES, AVATAR_STATUS_TONES } from "@viliha/vui-core";
import { Avatar, AvatarFallback, AvatarImage } from "@viliha/vui-vue";

import Demo from "../Demo.vue";
import PageHeader from "../PageHeader.vue";

/**
 * Six sizes, and presence in every state the component knows.
 *
 * Five cards where the reference has four, because it offers three presence states and this offers
 * four: `away` became expressible when `PD-066` made `--info` a token.
 *
 * A supplied illustration rather than a stock photograph, with the initials still underneath. Theirs is
 * a real person's face, which dates, has to be licensed by whoever redistributes the download, and sits
 * on a buyer's product until they remember to change it.
 */
const SIZES = Object.keys(AVATAR_SIZES) as (keyof typeof AVATAR_SIZES)[];
const STATES = Object.keys(AVATAR_STATUS_TONES) as (keyof typeof AVATAR_STATUS_TONES)[];

/** The initials shrink with the circle: two characters at 24px need to be smaller than at 64px. */
const TEXT: Record<(typeof SIZES)[number], string> = {
  xs: "text-[9px]",
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
  xl: "text-base",
  "2xl": "text-lg",
};

const label = (state: string) => `${state[0]?.toUpperCase()}${state.slice(1)}`;
</script>

<template>
  <PageHeader title="Avatar" />
  <Demo title="Default Avatar" description="The six steps, 24px through 64px.">
    <div class="flex flex-col items-center justify-center gap-5 sm:flex-row">
      <Avatar v-for="size in SIZES" :key="size" :size="size">
        <AvatarImage src="/images/user/avatar.svg" alt="" />
        <AvatarFallback :class="TEXT[size]">JD</AvatarFallback>
      </Avatar>
    </div>
  </Demo>
  <Demo v-for="state in STATES" :key="state" :title="`Avatar with ${label(state)} Indicator`">
    <div class="flex flex-col items-center justify-center gap-5 sm:flex-row">
      <Avatar v-for="size in SIZES" :key="size" :size="size" :status="state">
        <AvatarImage src="/images/user/avatar.svg" alt="" />
        <AvatarFallback :class="TEXT[size]">JD</AvatarFallback>
      </Avatar>
    </div>
  </Demo>
</template>
