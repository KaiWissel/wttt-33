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

import type { User } from ".prisma/client";
import { ref } from "vue";
import type { UserResponse } from "../../types/User";
import LoadMore from "../tables/parts/LoadMore.vue";
import TableActionColumn from "../tables/parts/TableActionColumn.vue";

let DEFAULT_TAKE = 10;

const { PUBLIC_API_URL } = import.meta.env;

const users = ref(await fetchData(DEFAULT_TAKE));
const disableLoad = ref(false);

async function loadMore() {
  const res = await fetchData(DEFAULT_TAKE, users.value.length);

  if (!res.length) {
    disableLoad.value = true;
    return;
  }

  users.value = users.value.concat(res);
}

async function fetchData(take: number, skip: number = 0) {
  const response = await fetch(
    `${PUBLIC_API_URL}/api/users?skip=${skip}&take=${take}`
  );
  return (await response.json()) as UserResponse;
}

function editUser(user: User) {
  console.log("edituser: " + user.firstName);
}
function deleteUser(user: User) {
  console.log("deleteuser: " + user.firstName);
}
</script>

<template>
  <button>Neuen Nutzer anlegen</button>
  <div class="grid">
    <input type="text" placeholder="Name" />
    <input type="text" placeholder="Klasse" />
    <input type="text" placeholder="Jahrgang" />
    <input type="text" placeholder="UID" />
  </div>

  <table v-if="users.length">
    <thead>
      <tr>
        <th scope="col">Nachname</th>
        <th scope="col">Vorname</th>
        <th scope="col">Klasse</th>
        <th scope="col">UID</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users">
        <td>{{ user.lastName }}</td>
        <td>{{ user.firstName }}</td>
        <td>
          {{ user.course?.courseTypeShortName + " " + user.course?.year }}
        </td>
        <td>{{ user.uId }}</td>
        <td>
          <TableActionColumn
            :data="user"
            @deleteEntry="deleteUser"
            @editEntry="editUser"
          />
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else>Loading...</div>
  <LoadMore @loadMore="loadMore" :disable-load="disableLoad" />
</template>
