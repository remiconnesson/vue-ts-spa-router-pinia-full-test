<script setup lang="ts">
import PostWriter from "@/components/PostWriter.vue";
import type { TimelinePost } from "@/posts";
import { DateTime } from "luxon";
import { useUsers } from "@/stores/users";

const usersStore = useUsers();
if (!usersStore.currentUserId) {
  throw Error("User not found yet required for this operation");
}

const post: TimelinePost = {
  id: "-1",
  title: "Title",
  author: usersStore.currentUserId,
  created: DateTime.now(),
  markdown: "## Title",
  html: "<h2>Title</h2>",
};
</script>

<template>
  <PostWriter :post="post"></PostWriter>
</template>
