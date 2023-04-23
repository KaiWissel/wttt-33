<script setup lang="ts">
import BookingTable from "./BookingTable.vue";
</script>

<template>
  <suspense>
    <template #default>
      <BookingTable />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </suspense>
</template>
