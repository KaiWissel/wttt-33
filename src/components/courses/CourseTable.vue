<script setup lang="ts">
import type { Course } from ".prisma/client";
import { ref } from "vue";
import TableActionColumn from "../tables/parts/TableActionColumn.vue";
import CourseModal from "./CourseModal.vue";
import { removeObjectFromArrayByProperty } from "../../utils/arrayHelper";
import ConfirmModal from "../modals/BaseModal.vue";
import { fetchGet, fetchDelete } from "../../utils/fetchClient";

let DEFAULT_TAKE = 10;

const addEditModal = ref<any>();
const confirmModal = ref<any>();

const isDeleting = ref(false);

const selectedCourse = ref<Course | undefined>(undefined);

const courses = ref(await fetchData());

async function fetchData(take: number = DEFAULT_TAKE, skip: number = 0) {
  return (await fetchGet(`courses?skip=${skip}&take=${take}`)) as Course[];
}

function onDeleteEntry(course: Course) {
  selectedCourse.value = course;
  confirmModal.value.toggleModal();
}

function onEditCourse(course: Course) {
  selectedCourse.value = course;
  toggleAddEditModal();
}

function toggleAddEditModal(isNew?: boolean) {
  if (isNew) selectedCourse.value = undefined;
  addEditModal.value.toggleModal(isNew);
}

function toggleConfirmModal() {
  confirmModal.value.toggleModal();
}

async function deleteCourse() {
  if (!selectedCourse.value) return;
  try {
    isDeleting.value = true;
    await deleteRequest(selectedCourse.value.id);
    removeObjectFromArrayByProperty(
      courses.value,
      "id",
      selectedCourse.value.id
    );
    toggleConfirmModal();
  } catch (error) {
    console.log(error);
  } finally {
    isDeleting.value = false;
  }
}

async function deleteRequest(id: String) {
  await fetchDelete(`courses/${id}`);
}
</script>

<template>
  <div>
    <button @click="toggleAddEditModal(true)">Neue Klasse anlegen</button>
  </div>
  <table v-if="courses.length">
    <thead>
      <tr>
        <th scope="col">Art</th>
        <th scope="col">Jahrgang</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="c in courses">
        <td>{{ c.courseTypeShortName }}</td>
        <td>{{ c.year }}</td>
        <td>
          <TableActionColumn
            :data="c"
            @deleteEntry="onDeleteEntry"
            @editEntry="onEditCourse"
          />
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else>Loading...</div>
  <CourseModal
    ref="addEditModal"
    :courses="courses"
    :selected-course="selectedCourse"
    @updatedEntry="fetchData"
  />
  <ConfirmModal
    ref="confirmModal"
    @confirmed="deleteCourse"
    modal-id="confirm-delete-course-modal"
    modal-title="Klasse löschen"
    :is-waiting="isDeleting"
    :is-dangerous="true"
    >Möchtest du die Klasse {{ selectedCourse?.courseTypeShortName }}
    {{ selectedCourse?.year }} wirklich löschen?</ConfirmModal
  >
</template>
