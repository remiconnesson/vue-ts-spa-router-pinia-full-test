import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import NewPost from "@/views/NewPost.vue";
import { useUsers } from "@/stores/users";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/posts/new",
      name: "new-post",
      component: NewPost,
      beforeEnter: () => {
        const usersStore = useUsers();

        if (!usersStore.currentUserId) {
          console.log("guard hit");
          return {
            name: "home",
          };
        }
      },
    },
  ],
});
