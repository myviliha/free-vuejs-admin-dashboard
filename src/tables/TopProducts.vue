<script setup lang="ts">
import { PRODUCTS, TABLE_AIRY, cn } from "@viliha/vui-core";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@viliha/vui-vue";
import { computed, ref } from "vue";

import NavIcon from "../NavIcon.vue";
import TableCard from "./TableCard.vue";

/**
 * Basic Table 5: top products, with a filter that actually filters.
 *
 * The threshold reads the value column rather than a second flag on the fixture, so a product's own
 * number decides whether it is a top one.
 */
const topOnly = ref(false);
const rows = computed(() =>
  topOnly.value
    ? PRODUCTS.filter((p) => Number(p.value.replace(/[^0-9]/g, "")) >= 7000)
    : PRODUCTS,
);
</script>

<template>
  <TableCard title="Top Products">
    <template #actions>
      <Button variant="outline" @click="topOnly = !topOnly">
        <NavIcon name="mixer-horizontal" class="size-4" aria-hidden="true" />
        {{ topOnly ? "All values" : "Filter" }}
      </Button>
      <Button variant="outline" disabled title="The full list is a Pro record page">See all</Button>
    </template>

    <Table :class="cn(TABLE_AIRY, 'min-w-[44rem]')">
      <TableHeader>
        <TableRow>
          <TableHead>Products</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>CR</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="product in rows" :key="product.id">
          <TableCell class="font-medium text-foreground">{{ product.name }}</TableCell>
          <TableCell>{{ product.category }}</TableCell>
          <TableCell>
            <!-- An emoji flag rather than an image: no file to licence, nothing to load, and it renders
                 in the static HTML edition too. The country is spelled out for a screen reader, which
                 an emoji alone reads out inconsistently. -->
            <span class="text-lg leading-none" aria-hidden="true">{{ product.flag }}</span>
            <span class="sr-only">{{ product.country }}</span>
          </TableCell>
          <TableCell>{{ product.cr }}</TableCell>
          <TableCell class="font-medium tabular-nums text-success">{{ product.value }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableCard>
</template>
