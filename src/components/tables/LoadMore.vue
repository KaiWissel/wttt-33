<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useElementVisibility } from "@vueuse/core";

const props = defineProps({
  disableLoad: Boolean,
});

const target = ref(null);
const targetIsVisible = useElementVisibility(target);

const emit = defineEmits(["loadMore"]);

watchEffect(() => {
  console.log("Target is visible: ", targetIsVisible.value);
  if (targetIsVisible.value && !props.disableLoad) {
    // TODO: 22/10/23 Update will currently reload whole page.
    // This is not such a nice UX.
    // Therefore only load new data if user forces this.
    // emit("loadMore");
  }
});
</script>

<template>
  <button @click="$emit('loadMore')" ref="target" :disabled="disableLoad">
    Lade mehr Einträge
  </button>
</template>
