import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import NewPost from "@/views/NewPost.vue";
import { useUsers } from "@/stores/users";
import { usePosts } from "@/stores/posts";
import ShowPost from "@/views/ShowPost.vue";
import EditPost from "@/views/EditPost.vue";

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
    {
      path: "/posts/:id",
      component: ShowPost,
    },
    {
      path: "/posts/:id/edit",
      component: EditPost,
      beforeEnter: (to) => {
        const usersStore = useUsers();
        const postsStore = usePosts();

        console.log(to);
        const post = postsStore.all.get(to.params.id as string);

        if (!post) {
          return { name: "home" };
        }

        if (!usersStore.currentUserId) {
          return { name: "home" };
        }
        if (post.author !== usersStore.currentUserId) {
          return { name: "home" };
        }
      },
    },
  ],
});
