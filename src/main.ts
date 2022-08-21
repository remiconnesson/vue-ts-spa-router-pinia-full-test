import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "@/router";
import { usePosts } from "@/stores/posts";
import { useUsers } from "@/stores/users";

import App from "@/App.vue";

const app = createApp(App);
app.use(createPinia());

const postsStore = usePosts();
const usersStore = useUsers();

Promise.all([postsStore.fetchPosts(), usersStore.authenticate()]).then(() => {
  app.use(router);
  app.mount("#app");
});
