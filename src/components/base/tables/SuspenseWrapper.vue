<!-- Unfortunately it's still necessary to use a second wrapper for the specific table,  -->
<!-- because we can't use the slot option in the astro component without losing the reactifity  -->
<!-- or facing suspense errors  -->
<template>
  <suspense>
    <template #default>
      <slot></slot>
    </template>
    <template #fallback>
      <div aria-busy="true"></div>
    </template>
  </suspense>
</template>
