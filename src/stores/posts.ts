import { defineStore } from "pinia";
import type { Post, TimelinePost } from "@/posts";
import { today, thisWeek, thisMonth } from "@/posts";
import type { Period } from "@/constants";
import { DateTime } from "luxon";

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
  // getters are like computed properties
  getters: {
    filteredPosts: (state): TimelinePost[] => {
      return state.ids
        .map((id) => {
          const post = state.all.get(id);

          if (!post) {
            throw Error(`Post with id ${id} was expected but not found.`);
          }

          return {
            ...post,
            created: DateTime.fromISO(post.created),
          };
        })
        .filter((post) => {
          if (state.selectedPeriod === "Today") {
            return post.created >= DateTime.now().minus({ day: 1 });
          } else if (state.selectedPeriod === "This Week") {
            return post.created >= DateTime.now().minus({ day: 7 });
          } else if (state.selectedPeriod === "This Month") {
            return post.created >= DateTime.now().minus({ day: 30 });
          }
        });
    },
  },
});
