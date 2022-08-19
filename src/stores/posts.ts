import { defineStore } from "pinia";
import type { Post, TimelinePost } from "@/posts";
import type { Period } from "@/constants";
import { DateTime } from "luxon";

interface PostsState {
  ids: string[];
  all: Map<string, Post>;
  selectedPeriod: Period;
}

// utility function to simulate delay
function delay() {
  return new Promise<void>((res) => setTimeout(res, 1500));
}

export const usePosts = defineStore("posts", {
  state: (): PostsState => ({
    ids: [],
    all: new Map(),
    selectedPeriod: "Today",
  }),
  actions: {
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period;
    },
    async fetchPosts() {
      // fetch
      const res = await window.fetch("http://localhost:8000/posts");
      const data = (await res.json()) as Post[];
      await delay();

      // collect
      const ids: string[] = [];
      const all: Map<string, Post> = new Map();

      for (const post of data) {
        ids.push(post.id);
        all.set(post.id, post);
      }

      // update state
      this.ids = ids;
      this.all = all;
    },
    createPost(post: TimelinePost) {
      console.log(post);
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
