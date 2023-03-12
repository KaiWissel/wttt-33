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

import { ref } from "vue";
import LoadMore from "./parts/LoadMore.vue";
import type { BookingResponse } from "../../types/Booking";

let DEFAULT_TAKE = 25;

const bookings = ref(await fetchData(DEFAULT_TAKE));
const disableLoad = ref(false);

async function loadMore() {
  const res = await fetchData(DEFAULT_TAKE, bookings.value.length);

  if (!res.length) {
    disableLoad.value = true;
    return;
  }

  bookings.value = bookings.value.concat(res);
}

async function fetchData(take: number, skip: number = 0) {
  const response = await fetch(
    `http://localhost:3000/api/bookings?skip=${skip}&take=${take}`
  );
  return (await response.json()) as BookingResponse;
}
</script>

<template>
  <div class="grid">
    <input type="text" placeholder="Von (11.11.2011)" />
    <input type="text" placeholder="Bis (12.12.2012)" />
    <input type="text" placeholder="Klasse" />
    <input type="text" placeholder="Standort" />
  </div>

  <table>
    <thead>
      <tr>
        <th scope="col">Datum</th>
        <th scope="col">Uhrzeit</th>
        <th scope="col">Name</th>
        <th scope="col">Aktion</th>
        <th scope="col">Klasse</th>
        <th scope="col">Standort</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="b in bookings">
        <td>{{ b.createdAt.slice(0, 10) }}</td>
        <td>{{ b.createdAt.slice(11, 16) }}</td>
        <td>{{ b.user.firstName + " " + b.user.lastName }}</td>
        <td>{{ b.action }}</td>
        <td>
          {{ b.user.course?.courseTypeShortName + " " + b.user.course?.year }}
        </td>
        <td>{{ b.location }}</td>
      </tr>
    </tbody>
  </table>
  <LoadMore @loadMore="loadMore" :disable-load="disableLoad" />
</template>
