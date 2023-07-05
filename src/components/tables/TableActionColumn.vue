<script setup lang="ts">
defineProps({
  data: { type: Object, required: true },
});
</script>

<template>
  <div class="grid">
    <div>
      <a href="#" @click.prevent="$emit('editEntry', data)"
        ><img class="zoom-on-hover" src="assets/editicon.svg" alt="Edit"
      /></a>
    </div>
    <div>
      <a href="#" @click.prevent="$emit('deleteEntry', data)">
        <img class="zoom-on-hover" src="assets/deleteicon.svg" alt="Delete"
      /></a>
    </div>
  </div>
</template>

<style scoped>
img {
  min-width: 16px;
}

.grid {
  justify-items: end;
  grid-column-gap: 2rem;
}
</style>
