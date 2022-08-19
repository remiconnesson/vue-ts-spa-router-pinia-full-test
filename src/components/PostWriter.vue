<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import type { TimelinePost } from "@/posts";
import { marked } from "marked";
import highlightjs from "highlight.js";

const props = defineProps<{
  post: TimelinePost;
}>();

const title = ref(props.post.title);
const content = ref(props.post.markdown);
const contentEditable = ref<HTMLDivElement>();
const html = ref("");

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

function handleInput() {
  if (!contentEditable.value) {
    throw Error("ContentEditable DOM node was not found");
  }
  content.value = contentEditable.value.innerText;
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
    <div class="column"><div v-html="html" /></div>
  </div>
</template>
