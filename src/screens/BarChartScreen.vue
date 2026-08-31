<script setup lang="ts">
import { BAR_REFUNDS, BAR_SALES, barChartOptions } from "@viliha/vui-core";

import ApexChart from "../ApexChart.vue";
import Demo from "../Demo.vue";
import PageHeader from "../PageHeader.vue";

/**
 * The three bar charts, drawn by the same library and the same options as the reference.
 *
 * **This was `@tanstack/charts` and now it is ApexCharts**, because two libraries cannot draw the same
 * picture: the 5px radius on the column's end, the 4px transparent stroke that separates a group, the
 * grid's dash, the tooltip and the 800ms draw are each library's own. `barChartOptions()` is the one
 * definition both editions build from, so there is nothing left to approximate (`PD-128`).
 */
const { bars, grouped, stacked } = barChartOptions();
</script>

<template>
  <PageHeader title="Bar Chart" />
  <Demo title="Bar Chart 1" description="One series across a year. Their measurements exactly.">
    <ApexChart
      type="bar"
      :height="180"
      :series="[{ name: 'Sales', data: BAR_SALES }]"
      :options="bars"
      ariaLabel="Sales across twelve months"
    />
  </Demo>
  <Demo
    title="Bar Chart 2"
    description="Two series side by side, for comparing them month by month."
  >
    <ApexChart
      type="bar"
      :height="280"
      :series="[
        { name: 'Sales', data: BAR_SALES },
        { name: 'Refunds', data: BAR_REFUNDS },
      ]"
      :options="grouped"
      ariaLabel="Sales and refunds across twelve months"
    />
  </Demo>
  <Demo
    title="Bar Chart 3"
    description="The same two stacked, for when the total is the number that matters."
  >
    <ApexChart
      type="bar"
      :height="280"
      :series="[
        { name: 'Sales', data: BAR_SALES },
        { name: 'Refunds', data: BAR_REFUNDS },
      ]"
      :options="stacked"
      ariaLabel="Sales and refunds stacked across twelve months"
    />
  </Demo>
</template>
