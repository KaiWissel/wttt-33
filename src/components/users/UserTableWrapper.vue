<script setup lang="ts">
import UserTable from "./UserTable.vue";
</script>

<template>
  <suspense>
    <template #default>
      <UserTable />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </suspense>
</template>
