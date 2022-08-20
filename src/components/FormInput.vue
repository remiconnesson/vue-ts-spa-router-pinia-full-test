<script setup lang="ts">
defineProps<{
  name: string;
  modelValue: string;
}>();

defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <div class="field">
    <label class="label" :for="name">{{ name }}</label>
    <div class="control">
      <input
        class="input"
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>
