<script setup lang="ts">
import SuspenseWrapper from "../base/tables/SuspenseWrapper.vue";
import CourseTable from "./CourseTable.vue";
</script>

<template>
  <SuspenseWrapper>
    <CourseTable />
  </SuspenseWrapper>
</template>
