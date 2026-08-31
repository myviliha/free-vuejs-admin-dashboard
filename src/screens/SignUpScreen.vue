<script setup lang="ts">
import { Button, Checkbox, Input, Label, PasswordInput, StatusField } from "@viliha/vui-vue";
import { ref } from "vue";

import { to } from "../router";

import AuthLayout from "../AuthLayout.vue";
import AuthParts from "../AuthParts.vue";
import { RULES, useAuth } from "../auth-form";

/**
 * Sign up, on the reference's structure.
 *
 * **A minimum length is stated here and not on sign-in**, and the asymmetry is the point: telling
 * somebody a *new* password is too short reveals nothing about any account.
 *
 * The terms checkbox is a real gate. Theirs renders the same box and submits whether it is ticked or
 * not, which makes the consent decorative.
 */
const form = useAuth({
  first: RULES.required("First name"),
  last: RULES.required("Last name"),
  email: RULES.email,
  password: RULES.password,
});
const agreed = ref(false);
const nagged = ref(false);

const FIELDS = [
  { key: "first", id: "signup-first", label: "First Name", placeholder: "Ada", type: "text", autocomplete: "given-name" },
  { key: "last", id: "signup-last", label: "Last Name", placeholder: "Okafor", type: "text", autocomplete: "family-name" },
] as const;

function onSubmit() {
  // The consent gate runs first and independently: an unticked box is not a field error, so it does not
  // belong in the rules table.
  if (!agreed.value) {
    nagged.value = true;
    return;
  }
  form.submit();
}
</script>

<template>
  <AuthLayout>
    <AuthParts verb="Sign up">
      <template #heading>
        <div class="mb-5 sm:mb-8">
          <h1 class="mb-2 text-2xl font-semibold sm:text-3xl">Sign Up</h1>
          <p class="text-sm text-muted-foreground">Enter your details below to create an account.</p>
        </div>
      </template>

      <div v-if="form.done.value" class="rounded-2xl border border-success/40 bg-success/10 p-6 text-center">
        <p class="font-semibold text-success">Account created</p>
        <p class="mt-1 text-sm text-muted-foreground">
          There is no server behind this demo, so this is where the welcome email would go out.
        </p>
      </div>

      <template v-else>
        <form novalidate class="space-y-5" @submit.prevent="onSubmit">
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div v-for="field in FIELDS" :key="field.key">
              <Label :for="field.id" class="mb-1.5 block text-sm font-medium">
                {{ field.label }} <span aria-hidden="true" class="text-destructive">*</span>
              </Label>
              <StatusField
                :state="form.errors.value[field.key] ? 'error' : undefined"
                :message="form.errors.value[field.key]"
                message-below
              >
                <Input
                  :id="field.id"
                  :autocomplete="field.autocomplete"
                  :placeholder="field.placeholder"
                  :model-value="form.values.value[field.key]"
                  required
                  @update:model-value="form.set(field.key, String($event))"
                />
              </StatusField>
            </div>
          </div>

          <div>
            <Label for="signup-email" class="mb-1.5 block text-sm font-medium">
              Email <span aria-hidden="true" class="text-destructive">*</span>
            </Label>
            <StatusField :state="form.errors.value.email ? 'error' : undefined" :message="form.errors.value.email" message-below>
              <Input
                id="signup-email"
                type="email"
                autocomplete="email"
                placeholder="info@gmail.com"
                :model-value="form.values.value.email"
                required
                @update:model-value="form.set('email', String($event))"
              />
            </StatusField>
          </div>

          <div>
            <Label for="signup-password" class="mb-1.5 block text-sm font-medium">
              Password <span aria-hidden="true" class="text-destructive">*</span>
            </Label>
            <StatusField :state="form.errors.value.password ? 'error' : undefined" :message="form.errors.value.password" message-below>
              <PasswordInput
                id="signup-password"
                autocomplete="new-password"
                placeholder="At least eight characters"
                :model-value="form.values.value.password"
                required
                @update:model-value="form.set('password', String($event))"
              />
            </StatusField>
          </div>

          <label class="flex cursor-pointer items-start gap-3 text-sm">
            <Checkbox
              v-model="agreed"
              class="mt-0.5"
              @change="nagged = agreed ? false : nagged"
            />
            <span class="text-muted-foreground">
              By creating an account you agree to the
              <span class="text-foreground">Terms and Conditions</span> and our
              <span class="text-foreground">Privacy Policy</span>.
            </span>
          </label>
          <p v-if="nagged" role="alert" class="text-sm text-destructive">
            Please accept the terms before creating an account.
          </p>

          <Button type="submit" variant="primary" size="lg" class="w-full">Sign Up</Button>
        </form>
        <p class="mt-5 text-center text-sm text-muted-foreground sm:text-start">
          Already have an account?
          <a :href="to('/signin')" class="text-primary underline-offset-2 hover:underline">Sign In</a>
        </p>
      </template>
    </AuthParts>
  </AuthLayout>
</template>
