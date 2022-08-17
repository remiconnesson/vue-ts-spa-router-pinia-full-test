import { defineStore } from "pinia";

interface PostsState {
  foo: string;
}

export const usePosts = defineStore("posts", {
  state: (): PostsState => ({
    foo: "foo",
  }),
  actions: {
    updateFoo(foo: string) {
      // this.$state.foo = foo
      this.foo = foo;
    },
  },
});
