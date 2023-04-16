<template>
  <BaseModal
    modal-id="modal-add-edit-course"
    modal-title="Klassen"
    button-text="Neue Klasse anlegen"
    :disable-confirm="disableConfirm"
    @confirmed="onConfirm"
  >
    <TextInput
      v-model="type"
      v-model:is-validation-invalid="isTypeValidationInvalid"
      placeholder="Art"
      :validation="typeValidation"
    />
    <TextInput
      v-model="year"
      v-model:is-validation-invalid="isYearValidationInvalid"
      placeholder="Jahrgang"
      :validation="yearValidation"
    />
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from "./BaseModal.vue";
import TextInput from "../inputs/TextInput.vue";
import { computed, ref, watchEffect } from "vue";

const type = ref("");
const typeValidation = new RegExp(/^\w{3}$/);
const isTypeValidationInvalid = ref(true);

const year = ref("");
const yearValidation = new RegExp(/^20\d{2}$/);
const isYearValidationInvalid = ref(true);

const disableConfirm = computed(() => {
  return isTypeValidationInvalid.value || isYearValidationInvalid.value;
});

function onConfirm() {
  console.log("modal confirm");
}
</script>
<style scoped></style>
