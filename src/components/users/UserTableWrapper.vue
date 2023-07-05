<script setup lang="ts">
import UserTable from "./UserTable.vue";
import SuspenseWrapper from "../tables/SuspenseWrapper.vue";
</script>

<template>
  <SuspenseWrapper>
    <UserTable />
  </SuspenseWrapper>
</template>
