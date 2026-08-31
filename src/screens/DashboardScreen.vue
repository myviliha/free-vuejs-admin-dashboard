<script setup lang="ts">
import Metrics from "../dashboard/Metrics.vue";
import MonthlySales from "../dashboard/MonthlySales.vue";
import MonthlyTarget from "../dashboard/MonthlyTarget.vue";
import Demographic from "../dashboard/Demographic.vue";
import RecentOrders from "../dashboard/RecentOrders.vue";
import Statistics from "../dashboard/Statistics.vue";

/**
 * The Ecommerce dashboard, which is the demo's entry page.
 *
 * **Composition only**, matching `apps/web/free-react/app/(shell)/page.tsx` section for section: a
 * twelve-column grid holding the metrics and the sales chart in seven columns, the target gauge in
 * five, then the statistics chart, the demographics card and the recent orders below.
 *
 * This screen used to be 205 lines holding its own metrics, its own copy and its own arrangement, and
 * `check:parity` reported 48 differences against the reference: four metric cards where there are two,
 * no tabs, no progress bars, no demographics and no orders table. Each section is its own component
 * under `src/dashboard/` now, which is how the reference is organised, so the two can be read side by
 * side (`PD-127`).
 *
 * **No `PageHeader` here.** The reference's dashboard has none: its title is the document title and
 * the shell's breadcrumb, not an `h1` on the page. This edition rendered one, which showed up as a
 * heading the reference does not have.
 */
</script>

<template>
  <div class="grid grid-cols-12 gap-4 md:gap-6">
    <div class="col-span-12 space-y-6 xl:col-span-7">
      <Metrics />
      <MonthlySales />
    </div>
    <div class="col-span-12 xl:col-span-5">
      <MonthlyTarget />
    </div>
    <div class="col-span-12">
      <Statistics />
    </div>
    <div class="col-span-12 xl:col-span-5">
      <Demographic />
    </div>
    <div class="col-span-12 xl:col-span-7">
      <RecentOrders />
    </div>
  </div>
</template>
