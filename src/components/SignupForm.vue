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

  try {
    await usersStore.createUser(newUser);
  } catch (e) {
    error.value = "there was an error";
  }

  modal.hideModal();
}
</script>

<template>
  <UserForm :error="error" @submit="handleSubmit" />
</template>
