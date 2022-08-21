<script setup lang="ts">
import PostWriter from "@/components/PostWriter.vue";
import type { TimelinePost, Post } from "@/posts";
import { DateTime } from "luxon";
import { useUsers } from "@/stores/users";
import { usePosts } from "@/stores/posts";
import { useRouter } from "vue-router";

const router = useRouter();

const usersStore = useUsers();
if (!usersStore.currentUserId) {
  throw Error("User not found yet required for this operation");
}

const postsStore = usePosts();

const post: TimelinePost = {
  id: "-1",
  title: "Title",
  author: usersStore.currentUserId,
  created: DateTime.now(),
  markdown: "## Title",
  html: "<h2>Title</h2>",
};

async function handleSubmit(post: Post) {
  await postsStore.createPost(post);
  router.push({ name: "home" });
}
</script>

<template>
  <PostWriter :post="post" @submit="handleSubmit"></PostWriter>
</template>
