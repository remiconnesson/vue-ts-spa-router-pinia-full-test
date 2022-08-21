<script setup lang="ts">
import { useModal } from "@/composables/modal";
import { useUsers } from "@/stores/users";

const modal = useModal();
const usersStore = useUsers();
</script>

<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <RouterLink :to="{ name: 'home' }" class="button">Home</RouterLink>
        <div v-if="usersStore.currentUserId">
          <RouterLink :to="{ name: 'new-post' }" class="button"
            >New Post</RouterLink
          >
          <button class="button" @click="usersStore.logout">Logout</button>
        </div>
        <div v-else>
          <button class="button" @click="modal.showModal('signUp')">
            Sign Up
          </button>
          <button class="button" @click="modal.showModal('signIn')">
            Sign In
          </button>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="#modal">
    <component :is="modal.component.value"></component>
  </Teleport>
</template>
