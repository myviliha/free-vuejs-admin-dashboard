<script setup lang="ts">
import { Card, CardContent } from "@viliha/vui-vue";

import PageHeader from "../PageHeader.vue";

/**
 * The blank page: the file a buyer copies to start their own screen.
 *
 * **A plain `Card`, not the titled `Demo`.** On the React page that printed "Card Title Here" twice,
 * once in the header band and once in the body; the reference's blank page has no header band, which is
 * right, because the card *is* the content here rather than a labelled example of something.
 *
 * Content at the top rather than centred: a heading floating in the middle of a tall box is a layout a
 * buyer has to undo before they can start.
 */
</script>

<template>
  <PageHeader title="Blank Page" />
  <Card class="min-h-[70vh] p-0">
    <CardContent class="px-5 py-7 xl:px-10 xl:py-12">
      <div class="mx-auto w-full max-w-[630px] text-center">
        <h3 class="mb-4 text-xl font-semibold sm:text-2xl">Card Title Here</h3>
        <p class="text-sm text-muted-foreground sm:text-base">
          Start putting content on grids or panels. Copy this file, keep the header and the card, and
          build the screen inside it. The dashboard and the table pages are worth reading first for the
          combinations that already work.
        </p>
      </div>
    </CardContent>
  </Card>
</template>
