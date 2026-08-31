<script setup lang="ts">
import { DATE_RANGE_LABEL } from "@viliha/vui-core";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  RangeCalendar,
} from "@viliha/vui-vue";
import { computed, onMounted, ref } from "vue";

import NavIcon from "../NavIcon.vue";

/**
 * The range picker beside the statistics tabs.
 *
 * A real picker, not the disabled button that would be easier: the reference has one and a control
 * that looks live and is not is the defect this repository keeps finding.
 *
 * **The range is set after mount, not at module scope.** "Today minus six days" evaluated while the
 * module loads is baked into a static build, so an exported demo would show the week it was built
 * rather than the week it is opened. The reference sets it in an effect for the same reason.
 */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const short = (date: Date) => `${MONTHS[date.getMonth()]} ${date.getDate()}`;

const range = ref<{ start?: Date; end?: Date }>({});

onMounted(() => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 6);
  range.value = { start, end };
});

const label = computed(() => {
  const { start, end } = range.value;
  if (!start) return "Select date range";
  if (!end || end.getTime() === start.getTime()) return short(start);
  return `${short(start)} to ${short(end)}`;
});
</script>

<template>
  <DropdownMenu>
    <!-- `text-transparent` hides the label below `lg`, which is how the reference collapses this to
         an icon without swapping elements or measuring anything. -->
    <DropdownMenuTrigger
      bare
      :aria-label="`Date range: ${label}`"
      class="relative inline-flex size-10 items-center justify-center rounded-lg border border-border bg-card text-sm font-medium text-transparent lg:size-auto lg:justify-start lg:py-2 lg:pr-3 lg:pl-10 lg:text-foreground/80"
    >
      <NavIcon
        name="calendar"
        aria-hidden="true"
        class="pointer-events-none absolute top-1/2 left-1/2 z-10 size-5 -translate-x-1/2 -translate-y-1/2 text-muted-foreground lg:left-3 lg:translate-x-0"
      />
      <!-- `min-w`, not `w`, and never wrapping. At a fixed 104px "Aug 20 to Aug 26" broke onto a
           second line and pushed the header taller than the tabs beside it: the width was sized for a
           shorter label and the longest one is what has to fit. Fixed in the reference too. -->
      <span :class="DATE_RANGE_LABEL">{{ label }}</span>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="p-0">
      <RangeCalendar v-model="range" :number-of-months="1" />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
