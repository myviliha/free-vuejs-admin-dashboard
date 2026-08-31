<script setup lang="ts">
import { DASHBOARD_ORDERS } from "@viliha/vui-core";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@viliha/vui-vue";

import NavIcon from "../NavIcon.vue";

/**
 * The five most recent orders.
 *
 * Rows come from `DASHBOARD_ORDERS`, and the product pictures are the same five files in this app's
 * own `public/products/`: a static export is served from its own directory, so each edition carries
 * its own copy rather than reaching into another app's.
 */
const TONE = { Delivered: "success", Pending: "warning", Canceled: "destructive" } as const;

/**
 * The first letter of the first two words, which is the reference's.
 *
 * Not `initialsOf` from the shared package: that one takes every word, so "MacBook Pro 13”" came out
 * "MP1" against the reference's "MP". A product name is not a person's name and does not want the same
 * rule.
 */
const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
</script>

<template>
  <Card class="h-full">
    <CardHeader class="flex-row items-center justify-between space-y-0">
      <CardTitle>Recent Orders</CardTitle>
      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <NavIcon name="mixer-horizontal" />
          Filter
        </Button>
        <Button variant="outline" size="sm">See all</Button>
      </div>
    </CardHeader>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Products</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="order in DASHBOARD_ORDERS" :key="order.id">
          <TableCell>
            <div class="flex items-center gap-3">
              <Avatar class="size-[50px] shrink-0 rounded-lg bg-muted">
                <AvatarImage
                  :src="`/products/${order.image}.webp`"
                  alt=""
                  class="rounded-lg object-contain p-1"
                />
                <AvatarFallback class="rounded-lg text-xs">
                  {{ initials(order.product) }}
                </AvatarFallback>
              </Avatar>
              <div class="min-w-0">
                <p class="truncate font-medium">{{ order.product }}</p>
                <p class="text-sm text-muted-foreground">
                  {{ order.variants }} {{ order.variants === 1 ? "Variant" : "Variants" }}
                </p>
              </div>
            </div>
          </TableCell>
          <TableCell class="text-muted-foreground">{{ order.category }}</TableCell>
          <TableCell class="tabular-nums">{{ order.price }}</TableCell>
          <TableCell>
            <Badge :variant="TONE[order.status as keyof typeof TONE]">{{ order.status }}</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Card>
</template>
