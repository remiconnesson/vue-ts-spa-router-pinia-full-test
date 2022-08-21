<script setup lang="ts">
import PostWriter from "@/components/PostWriter.vue";
import { useRoute } from "vue-router";
import { usePosts } from "@/stores/posts";

const route = useRoute();
const postsStore = usePosts();

const id = route.params.id as string;
const post = postsStore.all.get(id);

if (!post) {
  throw new Error(`Post with ${id} was not found.`);
}
</script>

<template>
  Edit Post
  <PostWriter :post="post" />
</template>
