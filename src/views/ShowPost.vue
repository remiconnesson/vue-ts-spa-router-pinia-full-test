<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { usePosts } from "@/stores/posts";
import { useUsers } from "@/stores/users";

const route = useRoute();
const postsStore = usePosts();
const usersStore = useUsers();
const id = route.params.id as string;

const post = postsStore.all.get(id);
if (!post) {
  throw Error(`Post with ID (${id}) was not found.`);
}

const canEditThatPost = computed(() => {
  if (!usersStore.currentUserId) {
    return false;
  }
  if (post.author !== usersStore.currentUserId) {
    return false;
  }
  return true;
});
</script>

<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-two-thirds">
      <RouterLink
        v-if="canEditThatPost"
        class="is-link button is-rounder"
        :to="`/posts/${post.id}/edit`"
        >Edit Post</RouterLink
      >
      <h1>{{ post.title }}</h1>
      <div v-html="post.html" />
    </div>
    <div class="column"></div>
  </div>
</template>
