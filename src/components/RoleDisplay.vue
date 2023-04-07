<template>
  <div class="role-icon">
    <a href="/">{{ loggedInRole?.charAt(0) }}</a>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import { getLoggedInRole } from "../utils/handleLoginToken";

const loggedInRole: Ref<string | null> = ref(null);

onMounted(() => {
  // Because of hydration errors we have to call DOM changing effects only after the component was successfully mounted
  loggedInRole.value = getLoggedInRole();
});
</script>
<style scoped>
.role-icon {
  min-width: 50px;
  min-height: 50px;
  background-color: var(--secondary);
  border-radius: 100%;
  text-align: center;
  padding: 10px 0;
}

.role-icon:hover {
  background-color: var(--primary);
}

.role-icon > a:link {
  color: whitesmoke;
}

.role-icon > a:visited {
  color: whitesmoke;
}
</style>
