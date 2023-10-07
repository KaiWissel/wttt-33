<template>
  <div>
    <select :value="modelValue" @change="onChange">
      <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
      <option v-for="option in options">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: any;
  placeholder?: string;
  options: readonly string[];
}>();

const emits = defineEmits(["update:modelValue"]);

function onChange(event: Event) {
  const eventTarget = event.target as HTMLInputElement;
  const value = eventTarget?.value;
  console.log("change", value);
  emits("update:modelValue", value);
}
</script>
