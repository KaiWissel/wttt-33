<script setup lang="ts">
import type { Course } from ".prisma/client";
import { ref } from "vue";
import type { CourseResponse } from "../../types/Courses";
import TableActionColumn from "./parts/TableActionColumn.vue";

let DEFAULT_TAKE = 10;

const { PUBLIC_API_URL } = import.meta.env;

const courses = ref(await fetchData(DEFAULT_TAKE));

async function fetchData(take: number, skip: number = 0) {
  const response = await fetch(
    `${PUBLIC_API_URL}/api/courses?skip=${skip}&take=${take}`
  );
  return (await response.json()) as CourseResponse;
}

function editCourse(course: Course) {
  console.log("edituser: " + course.courseTypeShortName);
}
function deleteCourse(course: Course) {
  console.log("deleteuser: " + course.courseTypeShortName);
}
</script>

<template>
  <button>Neue Klasse anlegen</button>

  <table>
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
</template>
