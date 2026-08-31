<script setup lang="ts">
import { CAMPAIGNS, ROW_ACTION_TRIGGER, TABLE_AIRY, cn } from "@viliha/vui-core";
import {
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

import NavIcon from "../NavIcon.vue";
import Monogram from "./Monogram.vue";
import StatusBadge from "./StatusBadge.vue";
import TableCard from "./TableCard.vue";

/**
 * Basic Table 4: featured campaigns, a creator and a campaign per row.
 *
 * Both actions are `disabled` with a title saying why, which is the reference's own choice and the
 * right one: deleting a campaign needs a server the free tier has no part of, and a control that looks
 * live and swallows the click is worse than one that explains itself on hover.
 */
</script>

<template>
  <TableCard title="Featured Campaigns">
    <template #actions>
      <DropdownMenu>
        <DropdownMenuTrigger bare :class="ROW_ACTION_TRIGGER" aria-label="Campaign actions">
          <NavIcon name="dots-horizontal" class="size-4 rotate-90" aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled title="The record page is RecordView, which is Pro">
            View More
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled
            title="Deleting a campaign needs a server, which the free tier has no part of"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </template>

    <Table :class="cn(TABLE_AIRY, 'min-w-[44rem]')">
      <TableHeader>
        <TableRow>
          <TableHead>Creator</TableHead>
          <TableHead>Campaign</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(campaign, index) in CAMPAIGNS" :key="campaign.id">
          <TableCell>
            <div class="flex items-center gap-3">
              <Monogram :name="campaign.creator" :index="index" size="size-10" />
              <span class="font-medium text-foreground">{{ campaign.creator }}</span>
            </div>
          </TableCell>
          <TableCell>
            <div class="flex items-center gap-3">
              <Monogram :name="campaign.channel" :index="index + 2" size="size-8" />
              <div class="min-w-0">
                <span class="block truncate font-medium text-foreground">
                  {{ campaign.headline }}
                </span>
                <span class="block truncate text-xs">Ads campaign</span>
              </div>
            </div>
          </TableCell>
          <TableCell><StatusBadge :status="campaign.status" /></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableCard>
</template>
