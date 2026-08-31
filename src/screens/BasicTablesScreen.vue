<script setup lang="ts">
import { DT_FRAME, DT_HEAD_ROW, TABLE_AIRY, cn } from "@viliha/vui-core";
import {
  Avatar,
  AvatarFallback,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@viliha/vui-vue";

import Demo from "../Demo.vue";
import FeaturedCampaigns from "../tables/FeaturedCampaigns.vue";
import LatestTransactions from "../tables/LatestTransactions.vue";
import RecentDeals from "../tables/RecentDeals.vue";
import TopProducts from "../tables/TopProducts.vue";
import PageHeader from "../PageHeader.vue";

/**
 * Basic Tables: the free tier's table, and the reference's free table.
 *
 * Sorting, filtering, pagination and bulk actions are `RecordView`, which is Pro (`PD-055`), and the
 * reference draws the same line: its free template ships this table and its advanced one is paid.
 *
 * **`TABLE_AIRY` is the content table's density, from the library.** `TABLE_*` alone is `py-1.5` with a
 * vertical rule on every cell, which is right for fitting rows on an operator's screen and wrong for a
 * page someone reads.
 *
 * **Initials, not stock photographs**, and the team stack takes **one** initial where the user column
 * takes two: the stack overlaps by 8px of a 24px circle, so a photograph does not mind and two centred
 * characters lose their second.
 */
interface Row {
  id: number;
  name: string;
  role: string;
  project: string;
  team: readonly string[];
  status: "Active" | "Pending" | "Cancel";
  budget: string;
}

const ROWS: readonly Row[] = [
  { id: 1, name: "Lindsey Curtis", role: "Web Designer", project: "Agency Website", team: ["Priya Raman", "Tomas Neal", "Ada Okafor"], status: "Active", budget: "3.9K" },
  { id: 2, name: "Kaiya George", role: "Project Manager", project: "Technology", team: ["Sofia Ruiz", "Ben Halvorsen"], status: "Pending", budget: "24.9K" },
  { id: 3, name: "Zain Geidt", role: "Content Writing", project: "Blog Writing", team: ["Marta Silva"], status: "Active", budget: "12.7K" },
  { id: 4, name: "Abram Schleifer", role: "Digital Marketer", project: "Social Media", team: ["Yuki Tanaka", "Omar Farouk", "Elise Braun"], status: "Cancel", budget: "2.8K" },
  { id: 5, name: "Carla George", role: "Front-end Developer", project: "Website", team: ["Nils Berg", "Ines Duarte", "Kwame Mensah"], status: "Active", budget: "4.5K" },
];

/** The state colours are the tokens `PD-066` added, so a retheme carries all three. */
const TONE = { Active: "success", Pending: "warning", Cancel: "destructive" } as const;

const initials = (name: string, n = 2) =>
  name
    .split(" ")
    .slice(0, n)
    .map((part) => part[0])
    .join("");

const PRODUCTS = [
  { id: "p1", name: "TailGrids", category: "UI Kit", country: "United States", flag: "🇺🇸", cr: "Dashboard", value: "$12,499" },
  { id: "p2", name: "GrayGrids", category: "Templates", country: "Singapore", flag: "🇸🇬", cr: "Dashboard", value: "$5,498" },
  { id: "p3", name: "Uideck", category: "Templates", country: "United Kingdom", flag: "🇬🇧", cr: "Dashboard", value: "$4,521" },
  { id: "p4", name: "FormBold", category: "SaaS", country: "Egypt", flag: "🇪🇬", cr: "Dashboard", value: "$13,843" },
  { id: "p5", name: "NextAdmin", category: "Dashboard", country: "Finland", flag: "🇫🇮", cr: "Dashboard", value: "$7,523" },
] as const;
</script>

<template>
  <PageHeader title="Basic Tables" />

  <Demo title="Basic Table 1" class="p-4 sm:p-6">
    <div :class="DT_FRAME">
      <!-- `min-w`: five columns need more room than a phone has, and the frame scrolls rather than
           letting the cells crush. -->
      <Table :class="cn(TABLE_AIRY, 'min-w-[46rem]')">
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Project Name</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Budget</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="row in ROWS" :key="row.id">
            <TableCell>
              <div class="flex items-center gap-3">
                <Avatar size="md" class="shrink-0">
                  <AvatarFallback class="text-xs">{{ initials(row.name) }}</AvatarFallback>
                </Avatar>
                <div class="min-w-0">
                  <span class="block truncate font-medium text-foreground">{{ row.name }}</span>
                  <span class="block truncate text-xs">{{ row.role }}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>{{ row.project }}</TableCell>
            <TableCell>
              <!-- Ringed in the card's own colour so the stack reads as separate faces rather than one
                   blob. `ring` and not `border`: a border would shrink the circle inside the same 24px
                   and the row would jitter between one member and three. -->
              <div class="flex -space-x-2">
                <Avatar
                  v-for="member in row.team"
                  :key="member"
                  size="xs"
                  class="ring-2 ring-card"
                  :title="member"
                >
                  <AvatarFallback class="text-[11px]">{{ initials(member, 1) }}</AvatarFallback>
                </Avatar>
              </div>
            </TableCell>
            <TableCell><Badge :variant="TONE[row.status]">{{ row.status }}</Badge></TableCell>
            <TableCell>{{ row.budget }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </Demo>

  <Demo title="Basic Table 2" class="p-4 sm:p-6"><RecentDeals /></Demo>
  <Demo title="Basic Table 3" class="p-4 sm:p-6"><LatestTransactions /></Demo>
  <Demo title="Basic Table 4" class="p-4 sm:p-6"><FeaturedCampaigns /></Demo>
  <Demo title="Basic Table 5" class="p-4 sm:p-6"><TopProducts /></Demo>
</template>
