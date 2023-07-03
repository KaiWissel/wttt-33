<template>
  <BaseModal
    modal-id="modal-add-edit-user"
    :modal-title="selectedUser ? 'Nutzer bearbeiten' : 'Nutzer erstellen'"
    :disable-confirm="disableConfirm"
    @confirmed="onConfirm"
    :error-message="errorMessage"
    :is-waiting="isWaiting"
    ref="modal"
  >
    <TextInput
      v-model="firstName"
      v-model:is-validation-invalid="firstNameValidation"
      placeholder="Vorname"
      :validation="notEmpty"
    />
    <TextInput
      v-model="lastName"
      v-model:is-validation-invalid="lastNameValidation"
      placeholder="Nachname"
      :validation="notEmpty"
    />
    <BaseSelect
      v-model="course"
      :options="courseOptions"
      placeholder="Bitte wähle einen Kurs aus"
    />
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from "../modals/BaseModal.vue";
import TextInput from "../inputs/TextInput.vue";
import BaseSelect from "../inputs/BaseSelect.vue";
import { computed, ref, watchEffect } from "vue";
import { fetchGet, fetchPost, fetchPut } from "../../utils/fetchClient";
import type { UserAddEditType } from "../../types/User";
import type { User, Course } from ".prisma/client";
import type { UserResponse } from "../../types/User";
import { notEmpty } from "../../utils/validationRegExp";

const props = defineProps<{
  users: UserResponse;
  selectedUser?: User;
}>();

defineExpose({
  toggleModal,
});

const emits = defineEmits(["updatedEntry"]);

const modal = ref<any>();

const firstName = ref("");
const firstNameValidation = ref(true);
const lastName = ref("");
const lastNameValidation = ref(true);
const uId = ref("");

const courseObjects = ref<Course[]>([]);
const courseOptions = ref<string[]>([]);
const course = ref("");

const errorMessage = ref("");
const isWaiting = ref(false);

fetchCourses();

watchEffect(() => {
  console.log("Update modal");

  if (!props.selectedUser) {
    clearFields();
    return;
  }

  firstName.value = props.selectedUser?.firstName;
  lastName.value = props.selectedUser?.lastName;
  uId.value = "" + props.selectedUser?.uId;
});

// watchEffect(() => {
//   if (courseExists({ shortName: type.value, year: +year.value })) {
//     errorMessage.value = "Dieser Kurs existiert bereits";
//   } else {
//     errorMessage.value = "";
//   }
// });

const disableConfirm = computed(() => {
  return firstNameValidation.value || lastNameValidation.value;
});

function clearFields() {
  firstName.value = "";
  lastName.value = "";
  uId.value = "";
}

function toggleModal(isNew?: boolean) {
  modal.value.toggleModal();
}

async function onConfirm() {
  const functionToCall = props.selectedUser ? updateRequest : postRequest;
  try {
    isWaiting.value = true;
    await functionToCall();
    toggleModal();
    clearFields();
    emits("updatedEntry");
  } catch (error: any) {
    console.log(error);
    errorMessage.value = error;
  } finally {
    isWaiting.value = false;
  }
}

async function fetchCourses() {
  courseObjects.value = (await fetchGet("courses")) as Course[];
  courseOptions.value = courseObjects.value.map(
    (c) => c.courseTypeShortName + " " + c.year
  );
}

async function postRequest() {
  const res = await fetchPost<UserAddEditType>(`users`, {
    firstName: firstName.value,
    lastName: lastName.value,
    courseId: findCourseId(course.value),
    status: "",
    uId: "",
  });
}

async function updateRequest() {
  // if (!props.selectedUser) return;
  // const responseData = await fetchPut<UserAddEditType>(
  //   `users/${props.selectedUser.id}`,
  //   {}
  // );
  // emits("updatedEntry");

  console.log("Update request user");
}

function findCourseId(courseOption: string) {
  const courseObject = courseObjects.value.find(
    (c) =>
      courseOption.includes(c.courseTypeShortName) &&
      courseOption.includes("" + c.year)
  );

  if (courseObject == null) {
    throw `No course matching ${courseOption} found`;
  }

  return courseObject.id;
}
</script>
