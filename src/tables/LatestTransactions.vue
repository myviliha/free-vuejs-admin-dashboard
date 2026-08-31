<script setup lang="ts">
import { DT_PAGER, DT_PAGER_GAP, ROW_ACTION_TRIGGER, TABLE_AIRY, TRADES, cn, type Trade } from "@viliha/vui-core";
import {
  Button,
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
 * Basic Table 3: the transactions list, with a search and a pager.
 *
 * The reference shows ten pages of five rows and the fixture is one page, so pages two onward are
 * legitimately empty and the table says so rather than repeating the same five rows.
 *
 * **Prev and Next walk the numbered pages, not `page ± 1`.** The pager has a gap in it, so stepping
 * arithmetically from 3 lands on 4, a page the pager cannot draw and the reader cannot get back from.
 */
const PAGES: readonly (number | "gap")[] = [1, 2, 3, "gap", 8, 9, 10];
const PAGE_NUMBERS = PAGES.filter((entry): entry is number => entry !== "gap");

const query = ref("");
const page = ref(1);
const trades = ref<Trade[]>([...TRADES]);

const rows = computed(() =>
  trades.value.filter((trade) =>
    `${trade.name} ${trade.category}`.toLowerCase().includes(query.value.trim().toLowerCase()),
  ),
);
const shown = computed(() => (page.value === 1 ? rows.value : []));

function step(by: 1 | -1) {
  const at = PAGE_NUMBERS.indexOf(page.value);
  const next = PAGE_NUMBERS[at + by];
  if (next !== undefined) page.value = next;
}

/** A new search starts at the first page: filtering to two rows and staying on page three shows none. */
function search(next: string) {
  query.value = next;
  page.value = 1;
}
</script>

<template>
  <TableCard title="Latest Transactions">
    <template #actions>
      <SearchBox :model-value="query" label="Search transactions" @update:model-value="search" />
    </template>

    <Table :class="cn(TABLE_AIRY, 'min-w-[52rem]')">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead><span class="sr-only">Actions</span></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(trade, index) in shown" :key="trade.id">
          <TableCell>
            <div class="flex items-center gap-3">
              <!-- "Bought VLHA" becomes the ticker. A one-word name has no second part, so fall back
                   to the whole thing rather than indexing off the end of the array. -->
              <Monogram :name="trade.name.split(' ')[1] ?? trade.name" :index="index" size="size-8" />
              <span class="font-medium text-foreground">{{ trade.name }}</span>
            </div>
          </TableCell>
          <TableCell>{{ trade.date }}</TableCell>
          <TableCell class="tabular-nums">{{ trade.price }}</TableCell>
          <TableCell>{{ trade.category }}</TableCell>
          <TableCell><StatusBadge :status="trade.status" /></TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger
                bare
                :class="ROW_ACTION_TRIGGER"
                :aria-label="`Actions for ${trade.name}`"
              >
                <!-- The reference's control is a vertical ellipsis and the icon set ships the
                     horizontal one. `rotate-90` is one class against a second icon binding that every
                     future icon set would have to answer for. -->
                <NavIcon name="dots-horizontal" class="size-4 rotate-90" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled title="The record page is RecordView, which is Pro">
                  View More
                </DropdownMenuItem>
                <DropdownMenuItem
                  @select="trades = trades.filter((one) => one.id !== trade.id)"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
        <TableRow v-if="shown.length === 0">
          <TableCell :colspan="6" class="py-10 text-center">
            <span class="text-sm text-muted-foreground">
              {{
                query
                  ? "No transaction matches that search."
                  : "This page is empty: the demo carries one page of transactions."
              }}
            </span>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <template #footer>
      <div class="flex flex-wrap items-center justify-between gap-3">
        <Button variant="outline" :disabled="page === PAGE_NUMBERS[0]" @click="step(-1)">
          <NavIcon name="arrow-left" class="size-4" aria-hidden="true" />
          Previous
        </Button>
        <nav :class="DT_PAGER" aria-label="Transaction pages">
          <template v-for="(entry, index) in PAGES" :key="`${entry}-${index}`">
            <span v-if="entry === 'gap'" :class="DT_PAGER_GAP" aria-hidden="true">…</span>
            <button
              v-else
              type="button"
              :aria-current="page === entry ? 'page' : undefined"
              :class="
                cn(
                  'size-9 rounded-lg text-sm transition-colors',
                  page === entry
                    ? 'bg-primary/10 font-medium text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )
              "
              @click="page = entry"
            >
              {{ entry }}
            </button>
          </template>
        </nav>
        <Button
          variant="outline"
          :disabled="page === PAGE_NUMBERS[PAGE_NUMBERS.length - 1]"
          @click="step(1)"
        >
          Next
          <NavIcon name="arrow-right" class="size-4" aria-hidden="true" />
        </Button>
      </div>
    </template>
  </TableCard>
</template>
