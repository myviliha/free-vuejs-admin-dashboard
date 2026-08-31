<script setup lang="ts">
import { to } from "./router";
import {
  FREE_CRUMB_CURRENT,
  FREE_CRUMB_LINK,
  FREE_CRUMB_LIST,
  FREE_PAGE_TITLE,
} from "@viliha/vui-core";

import NavIcon from "./NavIcon.vue";

defineProps<{ title: string }>();
</script>

<template>
  <!-- Their `PageBreadcrumb`, measured: `flex flex-wrap items-center justify-between gap-3 mb-6`, an
       `h2` at `text-xl font-semibold` and a trail beside it. It stays an `h1` here: theirs is an `h2`
       with no `h1` above it, which leaves the document with no top-level heading. -->
  <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
    <h1 :class="FREE_PAGE_TITLE">{{ title }}</h1>
    <nav aria-label="Breadcrumb">
      <ol :class="FREE_CRUMB_LIST">
        <li>
          <!-- The chevron sits **inside** the Home link, as the reference has it, rather than in a
               list item of its own: a separator is part of the crumb it follows, and an `<li>` holding
               one character is an item a screen reader counts. -->
          <a :href="to('/')" :class="FREE_CRUMB_LINK">
            Home
            <NavIcon name="chevron-right" class="size-4" />
          </a>
        </li>
        <li aria-current="page" :class="FREE_CRUMB_CURRENT">{{ title }}</li>
      </ol>
    </nav>
  </div>
</template>
