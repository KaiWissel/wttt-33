<script setup lang="ts">
import UserTable from "./UserTable.vue";
</script>

<template>
  <suspense>
    <template #default>
      <UserTable />
    </template>
    <template #fallback>
      <div aria-busy="true"></div>
    </template>
  </suspense>
</template>
