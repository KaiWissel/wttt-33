<template>
  <BaseModal
    modal-id="modal-add-edit-course"
    :modal-title="selectedCourse ? 'Klasse bearbeiten' : 'Klasse erstellen'"
    button-text="Neue Klasse anlegen"
    :disable-confirm="disableConfirm"
    @confirmed="onConfirm"
    :error-message="errorMessage"
    :is-waiting="isWaiting"
    ref="modal"
  >
    <BaseSelect
      v-model="type"
      :options="typeOptions"
      options-key="shortName"
      placeholder="Bitte wähle einen Typ aus"
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
import BaseSelect from "../inputs/BaseSelect.vue";
import { computed, ref, watchEffect } from "vue";
import { fetchGet, fetchPost, fetchPut } from "../../utils/fetchClient";
import type { CourseRequestType } from "../../types/Courses";
import type { Course, CourseType } from ".prisma/client";

const props = defineProps<{
  courses: Course[];
  selectedCourse?: Course;
}>();

defineExpose({
  toggleModal,
});

const emits = defineEmits(["updatedEntry"]);

const modal = ref<any>();

const typeOptions = ref<string[]>([]);
const type = ref("");

const year = ref("");
const yearValidation = new RegExp(/^20\d{2}$/);
const isYearValidationInvalid = ref(true);

const errorMessage = ref("");
const isWaiting = ref(false);

fetchTypes();

watchEffect(() => {
  if (!props.selectedCourse) {
    type.value = "";
    year.value = "";
    return;
  }

  type.value = props.selectedCourse?.courseTypeShortName;
  year.value = "" + props.selectedCourse?.year;
});

watchEffect(() => {
  if (courseExists({ shortName: type.value, year: +year.value })) {
    errorMessage.value = "Dieser Kurs existiert bereits";
  } else {
    errorMessage.value = "";
  }
});

const disableConfirm = computed(() => {
  return (
    isYearValidationInvalid.value ||
    courseExists({ shortName: type.value, year: +year.value })
  );
});

function toggleModal() {
  modal.value.toggleModal();
}

async function onConfirm() {
  const functionToCall = props.selectedCourse ? updateRequest : postRequest;
  try {
    isWaiting.value = true;
    await functionToCall();
    toggleModal();
  } catch (error: any) {
    console.log(error);
    errorMessage.value = error;
  } finally {
    isWaiting.value = false;
  }
}

async function fetchTypes() {
  const typeObjects = (await fetchGet("courses/types")) as CourseType[];
  typeOptions.value = typeObjects.map((t) => t.shortName);
}

async function postRequest() {
  const responseData = await fetchPost(`courses`, {
    shortName: type.value,
    year: +year.value,
  });
  emits("updatedEntry");
}

async function updateRequest() {
  if (!props.selectedCourse) return;
  const responseData = await fetchPut(`courses/${props.selectedCourse.id}`, {
    shortName: type.value,
    year: +year.value,
  });
  emits("updatedEntry");
}

function courseExists(requestBody: CourseRequestType) {
  const found = props.courses.find(
    (c) =>
      c.courseTypeShortName == requestBody.shortName &&
      c.year == requestBody.year
  );
  return found ? true : false;
}
</script>