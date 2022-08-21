<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import type { Post, TimelinePost } from "@/posts";
import { marked } from "marked";
import highlightjs from "highlight.js";
import { debounce } from "lodash";
import { usePosts } from "@/stores/posts";
import { useRouter } from "vue-router";

const props = defineProps<{
  post: TimelinePost | Post;
}>();

const title = ref(props.post.title);
const content = ref(props.post.markdown);
const contentEditable = ref<HTMLDivElement>();
const html = ref("");
const posts = usePosts();
const router = useRouter();

// Will update html preview when content.value is updated
watchEffect(() => {
  marked.parse(
    content.value,
    {
      gfm: true,
      breaks: true,
      highlight: (code) => {
        return highlightjs.highlightAuto(code).value; // not a ref
      },
    },
    (err, parseResult) => {
      html.value = parseResult;
    }
  );
});

onMounted(() => {
  if (!contentEditable.value) {
    throw Error("ContentEditable DOM node was not found");
  }
  contentEditable.value.innerText = content.value;
});

/* debounce will avoid calling the parse function too often */
const handleInput = debounce(() => {
  if (!contentEditable.value) {
    throw Error("ContentEditable DOM node was not found");
  }
  content.value = contentEditable.value.innerText;
}, 250);

async function handleClick() {
  let createdAt: string;
  if (typeof props.post.created === "string") {
    createdAt = props.post.created;
  } else {
    // luxon.DateTime
    createdAt = props.post.created.toISO();
  }

  const newPost: Post = {
    ...props.post,
    title: title.value,
    markdown: content.value,
    html: html.value,
    created: createdAt,
  };

  await posts.createPost(newPost);
  router.push({ name: "home" });
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">New Post</div>
        <input class="input" type="text" v-model="title" />
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <div contenteditable ref="contentEditable" @input="handleInput" />
    </div>
    <div class="column"><div id="preview" v-html="html" /></div>
  </div>
  <div class="columns">
    <div class="column">
      <button class="button is-primary is-pulled-right" @click="handleClick">
        Save Post
      </button>
    </div>
  </div>
</template>

<style>
ul {
  list-style: revert !important;
  list-style-position: inside !important;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: revert !important;
  margin: 10px 0 !important;
}

pre {
  margin: 10px 0 !important;
}

p {
  margin: 10px 0 !important;
}
</style>
