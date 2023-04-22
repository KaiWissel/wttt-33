<script setup lang="ts">
import TableUserImpl from "./TableUserImpl.vue";
</script>

<template>
  <suspense>
    <template #default>
      <TableUserImpl />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </suspense>
</template>
