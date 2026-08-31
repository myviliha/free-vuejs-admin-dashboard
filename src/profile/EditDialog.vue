<script setup lang="ts">
import { DEMO_USER, type ProfileField } from "@viliha/vui-core";
import { Avatar, AvatarFallback, AvatarImage, Button, Dialog, Input, Label } from "@viliha/vui-vue";
import { computed, ref, watch } from "vue";

import NavIcon from "../NavIcon.vue";

/**
 * The edit dialog every profile card shares.
 *
 * One dialog, one set of measurements. The reference's older checkout duplicated this in all three
 * cards and the copies had already drifted, one carrying a `pr-14` to clear its close button while the
 * others did not.
 *
 * **The draft is copied on open and committed only on save**, so Close discards rather than being a
 * no-op that looks like a cancel: a thing a reader finds out by losing work.
 */
const props = defineProps<{
  title: string;
  open: boolean;
  fields: readonly ProfileField[];
  /** Passing this turns on the Change Profile Picture section. The address card has no picture. */
  photo?: string | null;
  withPhoto?: boolean;
}>();

const emit = defineEmits<{
  close: [];
  save: [fields: ProfileField[]];
  "update:photo": [photo: string | null];
}>();

const draft = ref<ProfileField[]>([...props.fields]);
const fileInput = ref<HTMLInputElement | null>(null);

watch(
  () => props.open,
  (open) => {
    if (open) draft.value = props.fields.map((field) => ({ ...field }));
  },
  { immediate: true },
);

/** The sections, in the order the fields declare them. A field with none belongs to the title's. */
const sections = computed(() => [
  ...new Set(draft.value.map((field) => field.section ?? props.title)),
]);

/**
 * The picture, read locally.
 *
 * **The dialog owns this, not the card**, which is where the reference puts it: changing a photo is
 * editing your profile, so it belongs with the other edits and behind the same Save. A camera badge on
 * the card would change it instantly with no way to cancel, which is a different promise from every
 * other field on the page.
 *
 * There is no server here, so `FileReader` shows the chosen file and a buyer swaps one handler for
 * their upload. A data URL rather than an object URL: the latter needs revoking on unmount to avoid
 * leaking, and holding a demo's bytes costs nothing.
 */
function pickPhoto(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => emit("update:photo", typeof reader.result === "string" ? reader.result : null);
  reader.readAsDataURL(file);
}

function removePhoto() {
  emit("update:photo", null);
  // Clear the input too, or choosing the same file again fires no `change`.
  if (fileInput.value) fileInput.value.value = "";
}

function submit() {
  emit("save", draft.value.map((field) => ({ ...field })));
  emit("close");
}
</script>

<template>
  <Dialog
    :open="open"
    :label="`Edit ${title}`"
    class="max-w-[700px] rounded-3xl p-4 lg:p-11"
    @close="$emit('close')"
  >
    <!-- `pr-14` keeps the heading clear of the close control, which is `Dialog`'s own. -->
    <div class="px-2 pr-14">
      <h4 class="mb-2 text-2xl font-semibold">Edit {{ title }}</h4>
      <p class="mb-6 text-sm text-muted-foreground lg:mb-7">
        Update your details to keep your profile up to date.
      </p>
    </div>

    <!-- A real `<form>`: Enter submits from any field, which a stack of divs silently refuses. -->
    <form class="flex flex-col" novalidate @submit.prevent="submit">
      <div class="vui-scroll max-h-[450px] overflow-y-auto px-2 pb-3">
        <div v-if="withPhoto" class="mb-7">
          <h5 class="mb-6 text-xl font-semibold">Change Profile Picture</h5>
          <!-- Measured off the reference: a 112px circle, the guidance at 16px vertically centred
               beside it, and about forty pixels between the two. -->
          <div class="flex items-center gap-8 sm:gap-10">
            <div class="relative shrink-0">
              <Avatar class="size-[112px] border border-border">
                <AvatarImage v-if="photo" :src="photo" alt="" />
                <AvatarFallback class="text-2xl font-medium">{{ DEMO_USER.initials }}</AvatarFallback>
              </Avatar>
              <!--
                A `label` wrapping a hidden file input, not a button calling `.click()`. The label is
                already the input's control, so it is keyboard reachable and announced as a file picker
                for free, where a button faking it announces nothing.

                `z-20`, above the avatar's image: `AVATAR_IMAGE` is `absolute inset-0 z-10`, so an
                uploaded picture painted straight over this badge and the control disappeared at exactly
                the moment it had something to undo.
              -->
              <label
                class="absolute right-1.5 bottom-1.5 z-20 grid size-9 cursor-pointer place-items-center rounded-full border-2 border-card bg-card text-foreground/70 shadow-sm transition-colors focus-within:ring-2 focus-within:ring-ring hover:text-foreground"
                title="Change profile picture"
              >
                <NavIcon name="camera" class="size-4" aria-hidden="true" />
                <span class="sr-only">Change profile picture</span>
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/jpeg,image/png"
                  class="sr-only"
                  @change="pickPhoto"
                />
              </label>
            </div>
            <div class="text-base leading-relaxed text-muted-foreground">
              <p>Upload a square image (200x200 px)</p>
              <p>in JPEG or PNG format.</p>
              <button
                v-if="photo"
                type="button"
                class="mt-2 cursor-pointer text-sm font-medium text-destructive hover:underline"
                @click="removePhoto"
              >
                Remove picture
              </button>
            </div>
          </div>
        </div>

        <div
          v-for="(section, sectionIndex) in sections"
          :key="section"
          :class="sectionIndex > 0 || withPhoto ? 'mt-7' : undefined"
        >
          <h5 class="mb-5 text-lg font-semibold lg:mb-6">{{ section }}</h5>
          <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <template v-for="(field, index) in draft" :key="field.label">
              <div
                v-if="(field.section ?? title) === section"
                :class="field.full ? 'lg:col-span-2' : undefined"
              >
                <Label :for="`edit-${field.label}`" class="mb-1.5 block text-sm font-medium">
                  {{ field.label }}
                </Label>
                <Input
                  :id="`edit-${field.label}`"
                  :model-value="field.value"
                  @update:model-value="draft[index]!.value = String($event)"
                />
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="mt-6 flex flex-col-reverse gap-3 px-2 lg:flex-row lg:justify-end">
        <Button type="button" variant="outline" size="lg" @click="$emit('close')">Close</Button>
        <Button type="submit" variant="primary" size="lg">Save Changes</Button>
      </div>
    </form>
  </Dialog>
</template>
