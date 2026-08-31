<script setup lang="ts">
import {
  DEALS,
  DT_SELECT_HEAD,
  ROW_DELETE_BUTTON,
  TABLE_AIRY,
  cn,
  type Deal,
} from "@viliha/vui-core";
import {
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@viliha/vui-vue";
import { computed, ref } from "vue";

import NavIcon from "../NavIcon.vue";
import Monogram from "./Monogram.vue";
import SearchBox from "./SearchBox.vue";
import StatusBadge from "./StatusBadge.vue";
import TableCard from "./TableCard.vue";

/**
 * Basic Table 2: recent orders, with search, a status filter, row selection and delete.
 *
 * **Select-all applies to what is shown, not to everything.** A checkbox in a header above a filtered
 * list means "these", and ticking it while a search is active must not quietly pick the rows the
 * reader cannot see; unticking it must not drop the ones they picked before searching. The reference
 * had that wrong once and its comment records the fix, which is why this takes the union and the
 * difference against the shown ids rather than replacing the whole set.
 *
 * Delete removes the row from the selection too, or the count keeps counting a row that is gone.
 */
const DEAL_FILTERS = ["All", "Complete", "Pending"] as const;

const query = ref("");
const status = ref<(typeof DEAL_FILTERS)[number]>("All");
const deals = ref<Deal[]>([...DEALS]);
const picked = ref<string[]>([]);

const rows = computed(() =>
  deals.value.filter(
    (deal) =>
      (status.value === "All" || deal.status === status.value) &&
      `${deal.id} ${deal.customer} ${deal.email} ${deal.product}`
        .toLowerCase()
        .includes(query.value.trim().toLowerCase()),
  ),
);

const allShown = computed(
  () => rows.value.length > 0 && rows.value.every((deal) => picked.value.includes(deal.id)),
);

function toggle(id: string) {
  picked.value = picked.value.includes(id)
    ? picked.value.filter((one) => one !== id)
    : [...picked.value, id];
}

function remove(id: string) {
  deals.value = deals.value.filter((deal) => deal.id !== id);
  picked.value = picked.value.filter((one) => one !== id);
}

function setShown(on: boolean) {
  const shownIds = rows.value.map((deal) => deal.id);
  picked.value = on
    ? [...new Set([...picked.value, ...shownIds])]
    : picked.value.filter((id) => !shownIds.includes(id));
}
</script>

<template>
  <TableCard title="Recent Orders">
    <template #actions>
      <SearchBox v-model="query" label="Search orders" />
      <DropdownMenu>
        <DropdownMenuTrigger :aria-label="`Filter by status, currently ${status}`">
          <NavIcon name="mixer-horizontal" class="size-4" aria-hidden="true" />
          {{ status === "All" ? "Filter" : status }}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            v-for="option in DEAL_FILTERS"
            :key="option"
            @select="status = option"
          >
            {{ option }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </template>

    <Table :class="cn(TABLE_AIRY, 'min-w-[56rem]')">
      <TableHeader>
        <TableRow>
          <!-- `w-10` pins the select column. Without it `table-layout: auto` treats it as elastic and
               hands it its proportional share of the row's slack, which pushed every column after it
               9px right of the reference (`PD-136`). -->
          <TableHead :class="DT_SELECT_HEAD">
            <Checkbox
              :model-value="allShown"
              aria-label="Select every order shown"
              @update:model-value="setShown(Boolean($event))"
            />
          </TableHead>
          <TableHead>Deal ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Product/Service</TableHead>
          <TableHead>Deal Value</TableHead>
          <TableHead>Close Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="(deal, index) in rows"
          :key="deal.id"
          :data-state="picked.includes(deal.id) ? 'selected' : undefined"
        >
          <TableCell>
            <Checkbox
              :model-value="picked.includes(deal.id)"
              :aria-label="`Select ${deal.id}`"
              @update:model-value="toggle(deal.id)"
            />
          </TableCell>
          <TableCell class="font-medium text-foreground">{{ deal.id }}</TableCell>
          <TableCell>
            <div class="flex items-center gap-3">
              <Monogram :name="deal.customer" :index="index" size="size-10" />
              <div class="min-w-0">
                <span class="block truncate font-medium text-foreground">{{ deal.customer }}</span>
                <span class="block truncate text-xs">{{ deal.email }}</span>
              </div>
            </div>
          </TableCell>
          <TableCell>{{ deal.product }}</TableCell>
          <TableCell class="tabular-nums">{{ deal.value }}</TableCell>
          <TableCell class="tabular-nums">{{ deal.closeDate }}</TableCell>
          <TableCell><StatusBadge :status="deal.status" /></TableCell>
          <TableCell>
            <button
              type="button"
              :aria-label="`Delete ${deal.id}`"
              :class="ROW_DELETE_BUTTON"
              @click="remove(deal.id)"
            >
              <NavIcon name="trash" class="size-4" aria-hidden="true" />
            </button>
          </TableCell>
        </TableRow>
        <TableRow v-if="rows.length === 0">
          <TableCell :colspan="8" class="py-10 text-center">
            <span class="text-sm text-muted-foreground">
              {{
                deals.length === 0
                  ? "Every order has been deleted. Reload the page to get them back."
                  : "No order matches that search and filter."
              }}
            </span>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableCard>
</template>
