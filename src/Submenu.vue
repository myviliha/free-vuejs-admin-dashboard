<script setup lang="ts">
import {
  FREE_SUBMENU_BOX,
  FREE_SUBMENU_BOX_OPEN,
  FREE_SUBMENU_BOX_SHUT,
  FREE_SUBMENU_CLIP,
  cn,
} from "@viliha/vui-core";
import { computed } from "vue";

/**
 * The collapsing submenu, animated by CSS rather than measured by JavaScript.
 *
 * **This watched a `ResizeObserver` and animated `height` from `scrollHeight`**, mirroring the
 * reference, which did the same. Both were wrong in the same way and only the HTML edition could
 * show it: measured height needs a framework running, so a static export renders `height: 0px` and
 * never corrects, leaving every submenu shut and the sidebar 312px short (`PD-141`).
 *
 * `grid-template-rows: 0fr` to `1fr` animates to content height with nothing to measure. The inner
 * element clips, because a grid item cannot be clipped by its own track.
 */
const props = defineProps<{ id: string; open: boolean }>();

const box = computed(() =>
  cn(FREE_SUBMENU_BOX, props.open ? FREE_SUBMENU_BOX_OPEN : FREE_SUBMENU_BOX_SHUT),
);
</script>

<template>
  <!--
    `inert` alongside `aria-hidden`, and the pair is the point: a closed panel is zero-height with its
    content clipped, so its links are invisible and **still focusable**. Tabbing down a sidebar with
    every section shut put focus on nineteen links that are not there, and `aria-hidden` around
    focusable content is an outright ARIA violation, so a screen reader announced each one as blank.
    `inert` is the platform's own answer and takes the whole subtree out of the tab order.
  -->
  <div :id="id" :class="box" :aria-hidden="!open" :inert="!open">
    <div :class="FREE_SUBMENU_CLIP"><slot /></div>
  </div>
</template>
