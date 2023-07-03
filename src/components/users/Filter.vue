<script setup lang="ts">
import { reactive, ref } from "vue";

const isFilterActive = ref(false);

const filterOptions = reactive({
  firstName: "",
  lastName: "",
  courseType: "",
  year: "",
  uId: "",
});

const emit = defineEmits(["filterTable"]);

function clear() {
  filterOptions.firstName = "";
  filterOptions.lastName = "";
  filterOptions.courseType = "";
  filterOptions.year = "";
  filterOptions.uId = "";

  isFilterActive.value = false;
  emit("filterTable", filterOptions);
}

function onFilter() {
  isFilterActive.value = true;
  emit("filterTable", filterOptions);
}
</script>

<template>
  <div class="grid">
    <input
      v-model="filterOptions.lastName"
      type="text"
      placeholder="Nachname"
    />
    <input
      v-model="filterOptions.firstName"
      type="text"
      placeholder="Vorname"
    />
    <input
      v-model="filterOptions.courseType"
      type="text"
      placeholder="Klasse"
    />
    <input v-model="filterOptions.year" type="text" placeholder="Jahrgang" />
    <input v-model="filterOptions.uId" type="text" placeholder="UID" />
    <button @click="onFilter" class="secondary">
      Filter
      <a
        v-show="isFilterActive"
        href="#"
        @click.prevent="clear"
        style="margin-left: 1rem"
      >
        <img class="zoom-on-hover" src="assets/clearicon.svg" alt="Delete" />
      </a>
    </button>
  </div>
</template>

<style scoped></style>
