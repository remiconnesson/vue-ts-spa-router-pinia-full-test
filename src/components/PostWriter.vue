<script setup lang="ts">
import type { TimelinePost } from "@/posts";
const props = defineProps<{
  post: TimelinePost;
}>();
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post Title</div>
        <input class="input" type="text" />
        <p>{{ props }}</p>
      </div>
    </div>
  </div>
</template>
