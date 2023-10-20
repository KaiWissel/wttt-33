<script setup lang="ts">
import { computed, ref, type Ref } from "vue";

const isFilterActive = ref(false);

interface FilterOptions {
  [name: string]: {
    placeholder: string;
    value: string;
  };
}

const props = defineProps<{
  filterConfiguration: FilterOptions;
}>();

const filterOptions = ref({ ...props.filterConfiguration });

const emit = defineEmits(["filterTable"]);

function clear() {
  Object.values(filterOptions.value).forEach((v) => (v.value = ""));
  isFilterActive.value = false;
  emit("filterTable", []);
}

function onFilter() {
  isFilterActive.value = true;
  emit("filterTable", flattenFilterOptions(filterOptions));
}

const isDisabled = computed(() => {
  return !Object.values(filterOptions.value).some((f) => f.value);
});

function flattenFilterOptions(filterOptions: Ref<FilterOptions>) {
  const initObj: {
    [name: string]: string;
  } = {};

  return Object.entries(filterOptions.value).reduce((acc, cur) => {
    const fieldName = cur[0];
    acc[fieldName] = cur[1].value;
    return acc;
  }, initObj);
}
</script>

<template>
  <div class="grid">
    <input
      v-for="option in filterOptions"
      v-model="option.value"
      type="text"
      :placeholder="option.placeholder"
      @keyup.enter="onFilter"
    />
    <button @click="onFilter" class="secondary" :disabled="isDisabled">
      Filter
      <a
        v-show="isFilterActive"
        href="#"
        @click.stop="clear"
        style="margin-left: 1rem"
      >
        <img class="zoom-on-hover" src="assets/clearicon.svg" alt="Delete" />
      </a>
    </button>
  </div>
</template>

<style scoped></style>
