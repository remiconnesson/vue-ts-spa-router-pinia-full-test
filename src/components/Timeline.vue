<script setup lang="ts">
import { ref, computed } from "vue";
import { DateTime } from "luxon";
import { today, thisWeek, thisMonth } from "../posts";

// This allows us to create a type from the value of this array.
const periods = ["Today", "This Week", "This Month"] as const;

type Period = typeof periods[number];

const selectedPeriod = ref<Period>("Today");

function selectPeriod(period: Period) {
  selectedPeriod.value = period;
}

const posts = [today, thisWeek, thisMonth].map((post) => {
  return {
    ...post,
    created: DateTime.fromISO(post.created),
  };
});

const filteredPosts = computed(() => {
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
    <a v-for="post of filteredPosts" :key="post.id" class="panel-block">
      <a>{{ post.title }}</a>
      <div>{{ post.created.toFormat("d MMM") }}</div>
    </a>
  </nav>
</template>
