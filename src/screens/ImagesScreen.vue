<script setup lang="ts">
import { AspectRatio } from "@viliha/vui-vue";

import Demo from "../Demo.vue";
import PageHeader from "../PageHeader.vue";

/**
 * Responsive images at one, two and three columns, as the reference has them.
 *
 * **The photographs are supplied, not taken from the reference.** Theirs is six PNGs under
 * `/images/grid-image/`, and this is a template a buyer redistributes: `SD-006` keeps their code out of
 * the repository and the same reasoning covers their asset files.
 *
 * **Every frame is `AspectRatio` with `object-cover`**, which the varied sources make necessary rather
 * than tidy: the five are 1.70, 1.10, 1.00, 1.04 and 1.59 wide, so laying them out at their own ratios
 * would give a grid of mismatched heights.
 *
 * They are **148px tall**, which is stated here rather than left to be discovered: the single-column
 * card paints around 1050px wide, so the first is scaled more than four times and will look soft. The
 * fix is larger source files, not a layout change.
 */
const PHOTOS = [
  { src: "/images/grid/image-1.jpeg", alt: "Photograph one" },
  { src: "/images/grid/image-2.jpeg", alt: "Photograph two" },
  { src: "/images/grid/image-3.jpeg", alt: "Photograph three" },
  { src: "/images/grid/image-4.jpeg", alt: "Photograph four" },
  { src: "/images/grid/image-5.jpeg", alt: "Photograph five" },
] as const;

const FRAME = "overflow-hidden rounded-xl border border-border";
</script>

<template>
  <PageHeader title="Images" />
  <Demo
    title="Responsive Image"
    description="One column, filling the card. The box is reserved at 16:9 before the file arrives, so nothing shifts."
  >
    <div :class="FRAME">
      <AspectRatio :ratio="16 / 9">
        <img :src="PHOTOS[0].src" :alt="PHOTOS[0].alt" class="size-full object-cover" />
      </AspectRatio>
    </div>
  </Demo>
  <Demo title="Image in 2 Grid" description="Two up from the `sm` breakpoint, one below it.">
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div v-for="photo in [PHOTOS[1], PHOTOS[4]]" :key="photo.src" :class="FRAME">
        <AspectRatio :ratio="16 / 9">
          <img :src="photo.src" :alt="photo.alt" class="size-full object-cover" />
        </AspectRatio>
      </div>
    </div>
  </Demo>
  <Demo
    title="Image in 3 Grid"
    description="Three up from `xl`, two from `sm`, one below. The card's own padding is the gutter."
  >
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <!-- Five sources over six cells across the page, so the first appears once more here at a third
           of the width. Reusing one is less noticeable than a sixth image in another style. -->
      <div v-for="photo in [PHOTOS[2], PHOTOS[3], PHOTOS[0]]" :key="photo.alt" :class="FRAME">
        <AspectRatio :ratio="16 / 9">
          <img :src="photo.src" :alt="photo.alt" class="size-full object-cover" />
        </AspectRatio>
      </div>
    </div>
  </Demo>
</template>
