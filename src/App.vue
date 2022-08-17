<script setup lang="ts">
import Timeline from "@/components/Timeline.vue";
import { usePosts } from "@/stores/posts";

const postsStore = usePosts();
</script>

<template>
  {{ postsStore.foo }}
  <button @click="postsStore.updateFoo('yolo')"></button>
  <div class="section">
    <div class="container">
      <Timeline></Timeline>
    </div>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>
