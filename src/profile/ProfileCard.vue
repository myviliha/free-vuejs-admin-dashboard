<script setup lang="ts">
import { DEMO_PROFILE_FIELDS, DEMO_USER, PROFILE_CARD, type ProfileField } from "@viliha/vui-core";
import { Avatar, AvatarFallback, AvatarImage } from "@viliha/vui-vue";
import { computed, ref } from "vue";

import EditButton from "./EditButton.vue";
import EditDialog from "./EditDialog.vue";
import ReadOnlyField from "./ReadOnlyField.vue";
import SocialRow from "./SocialRow.vue";

/**
 * The identity card: avatar, name, role and location, then the personal fields and the socials.
 *
 * The newer design folds what used to be a separate "Personal Information" card into this one, which
 * is the better call: a name and the fields that spell that name out are one subject, and splitting
 * them put an Edit button on each half of the same thing.
 */
const open = ref(false);
// Starts at the supplied portrait: an avatar demo whose avatar is two letters is showing the
// fallback, not the component.
const photo = ref<string | null>(DEMO_USER.photo);
const fields = ref<ProfileField[]>(DEMO_PROFILE_FIELDS.map((field) => ({ ...field })));

const shown = computed(() => fields.value.filter((f) => f.section === "Personal Information"));
</script>

<template>
  <div :class="PROFILE_CARD">
    <div class="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
      <div class="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
        <Avatar class="size-[112px] shrink-0 border border-border">
          <AvatarImage v-if="photo" :src="photo" alt="" />
          <AvatarFallback class="text-2xl font-medium">{{ DEMO_USER.initials }}</AvatarFallback>
        </Avatar>

        <div class="text-center sm:text-left">
          <h4 class="text-xl font-semibold">John Doe</h4>
          <div class="mt-1 flex flex-col items-center gap-1 sm:flex-row sm:gap-3">
            <p class="text-[15px] text-muted-foreground">Team Manager</p>
            <!-- Only once the row is horizontal: stacked, it would be a stray dash between lines. -->
            <div aria-hidden="true" class="hidden h-4 w-px bg-border sm:block" />
            <p class="text-[15px] text-muted-foreground">Singapore</p>
          </div>
        </div>
      </div>

      <EditButton @click="open = true" />
    </div>

    <!-- The reference's grid: two columns for the names, four for the rest, so a phone number and a
         bio do not each get half a page. -->
    <div class="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <ReadOnlyField
        v-for="field in shown.slice(0, 2)"
        :key="field.label"
        :label="field.label"
        :value="field.value"
        :full="field.full"
      />
    </div>
    <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <ReadOnlyField
        v-for="field in shown.slice(2)"
        :key="field.label"
        :label="field.label"
        :value="field.value"
        :full="field.full"
      />
      <SocialRow />
    </div>

    <EditDialog
      title="Personal Information"
      :open="open"
      :fields="fields"
      :photo="photo"
      with-photo
      @close="open = false"
      @save="fields = $event"
      @update:photo="photo = $event"
    />
  </div>
</template>
