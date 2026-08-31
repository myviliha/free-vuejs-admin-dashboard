<script setup lang="ts">
import { MONTHLY_SALES, monthlySalesOptions } from "@viliha/vui-core";

import ApexChart from "../ApexChart.vue";
import Panel from "./Panel.vue";

/**
 * The twelve-month bar chart, on the reference's renderer and the reference's options (`PD-128`).
 */
const options = monthlySalesOptions(MONTHLY_SALES.map((row) => row.month));
</script>

<template>
  <Panel title="Monthly Sales">
    <ApexChart
      type="bar"
      :height="250"
      :series="[{ name: 'Sales', data: MONTHLY_SALES.map((row) => row.sales) }]"
      :options="options"
      ariaLabel="Monthly sales across twelve months"
    />
  </Panel>
</template>
