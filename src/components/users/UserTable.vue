<script setup lang="ts">
import type { User } from ".prisma/client";
import { ref } from "vue";
import type { UserResponse } from "../../types/User";
import LoadMore from "../tables/parts/LoadMore.vue";
import TableActionColumn from "../tables/parts/TableActionColumn.vue";
import { fetchGet } from "../../utils/fetchClient";
import ConfirmModal from "../modals/BaseModal.vue";

let DEFAULT_TAKE = 10;

const addEditModal = ref<any>();
const confirmModal = ref<any>();

const isDeleting = ref(false);

const selectedUser = ref<User | undefined>(undefined);

const users = ref(await fetchData());
const disableLoad = ref(false);

async function loadMore() {
  const res = await fetchData(DEFAULT_TAKE, users.value.length);

  if (!res.length) {
    disableLoad.value = true;
    return;
  }

  users.value = users.value.concat(res);
}

async function fetchData(take: number = DEFAULT_TAKE, skip: number = 0) {
  return (await fetchGet(`users?skip=${skip}&take=${take}`)) as UserResponse;
}

function editUser(user: User) {
  console.log("edituser: " + user.firstName);
}

function onDeleteEntry(entry: User) {
  selectedUser.value = entry;
  confirmModal.value.toggleModal();
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
            @deleteEntry="onDeleteEntry"
            @editEntry="editUser"
          />
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else>Loading...</div>
  <LoadMore @loadMore="loadMore" :disable-load="disableLoad" />
  <ConfirmModal
    ref="confirmModal"
    @confirmed="deleteUser"
    modal-id="confirm-delete-user-modal"
    modal-title="Nutzer löschen"
    :is-waiting="isDeleting"
    :is-dangerous="true"
    >Möchtest du die Klasse {{ selectedUser?.firstName }}
    {{ selectedUser?.lastName }} wirklich löschen?</ConfirmModal
  >
</template>
