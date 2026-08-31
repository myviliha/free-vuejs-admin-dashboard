<script setup lang="ts">
import { DEMOGRAPHIC_MAP_HOST } from "@viliha/vui-core";
import "jsvectormap/dist/jsvectormap.css";
import { onBeforeUnmount, onMounted, ref } from "vue";

/**
 * The vector map behind the demographics list.
 *
 * `jsvectormap` is the same library the reference uses, at the same version, applying `PD-059` rather
 * than deciding it again: that ruling picked the library itself over the React wrapper, because the
 * wrapper peers on React 16 to 18 and on jQuery, and the library has zero dependencies. Being
 * framework-free is exactly why a second edition can use it.
 *
 * **Imported inside the handler, not at module scope.** The library touches `window` when its map data
 * loads, and a static build evaluates modules while there is no window. The reference records the same
 * fix: its export died with `ReferenceError: window is not defined` until the import moved.
 *
**The library's own stylesheet is imported, and forgetting it was the whole difference.** Without it the
 * container ignored its own height rule and rendered 208px against the reference's 150, and the
 * regions and markers were unstyled besides. The reference imports the same file at the top of
 * `world-map.tsx`; a map is not just a script.
 *
 * `aria-hidden`: every figure the map carries is spelled out in the list beneath it, and a screen
 * reader reading a world map's region paths says nothing useful.
 */
const host = ref<HTMLDivElement | null>(null);
let map: { destroy: () => void } | undefined;
let cancelled = false;

/**
 * Their four markers, verbatim. Worth knowing: the fourth is **named** Sweden in their source and its
 * coordinates are in Western Australia, so the name is a bug of theirs and the position is what the
 * screenshot shows. The position is copied and the name corrected.
 */
const MARKERS: { name: string; coords: [number, number] }[] = [
  { name: "United States", coords: [37.2580397, -104.657039] },
  { name: "India", coords: [20.7504374, 73.7276105] },
  { name: "United Kingdom", coords: [53.613, -11.6368] },
  { name: "Australia", coords: [-25.0304388, 115.2092761] },
];

onMounted(async () => {
  const el = host.value;
  if (!el) return;
  // **Sequential, and the global is set in between.** The map data file registers itself against a
  // `jsVectorMap` global rather than exporting anything, so importing both at once raced: under Vite
  // the data ran first and died with `ReferenceError: jsVectorMap is not defined`. Next's bundler
  // happens to order them the other way, which is why the reference can import them together and this
  // cannot.
  const { default: JsVectorMap } = await import("jsvectormap");
  (globalThis as { jsVectorMap?: unknown }).jsVectorMap = JsVectorMap;
  await import("jsvectormap/dist/maps/world.js");
  if (cancelled) return;
  map = new JsVectorMap({
    selector: el,
    map: "world",
    zoomButtons: false,
    zoomOnScroll: false,
    backgroundColor: "transparent",
    regionStyle: {
      initial: { fill: "var(--vui-map-land)", fillOpacity: 1, stroke: "none", "stroke-width": 0 },
      hover: { fill: "var(--primary)", fillOpacity: 0.7, cursor: "pointer" },
    },
    markers: MARKERS,
    markerStyle: {
      initial: { fill: "var(--primary)", r: 4, stroke: "var(--card)", "stroke-width": 1 },
    },
  });
});

onBeforeUnmount(() => {
  cancelled = true;
  map?.destroy();
});
</script>

<template>
  <div ref="host" :class="DEMOGRAPHIC_MAP_HOST" aria-hidden="true" />
</template>
