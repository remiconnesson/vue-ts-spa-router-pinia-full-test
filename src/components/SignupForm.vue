<script setup lang="ts">
import { ref, computed } from "vue";
import type { Status } from "@/validation";
import { validate, required, length } from "@/validation";
import FormInput from "@/components/FormInput.vue";

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
</script>

<template>
  <form class="form">
    <FormInput name="Username" v-model="username" :status="usernameStatus" />
    <FormInput name="Password" v-model="password" :status="passwordStatus" />
  </form>
</template>

<style scoped>
.form {
  background: white;
  padding: 30px;
  margin-top: 50px;
}
</style>
