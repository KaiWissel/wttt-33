<script setup lang="ts">
import TableBookingImpl from "./TableBookingImpl.vue";
</script>

<template>
  <suspense>
    <template #default>
      <TableBookingImpl />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </suspense>
</template>
