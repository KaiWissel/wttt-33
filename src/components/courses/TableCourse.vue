<script setup lang="ts">
import TableCourseImpl from "./TableCourseImpl.vue";
</script>

<template>
  <suspense>
    <template #default>
      <TableCourseImpl />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </suspense>
</template>
