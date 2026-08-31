<script setup lang="ts">
import { PROFILE_CARD, cn, type ProfileField } from "@viliha/vui-core";
import { ref } from "vue";

import EditButton from "./EditButton.vue";
import EditDialog from "./EditDialog.vue";
import ReadOnlyField from "./ReadOnlyField.vue";

/** A card of fields with an Edit that opens the same fields in a dialog. */
const props = withDefaults(
  defineProps<{ title: string; fields: readonly ProfileField[]; columns?: 1 | 2 }>(),
  { columns: 2 },
);

const values = ref<ProfileField[]>(props.fields.map((field) => ({ ...field })));
const open = ref(false);
</script>

<template>
  <div :class="PROFILE_CARD">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <h4 class="text-lg font-semibold">{{ title }}</h4>
      <EditButton @click="open = true" />
    </div>
    <div :class="cn('mt-6 grid grid-cols-1 gap-6', columns === 2 && 'sm:grid-cols-2 sm:gap-x-8')">
      <ReadOnlyField
        v-for="field in values"
        :key="field.label"
        :label="field.label"
        :value="field.value"
        :full="field.full"
      />
    </div>

    <EditDialog
      :title="title"
      :open="open"
      :fields="values"
      @close="open = false"
      @save="values = $event"
    />
  </div>
</template>
