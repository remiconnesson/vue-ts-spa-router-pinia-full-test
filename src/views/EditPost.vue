<script setup lang="ts">
import type { Post } from "@/posts";
import PostWriter from "@/components/PostWriter.vue";
import { useRoute, useRouter } from "vue-router";
import { usePosts } from "@/stores/posts";

const route = useRoute();
const router = useRouter();
const postsStore = usePosts();

const id = route.params.id as string;
const post = postsStore.all.get(id);

if (!post) {
  throw new Error(`Post with ${id} was not found.`);
}

async function handleSubmit(post: Post) {
  await postsStore.updatePost(post);
  router.push(`/posts/${id}`);
}
</script>

<template>
  Edit Post
  <PostWriter :post="post" @submit="handleSubmit" />
</template>
