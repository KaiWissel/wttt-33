<script setup lang="ts">
import type { User } from ".prisma/client";
import { Ref, ref } from "vue";
import type { UserResponse } from "../../types/User";
import LoadMore from "../tables/parts/LoadMore.vue";
import TableActionColumn from "../tables/parts/TableActionColumn.vue";
import { fetchDelete, fetchGet } from "../../utils/fetchClient";
import ConfirmModal from "../modals/BaseModal.vue";
import UserModal from "./UserModal.vue";
import { removeObjectFromArrayByProperty } from "../../utils/arrayHelper";

let DEFAULT_TAKE = 10;

const addEditModal = ref<any>();
const confirmModal = ref<any>();

const isDeleting = ref(false);

const selectedUser = ref<User | undefined>(undefined);

const users: Ref<UserResponse> = ref([]);
const disableLoad = ref(false);

const confirmErrorMessage = ref("");

await loadFirst();

async function loadFirst() {
  users.value = await fetchData(DEFAULT_TAKE);
}

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
  selectedUser.value = user;
  toggleAddEditModal();
}

function onDeleteEntry(entry: User) {
  selectedUser.value = entry;
  confirmModal.value.toggleModal();
}

function toggleAddEditModal(isNew?: boolean) {
  if (isNew) selectedUser.value = undefined;
  addEditModal.value.toggleModal(isNew);
}

function toggleConfirmModal() {
  confirmModal.value.toggleModal();
}

async function deleteUser() {
  if (!selectedUser.value) return;
  try {
    isDeleting.value = true;
    await deleteRequest(selectedUser.value.id);
    removeObjectFromArrayByProperty(users.value, "id", selectedUser.value.id);
    toggleConfirmModal();
  } catch (error) {
    console.log(error);
    confirmErrorMessage.value = new String(error).toString();
  } finally {
    isDeleting.value = false;
  }
}

async function deleteRequest(id: String) {
  await fetchDelete(`users/${id}`);
}
</script>

<template>
  <button @click="toggleAddEditModal(true)">Neuen Nutzer anlegen</button>
  <div>
    <hr />
    <div class="grid">
      <input type="text" placeholder="Name" />
      <input type="text" placeholder="Klasse" />
      <input type="text" placeholder="Jahrgang" />
      <input type="text" placeholder="UID" />
      <button class="secondary">Filter</button>
    </div>
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
  <UserModal
    ref="addEditModal"
    :users="users"
    :selected-user="selectedUser"
    @updatedEntry="loadFirst"
  />
  <ConfirmModal
    ref="confirmModal"
    @confirmed="deleteUser"
    modal-id="confirm-delete-user-modal"
    modal-title="Nutzer löschen"
    :is-waiting="isDeleting"
    :is-dangerous="true"
    :error-message="confirmErrorMessage"
    >Möchtest du den Nutzer {{ selectedUser?.firstName }}
    {{ selectedUser?.lastName }} wirklich löschen?</ConfirmModal
  >
</template>
