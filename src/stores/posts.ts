import { defineStore } from "pinia";
import type { Post } from "@/posts";
import { today, thisWeek, thisMonth } from "@/posts";
import type { Period } from "@/constants";

interface PostsState {
  ids: string[];
  all: Map<string, Post>;
  selectedPeriod: Period;
}

export const usePosts = defineStore("posts", {
  state: (): PostsState => ({
    ids: [today.id, thisWeek.id, thisMonth.id],
    all: new Map([
      [today.id, today],
      [thisWeek.id, thisWeek],
      [thisMonth.id, thisMonth],
    ]),
    selectedPeriod: "Today",
  }),
  actions: {
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period;
    },
  },
});
