<script setup lang="ts">
import { PROFILE_CARD, PROFILE_PILL } from "@viliha/vui-core";
import { Switch } from "@viliha/vui-vue";
import { ref } from "vue";

import NavIcon from "../NavIcon.vue";
import ActionRow from "./ActionRow.vue";

/** Security: the password and the second factor. */
const twoFactor = ref(false);
</script>

<template>
  <div :class="PROFILE_CARD">
    <h4 class="mb-2 text-lg font-semibold">Security</h4>
    <div class="divide-y divide-border">
      <!-- The reference's copy here describes notifications, which is a paste from another row. -->
      <ActionRow
        title="Change Password"
        description="Use a password you do not use anywhere else."
      >
        <button type="button" :class="PROFILE_PILL">
          <NavIcon name="pencil" class="size-4" />
          Change Password
        </button>
      </ActionRow>
      <ActionRow
        title="Two-factor authentication (2FA)"
        description="Keep your account secure by enabling 2FA."
      >
        <Switch v-model="twoFactor" aria-label="Two-factor authentication" />
      </ActionRow>
    </div>
  </div>
</template>
