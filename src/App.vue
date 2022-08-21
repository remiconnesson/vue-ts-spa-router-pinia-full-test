<script setup lang="ts">
import { computed } from "vue";
import Navbar from "@/components/Navbar.vue";
import { useModal } from "@/composables/modal";

const modal = useModal();

const modalStyle = computed(() => {
  return {
    display: modal.show.value ? "block" : "none",
  };
});
</script>

<template>
  <div class="modal" :style="modalStyle" style="color: white">
    <div class="modal-background">
      <div class="modal-content">
        <div id="modal"></div>
      </div>
    </div>
    <button class="modal-close is-large" @click="modal.hideModal">
      CLOSE THE MODAL
    </button>
  </div>
  <div class="section">
    <div class="container">
      <Navbar></Navbar>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
/*syntax highlight style*/
@import "highlight.js/styles/atom-one-dark.css";
</style>
