<template>
  <BaseModal
    modal-id="modal-add-edit-course"
    modal-title="Klassen"
    button-text="Neue Klasse anlegen"
    :disable-confirm="disableConfirm"
    @confirmed="onConfirm"
    :error-message="errorMessage"
    :is-waiting="isWaiting"
    ref="modal"
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
import BaseModal from "../modals/BaseModal.vue";
import TextInput from "../inputs/TextInput.vue";
import { computed, ref, watchEffect } from "vue";
import type { NewCourseRequestType } from "../../types/Courses";
import type { Course } from ".prisma/client";

const { PUBLIC_API_URL } = import.meta.env;

const props = defineProps<{
  courses: Course[];
}>();

const emits = defineEmits(["newEntry"]);

const modal = ref<any>();

const type = ref("");
const typeValidation = new RegExp(/^\w{3,5}$/);
const isTypeValidationInvalid = ref(true);

const year = ref("");
const yearValidation = new RegExp(/^20\d{2}$/);
const isYearValidationInvalid = ref(true);

const errorMessage = ref("");
const isWaiting = ref(false);

watchEffect(() => {
  if (courseExists({ shortName: type.value, year: +year.value })) {
    errorMessage.value = "Dieser Kurs existiert bereits";
  } else {
    errorMessage.value = "";
  }
});

const disableConfirm = computed(() => {
  return (
    isTypeValidationInvalid.value ||
    isYearValidationInvalid.value ||
    courseExists({ shortName: type.value, year: +year.value })
  );
});

async function onConfirm() {
  try {
    isWaiting.value = true;
    const responseData = await postRequest({
      shortName: type.value,
      year: +year.value,
    });
    clearCurrentEntries();
    emits("newEntry", responseData);
    modal.value.toggleModal();
  } catch (error: any) {
    console.log(error);
    errorMessage.value = error;
  } finally {
    isWaiting.value = false;
  }
}

async function postRequest(requestBody: NewCourseRequestType) {
  const url = `${PUBLIC_API_URL}/api/courses`;
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  }).then((response) => response.json());
}

function courseExists(requestBody: NewCourseRequestType) {
  const found = props.courses.find(
    (c) =>
      c.courseTypeShortName == requestBody.shortName &&
      c.year == requestBody.year
  );
  return found ? true : false;
}

function clearCurrentEntries() {
  type.value = "";
  year.value = "";
}
</script>
