<script setup lang="ts">
import SuspenseWrapper from "../tables/SuspenseWrapper.vue";
import CourseTable from "./CourseTable.vue";
</script>

<template>
  <SuspenseWrapper>
    <CourseTable />
  </SuspenseWrapper>
</template>
