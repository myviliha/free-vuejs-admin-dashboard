<script setup lang="ts">
import { VIDEO_RATIOS } from "@viliha/vui-core";
import { VideoEmbed } from "@viliha/vui-vue";

import Demo from "../Demo.vue";
import PageHeader from "../PageHeader.vue";

/**
 * The four aspect ratios, in the reference's two-column arrangement.
 *
 * **`VideoEmbed` loads nothing until it is clicked**, which is the improvement over the reference:
 * theirs renders a YouTube `<iframe>` on mount, four of them on this page, which is four third-party
 * connections and a set of cookies for a visitor who may never press play.
 *
 * The ratios are read from the component, so this page cannot claim one it does not ship.
 */
const RATIOS = Object.keys(VIDEO_RATIOS) as (keyof typeof VIDEO_RATIOS)[];
const VIDEO = { id: "aqz-KE-bpKQ", title: "Big Buck Bunny" };
const COLUMNS = [RATIOS.slice(0, 2), RATIOS.slice(2)];
</script>

<template>
  <PageHeader title="Videos" />
  <!-- Their layout: two columns of two from `xl`, each its own stack, so the tall 1:1 and the wide 21:9
       do not have to share a row and leave a gap. -->
  <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
    <div v-for="(column, i) in COLUMNS" :key="i" class="space-y-6">
      <Demo v-for="ratio in column" :key="ratio" :title="`Video Ratio ${ratio}`">
        <VideoEmbed :video-id="VIDEO.id" :title="`${VIDEO.title}, ${ratio}`" :ratio="ratio" />
      </Demo>
    </div>
  </div>
</template>
