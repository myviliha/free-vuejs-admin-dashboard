<script setup lang="ts">
import { DEMO_ADDRESS_FIELDS } from "@viliha/vui-core";

import PageHeader from "../PageHeader.vue";
import DangerZoneCard from "../profile/DangerZoneCard.vue";
import FieldCard from "../profile/FieldCard.vue";
import ProfileCard from "../profile/ProfileCard.vue";
import SecurityCard from "../profile/SecurityCard.vue";

/**
 * The profile, on the reference's design.
 *
 * **This screen was a different page.** It had a "Profile" heading where the reference says "User
 * Profile", two cards where there are four, `h2` headings where the reference renders `h4`, and its own
 * person: a different email, a different postal code, a different tax id. `check:parity` reported 39
 * differences and every one was real (`PD-134`).
 *
 * The outer card titled "My Profile" is the reference's, and cards inside a card sounds like one too
 * many until you see it: the frame is what makes four sections read as one profile rather than four
 * unrelated panels stacked on a page.
 */
</script>

<template>
  <PageHeader title="User Profile" />
  <div class="rounded-2xl border border-border bg-card p-5 lg:p-6">
    <h3 class="mb-5 text-lg font-semibold lg:mb-7">My Profile</h3>
    <div class="space-y-6">
      <ProfileCard />
      <FieldCard title="Address" :fields="DEMO_ADDRESS_FIELDS" />
      <SecurityCard />
      <DangerZoneCard />
    </div>
  </div>
</template>
