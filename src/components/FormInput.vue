<script setup lang="ts">
defineProps<{
  name: string;
}>();
</script>

<template>
  <div class="field">
    <label class="label" :for="name">{{ name }}</label>
    <div class="control"><input class="input" type="text" /></div>
  </div>
</template>
