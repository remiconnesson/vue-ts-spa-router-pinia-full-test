<script setup lang="ts">
import { ref } from "vue";
import UserForm from "@/components/UserForm.vue";
import { useUsers } from "@/stores/users";
import type { NewUser } from "@/users";
import { useModal } from "@/composables/modal";

const usersStore = useUsers();
const modal = useModal();

const error = ref("");

async function handleSubmit(newUser: NewUser) {
  error.value = "";

  const body = JSON.stringify(newUser);
  const result = await window.fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if ([401].includes(result.status)) {
    error.value = "Username or Password Incorrect";
  } else {
    usersStore.authenticate();
    modal.hideModal();
  }
}
</script>

<template>
  <UserForm :error="error" @submit="handleSubmit" />
</template>
