<script setup lang="ts">
import { STATISTICS, statisticsOptions } from "@viliha/vui-core";
import { Tabs, TabsList, TabsTrigger } from "@viliha/vui-vue";
import { computed, ref } from "vue";

import ApexChart from "../ApexChart.vue";
import DateRangePicker from "./DateRangePicker.vue";
import Panel from "./Panel.vue";

/**
 * The wide area chart, with the range tabs and the date picker in the card's header.
 *
 * Quarterly and annually are derived from the same twelve months rather than being three fixtures:
 * three datasets that are supposed to agree is three chances for them not to.
 *
 * The options come from `@viliha/vui-core` and the renderer is ApexCharts, so this is the reference's
 * chart rather than a second library's impression of it (`PD-128`).
 */
const QUARTERS = ["Q1", "Q2", "Q3", "Q4"] as const;
const sum = (rows: readonly { sales: number; revenue: number }[], key: "sales" | "revenue") =>
  rows.reduce((total, row) => total + row[key], 0);

const RANGES = {
  monthly: { label: "Monthly", data: STATISTICS },
  quarterly: {
    label: "Quarterly",
    data: QUARTERS.map((month, i) => {
      const slice = STATISTICS.slice(i * 3, i * 3 + 3);
      return { month, sales: sum(slice, "sales"), revenue: sum(slice, "revenue") };
    }),
  },
  annually: {
    label: "Annually",
    data: [
      { month: "2024", sales: 1720, revenue: 610 },
      { month: "2025", sales: 1980, revenue: 780 },
    ],
  },
} as const;

type RangeKey = keyof typeof RANGES;
const range = ref<RangeKey>("monthly");
const keys = Object.keys(RANGES) as RangeKey[];

const rows = computed(() => RANGES[range.value].data);
const options = computed(() => statisticsOptions(rows.value.map((row) => row.month)));
const series = computed(() => [
  { name: "Sales", data: rows.value.map((row) => row.sales) },
  { name: "Revenue", data: rows.value.map((row) => row.revenue) },
]);
</script>

<template>
  <Panel title="Statistics" description="Target you've set for each month">
    <template #actions>
      <div class="flex items-center gap-3 sm:justify-end">
        <Tabs v-model="range">
          <TabsList>
            <TabsTrigger v-for="key in keys" :key="key" :value="key">
              {{ RANGES[key].label }}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <!-- A real range picker, not a disabled button. The reference has one, and this edition had
             no range calendar at all until `RangeCalendar.vue` (`PD-127`). -->
        <DateRangePicker />
      </div>
    </template>
    <ApexChart
      type="area"
      :height="310"
      :series="series"
      :options="options"
      ariaLabel="Statistics: sales and revenue over the selected range"
    />
  </Panel>
</template>
