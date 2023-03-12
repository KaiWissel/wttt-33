<script setup lang="ts">
// defineProps({./TableUserImpl.vue
//   results: {
//     type: Array,
//     required: true,
//   },
//   maxFlights: {
//     type: Number,
//     required: true,
//   },

import type { Course } from ".prisma/client";
import { ref } from "vue";
import type { CourseResponse } from "../../types/Courses";
import LoadMore from "./parts/LoadMore.vue";
import TableActionColumn from "./parts/TableActionColumn.vue";

let DEFAULT_TAKE = 10;

const courses = ref(await fetchData(DEFAULT_TAKE));
const disableLoad = ref(false);

// async function loadMore() {
//   const res = await fetchData(DEFAULT_TAKE, courses.value.length);

//   if (!res.length) {
//     disableLoad.value = true;
//     return;
//   }

//   courses.value = courses.value.concat(res);
// }

async function fetchData(take: number, skip: number = 0) {
  const response = await fetch(
    `http://localhost:3000/api/courses?skip=${skip}&take=${take}`
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
  <!-- <LoadMore @loadMore="loadMore" :disable-load="disableLoad" /> -->
</template>
