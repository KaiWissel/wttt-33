<script setup lang="ts">
import CourseTable from "./CourseTable.vue";
</script>

<template>
  <suspense>
    <template #default>
      <CourseTable />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </suspense>
</template>
