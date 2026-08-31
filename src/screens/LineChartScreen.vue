<script setup lang="ts">
import { LINE_SERIES, lineChartOptions } from "@viliha/vui-core";

import ApexChart from "../ApexChart.vue";
import Demo from "../Demo.vue";
import PageHeader from "../PageHeader.vue";

/**
 * The same twelve months read two ways: a gradient area, then a smooth line with markers.
 *
 * **ApexCharts, and the options come from `@viliha/vui-core`** (`PD-128`). This screen drew with
 * `@tanstack/charts` and hand-positioned a legend above the chart, because that library has no legend
 * option; Apex draws its legend inside the canvas, so the markup legend is gone and so are the two
 * hand-measured heights that existed only to compensate for it.
 */
const { area, line } = lineChartOptions();
</script>

<template>
  <PageHeader title="Line Chart" />
  <Demo
    title="Line Chart 1"
    description="Two series over a year, as a gradient area. The trend is the subject."
  >
    <ApexChart
      type="area"
      :height="310"
      :series="LINE_SERIES"
      :options="area"
      ariaLabel="Sales and revenue over twelve months"
    />
  </Demo>
  <Demo
    title="Line Chart 2"
    description="The same data as a smooth line with markers, for when each month's value is the subject rather than the shape."
  >
    <ApexChart
      type="line"
      :height="310"
      :series="LINE_SERIES"
      :options="line"
      ariaLabel="Sales and revenue as lines"
    />
  </Demo>
</template>
