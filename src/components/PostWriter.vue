<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { TimelinePost } from "@/posts";
const props = defineProps<{
  post: TimelinePost;
}>();

const title = ref(props.post.title);

const contentEditable = ref<HTMLDivElement>();

onMounted(() => {
  console.log(contentEditable.value?.innerText);
});
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
      <div contenteditable ref="contentEditable">This is editable</div>
    </div>
    <div class="column">Preview</div>
  </div>
</template>
