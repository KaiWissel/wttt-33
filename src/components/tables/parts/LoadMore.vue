<script setup lang="ts">
defineProps({
  disableLoad: Boolean,
});
</script>

<template>
  <button @click="$emit('loadMore')" :disabled="disableLoad">
    Lade mehr Einträge
  </button>
</template>
