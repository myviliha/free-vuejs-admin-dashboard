<script setup lang="ts">
import { ROUTE_PROGRESS_BAR, ROUTE_PROGRESS_TRACK, cn } from "@viliha/vui-core";
import { ref, watch } from "vue";

import { path } from "./router";

/**
 * The bar that says a navigation is happening (`PD-125`).
 *
 * **Neither edition had one**, which the dev noticed on 2026-08-26: a click on a sidebar row produced
 * nothing at all until the next screen appeared, and on a slow connection that is indistinguishable
 * from a dead control. This demo ships a design system, so the answer belongs in the design system:
 * the track, the bar and both keyframes are in `theme.css` and `class-variants.ts`, and every edition
 * wires its own router to them because that is the only part that genuinely differs.
 *
 * **Driven by the path settling, not by a timer.** `path` changes the moment the router commits, so
 * the bar starts then and finishes when the new screen has rendered. A fixed duration would either
 * lie on a fast navigation or finish early on a slow one.
 *
 * The `done` phase is a separate class rather than a state flag on the same one, because a CSS
 * animation cannot be restarted by changing its properties: the element has to be replaced or the
 * animation renamed. `:key` on the bar does the first, so two navigations in a row both animate.
 */
const phase = ref<"idle" | "running" | "done">("idle");
const run = ref(0);

watch(path, () => {
  run.value += 1;
  phase.value = "running";
  // One frame, so the browser has painted the new screen before the bar claims it is finished.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      phase.value = "done";
    });
  });
});

function onEnd() {
  if (phase.value === "done") phase.value = "idle";
}
</script>

<template>
  <!--
    `aria-hidden` and no `role="progressbar"`. A progress role owes a value, and this has none to give:
    it is a hint that the page is changing, not a measurement. Assistive technology already announces
    the new screen when it arrives, so a second, valueless announcement is noise.
  -->
  <div v-if="phase !== 'idle'" :class="ROUTE_PROGRESS_TRACK" aria-hidden="true">
    <div
      :key="`${run}-${phase}`"
      :class="ROUTE_PROGRESS_BAR"
      :style="{
        animation:
          phase === 'running'
            ? 'vui-route-progress 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            : 'vui-route-progress-done 320ms ease-out forwards',
      }"
      @animationend="onEnd"
    />
  </div>
</template>
