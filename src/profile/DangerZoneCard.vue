<script setup lang="ts">
import { PROFILE_CARD, PROFILE_PILL, cn } from "@viliha/vui-core";

import NavIcon from "../NavIcon.vue";
import ActionRow from "./ActionRow.vue";

/**
 * Danger Zone: the two actions that cannot be undone.
 *
 * Only Delete is destructive-coloured. Signing out of every session is inconvenient and reversible,
 * and painting both red would leave a reader with no way to tell which one they cannot take back.
 */
</script>

<template>
  <div :class="PROFILE_CARD">
    <h4 class="mb-2 text-lg font-semibold">Danger Zone</h4>
    <div class="divide-y divide-border">
      <ActionRow title="Logout all devices" description="Sign out from every active session.">
        <button type="button" :class="PROFILE_PILL">
          <NavIcon name="log-out" class="size-4" />
          Log out everywhere
        </button>
      </ActionRow>
      <!-- The reference repeats the sign-out sentence here. This says what deleting actually does. -->
      <ActionRow
        title="Delete account"
        description="Permanently remove your account and its data. This cannot be undone."
      >
        <button
          type="button"
          :class="
            cn(
              PROFILE_PILL,
              'border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive',
            )
          "
        >
          <NavIcon name="trash" class="size-4" />
          Delete account
        </button>
      </ActionRow>
    </div>
  </div>
</template>
