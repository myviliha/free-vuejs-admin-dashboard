<script setup lang="ts">
import { DASHBOARD_TARGET, DASHBOARD_TARGET_FOOTER, monthlyTargetOptions } from "@viliha/vui-core";
import { Badge } from "@viliha/vui-vue";

import ApexChart from "../ApexChart.vue";
import NavIcon from "../NavIcon.vue";
import Panel from "./Panel.vue";

/**
 * The radial gauge, the badge under it, and the three figures in the footer.
 *
 * **This was a hand-drawn SVG arc**, and the argument for it was good in isolation: a gauge is one path
 * and two numbers, so a charting dependency is the heavier answer. It stopped being good once the
 * standard became an exact replica, because Apex's radial bar is not one arc. It is a 78% hollow, a
 * separate track with its own margin, a round line cap, a value label at a 36px offset, and an 800ms
 * sweep on first draw. Reproducing five of those and missing the sixth is worse than using the library
 * the reference uses, which is framework-free anyway (`PD-128`).
 *
 * **The badge is not the chart's.** Apex renders one value label and the reference puts a second thing
 * under it, so both editions position it absolutely rather than asking the library for two.
 */
const options = monthlyTargetOptions();
</script>

<template>
  <Panel title="Monthly Target" description="Target you've set for each month">
    <div class="relative">
      <ApexChart
        type="radialBar"
        :height="290"
        :series="[DASHBOARD_TARGET]"
        :options="options"
        :ariaLabel="`Monthly target, ${DASHBOARD_TARGET} per cent reached`"
      />
      <div class="pointer-events-none absolute inset-x-0 top-[152px] flex justify-center">
        <Badge variant="success" class="rounded-full">+10%</Badge>
      </div>
    </div>
    <p class="mx-auto -mt-8 max-w-[21rem] text-center text-sm text-muted-foreground">
      You earn $3287 today, it's higher than last month. Keep up your good work!
    </p>
    <!--
      The footer reaches the card's edges: the reference's tint runs to the border and the corners
      round with the card. In a rounded box with card padding around it, it reads as a fourth block of
      content rather than a footer. The negative margins undo `CardContent`'s padding.
    -->
    <div
      class="-mx-5 -mb-5 mt-auto grid grid-cols-3 divide-x divide-border rounded-b-[var(--vui-card-radius)] bg-muted/50 px-4 py-5 text-center"
    >
      <div v-for="item in DASHBOARD_TARGET_FOOTER" :key="item.label">
        <p class="text-sm text-muted-foreground">{{ item.label }}</p>
        <p class="mt-1.5 flex items-center justify-center gap-1 font-semibold tabular-nums">
          {{ item.value }}
          <NavIcon
            :name="item.up ? 'arrow-up' : 'arrow-down'"
            :class="item.up ? 'size-3.5 text-success' : 'size-3.5 text-destructive'"
          />
        </p>
      </div>
    </div>
  </Panel>
</template>
