<script setup lang="ts">
import type ApexCharts from "apexcharts";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

/**
 * The same chart library the reference draws with, mounted directly.
 *
 * **This replaced `@tanstack/charts` in this app, and the reason is the standard.** Two charting
 * libraries cannot produce the same picture: the bar corner radius, the grid dash, the tooltip, the
 * axis label metrics and the 800ms draw animation are each library's own. Matching them by hand is
 * endless and never exact, which the dev put plainly on 2026-08-26 (`PD-128`).
 *
 * ApexCharts' core is framework-free. `react-apexcharts`, which the reference uses, is a thin wrapper
 * over `new ApexCharts(el, options).render()`, and there is nothing React about that call. So both
 * editions run the same renderer over the **same options object** from `@viliha/vui-core`, and the two
 * charts are identical by construction rather than by resemblance.
 *
 * **Imported inside `onMounted`.** Apex touches `window` at module scope, and a static build evaluates
 * modules where there is no window. The reference lazy-imports it for the same reason.
 *
 * `role="img"` with a name, and the canvas hidden beneath it: Apex renders every axis tick as an SVG
 * `<text>`, so an exposed chart reads as "250 250 200 200" for thirty-six labels.
 */
const props = defineProps<{
  type: "area" | "bar" | "line" | "radialBar";
  height: number;
  series: { name: string; data: number[] }[] | number[];
  options: Record<string, unknown>;
  ariaLabel: string;
}>();

const host = ref<HTMLDivElement | null>(null);
/**
 * The instance, typed by the library rather than by a hand-written shape.
 *
 * A three-method structural type looked tidier and was wrong: `updateOptions` takes `ApexOptions` and
 * returns a promise, so the narrower declaration did not match and the compiler said so. Apex ships
 * its own types, so there is nothing to guess at.
 */
let chart: ApexCharts | undefined;
let cancelled = false;

const config = () => ({
  ...props.options,
  chart: { ...(props.options.chart as object), type: props.type, height: props.height },
  series: props.series,
});

onMounted(async () => {
  const el = host.value;
  if (!el) return;
  const { default: Apex } = await import("apexcharts");
  if (cancelled) return;
  chart = new Apex(el, config() as never);
  chart.render();
});

// The reference changes `chart.id` with the range so Apex redraws and replays its animation rather
// than morphing in place; `updateOptions` with the new series does the same thing here.
watch(
  () => [props.series, props.options],
  () => void chart?.updateOptions(config() as never),
  { deep: true },
);

onBeforeUnmount(() => {
  cancelled = true;
  chart?.destroy();
});
</script>

<template>
  <div class="w-full" role="img" :aria-label="ariaLabel">
    <div ref="host" aria-hidden="true" :style="{ minHeight: `${height}px` }" />
  </div>
</template>
