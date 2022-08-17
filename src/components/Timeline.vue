<script setup lang="ts">
import { ref, computed } from "vue";
import TimelineItem from "@/components/TimelineItem.vue";
import { DateTime } from "luxon";
import { today, thisWeek, thisMonth } from "@/posts";
import type { TimelinePost } from "@/posts";

// This allows us to create a type from the value of this array.
const periods = ["Today", "This Week", "This Month"] as const;

type Period = typeof periods[number];

const selectedPeriod = ref<Period>("Today");

function selectPeriod(period: Period) {
  selectedPeriod.value = period;
}

const posts: TimelinePost[] = [today, thisWeek, thisMonth].map((post) => {
  return {
    ...post,
    created: DateTime.fromISO(post.created),
  };
});

const filteredPosts = computed<TimelinePost[]>(() => {
  return posts.filter((post) => {
    if (selectedPeriod.value === "Today") {
      return post.created >= DateTime.now().minus({ day: 1 });
    } else if (selectedPeriod.value === "This Week") {
      return post.created >= DateTime.now().minus({ day: 7 });
    } else if (selectedPeriod.value === "This Month") {
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
        :class="{ 'is-active': period === selectedPeriod }"
        @click="selectPeriod(period)"
        href="#"
        >{{ period }}</a
      >
    </span>
    <TimelineItem v-for="post of filteredPosts" :key="post.id" :post="post" />
  </nav>
</template>
