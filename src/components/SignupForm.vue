<script setup lang="ts">
import { ref, computed } from "vue";
import type { Status } from "@/validation";
import { validate, required, length } from "@/validation";
import FormInput from "@/components/FormInput.vue";
import type { NewUser } from "@/users";
import { useUsers } from "@/stores/users";
import { useModal } from "@/composables/modal";

const usersStore = useUsers();
const modal = useModal();

const username = ref("");
const usernameStatus = computed<Status>(() => {
  const usernameRules = [required, length({ min: 4, max: 30 })];
  return validate(username.value, usernameRules);
});

const password = ref("");
const passwordStatus = computed<Status>(() => {
  const passwordRules = [required, length({ min: 8, max: 30 })];
  return validate(password.value, passwordRules);
});

const isInvalid = computed(() => {
  return !(usernameStatus.value.valid && passwordStatus.value.valid);
});

async function handleSubmit() {
  if (isInvalid.value) return;
  const newUser: NewUser = {
    username: username.value,
    password: password.value,
  };

  await usersStore.createUser(newUser);

  modal.hideModal();
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <FormInput name="Username" v-model="username" :status="usernameStatus" />
    <FormInput name="Password" v-model="password" :status="passwordStatus" />
    <button class="button" :disabled="isInvalid">Submit</button>
  </form>
</template>

<style scoped>
.form {
  background: white;
  padding: 30px;
  margin-top: 50px;
}
</style>
