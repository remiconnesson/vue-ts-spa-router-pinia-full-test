<script setup lang="ts">
import SignupForm from "@/components/SignupForm.vue";
// import { ref } from "vue";
import { useModal } from "@/composables/modal";

const { showModal } = useModal();
</script>

<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <button class="button" @click="showModal">Sign Up</button>
        <RouterLink :to="{ name: 'home' }" class="button">Home</RouterLink>
        <RouterLink :to="{ name: 'new-post' }" class="button"
          >New Post</RouterLink
        >
      </div>
    </div>
  </div>
  <Teleport to="#modal"><SignupForm></SignupForm></Teleport>
</template>
