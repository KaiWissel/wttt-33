<script setup lang="ts">
import type { Course } from ".prisma/client";
import { ref } from "vue";
import TableActionColumn from "../tables/parts/TableActionColumn.vue";
import Modal from "./CourseModal.vue";
import { removeObjectByProperty } from "../../utils/arrayHelper";

let DEFAULT_TAKE = 10;

const { PUBLIC_API_URL } = import.meta.env;

const courses = ref(await fetchData(DEFAULT_TAKE));

async function fetchData(take: number, skip: number = 0) {
  const response = await fetch(
    `${PUBLIC_API_URL}/api/courses?skip=${skip}&take=${take}`
  );
  return (await response.json()) as Course[];
}
function handleNewEntry(course: Course) {
  courses.value.push(course);
}
function editCourse(course: Course) {
  console.log("edituser: " + course.courseTypeShortName);
}
async function deleteCourse(course: Course) {
  try {
    await deleteEntry(course.id);
    removeObjectByProperty(courses.value, "id", course.id);
  } catch (error) {
    console.log(error);
  }
}

async function deleteEntry(id: String) {
  const url = `${PUBLIC_API_URL}/api/courses/${id}`;
  return await fetch(url, {
    method: "DELETE",
  });
}
</script>

<template>
  <Modal :courses="courses" @newEntry="handleNewEntry" />
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
            @deleteEntry="deleteCourse"
            @editEntry="editCourse"
          />
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else>Loading...</div>
</template>
