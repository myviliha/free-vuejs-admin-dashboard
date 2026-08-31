<script setup lang="ts">
import { BADGE_VARIANTS } from "@viliha/vui-core";
import { Badge } from "@viliha/vui-vue";

import Demo from "../Demo.vue";
import NavIcon from "../NavIcon.vue";
import PageHeader from "../PageHeader.vue";

/**
 * Every tone in both families, with the icon in either position: six cards, as the reference has.
 *
 * The tones are read from the component, never listed. The React page named four when `Badge` shipped
 * seven, so the demo understated the library it advertises; reading `BADGE_VARIANTS` makes that
 * impossible in both directions. The `solid` family arrived with `PD-085`: the variant table used to
 * conflate colour with fill, so "solid success" could not be asked for.
 */
const TONES = Object.keys(BADGE_VARIANTS) as (keyof typeof BADGE_VARIANTS)[];
const label = (tone: string) => `${tone[0]?.toUpperCase()}${tone.slice(1)}`;

const ROWS = [
  { title: "With Light Background", solid: false, icon: undefined },
  { title: "With Solid Background", solid: true, icon: undefined },
  { title: "Light Background with Left Icon", solid: false, icon: "start" },
  { title: "Solid Background with Left Icon", solid: true, icon: "start" },
  { title: "Light Background with Right Icon", solid: false, icon: "end" },
  { title: "Solid Background with Right Icon", solid: true, icon: "end" },
] as const;
</script>

<template>
  <PageHeader title="Badges" />
  <Demo v-for="row in ROWS" :key="row.title" :title="row.title">
    <div class="flex flex-wrap gap-4 sm:items-center sm:justify-center">
      <Badge v-for="tone in TONES" :key="tone" :variant="tone" :solid="row.solid" size="md">
        <NavIcon v-if="row.icon === 'start'" name="plus" class="size-3.5" />
        {{ label(tone) }}
        <NavIcon v-if="row.icon === 'end'" name="plus" class="size-3.5" />
      </Badge>
    </div>
  </Demo>
</template>
