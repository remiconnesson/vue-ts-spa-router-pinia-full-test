<script setup lang="ts">
import { computed } from "vue";
import TimelineItem from "@/components/TimelineItem.vue";
import { DateTime } from "luxon";
import type { TimelinePost } from "@/posts";
import { usePosts } from "@/stores/posts";
// import type { Period } from "@/constants";
import { periods } from "@/constants";

// Stores
const postsStore = usePosts();

const filteredPosts = computed<TimelinePost[]>(() => {
  return postsStore.ids
    .map((id) => {
      const post = postsStore.all.get(id);

      if (!post) {
        throw Error(`Post with id ${id} was expected but not found.`);
      }

      return {
        ...post,
        created: DateTime.fromISO(post.created),
      };
    })
    .filter((post) => {
      if (postsStore.selectedPeriod === "Today") {
        return post.created >= DateTime.now().minus({ day: 1 });
      } else if (postsStore.selectedPeriod === "This Week") {
        return post.created >= DateTime.now().minus({ day: 7 });
      } else if (postsStore.selectedPeriod === "This Month") {
        return post.created >= DateTime.now().minus({ day: 30 });
      }
    });
});
</script>

<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period of periods"
        :key="period"
        :class="{ 'is-active': period === postsStore.selectedPeriod }"
        @click="postsStore.setSelectedPeriod(period)"
        href="#"
        >{{ period }}</a
      >
    </span>
    <TimelineItem v-for="post of filteredPosts" :key="post.id" :post="post" />
  </nav>
</template>
