<script setup lang="ts">
import type { User } from ".prisma/client";
import { Ref, ref } from "vue";
import type { UserFilterOption, UserResponse } from "../../types/User";
import LoadMore from "../tables/LoadMore.vue";
import TableActionColumn from "../tables/TableActionColumn.vue";
import { fetchDelete, fetchGet } from "../../utils/fetchClient";
import ConfirmModal from "../modals/BaseModal.vue";
import UserModal from "./UserModal.vue";
import Filter from "./Filter.vue";
import { removeObjectFromArrayByProperty } from "../../utils/arrayHelper";
import { useDeleteEntry } from "../tables/EditDeleteEntry";

let DEFAULT_TAKE = 50;

const addEditModal = ref<any>();
const confirmModal = ref<any>();

const isLoading = ref(false);

const users: Ref<UserResponse[]> = ref([]);
const disableLoad = ref(false);

const {
  confirmErrorMessage,
  isDeleting,
  selectedEntry,
  onEditEntry,
  onDeleteEntry,
  deleteEntry,
  toggleAddEditModal,
} = useDeleteEntry<User>(addEditModal, confirmModal, deleteUserFunction);

await loadFirst();

async function loadFirst(filterOptions?: UserFilterOption) {
  users.value = await fetchData(DEFAULT_TAKE, 0, filterOptions);
}

async function loadMore() {
  const res = await fetchData(DEFAULT_TAKE, users.value.length);

  if (!res.length) {
    disableLoad.value = true;
    return;
  }

  users.value = users.value.concat(res);
}

async function fetchData(
  take: number = DEFAULT_TAKE,
  skip: number = 0,
  filterOptions?: UserFilterOption
) {
  try {
    isLoading.value = true;
    let query = `skip=${skip}&take=${take}`;

    for (const key in filterOptions) {
      // @ts-ignore
      const element = filterOptions[key];
      if (!element) continue;
      query += `&${key}=${element}`;
    }

    return (await fetchGet(`users?${query}`)) as UserResponse[];
  } catch (error) {
    console.log("Error while loading data");
    return [];
  } finally {
    isLoading.value = false;
  }
}

async function deleteUserFunction(selectedEntry: Ref<User>) {
  await fetchDelete(`users/${selectedEntry.value.id}`);
  removeObjectFromArrayByProperty(users.value, "id", selectedEntry.value.id);
}

async function onFilterTable(filterOptions: UserFilterOption) {
  loadFirst(filterOptions);
}
</script>

<template>
  <button @click="toggleAddEditModal(true)">Neuen Nutzer anlegen</button>

  <div>
    <hr />
    <Filter @filter-table="onFilterTable" />
  </div>

  <div v-if="isLoading" aria-busy="true"></div>
  <table v-else-if="users.length">
    <thead>
      <tr>
        <th scope="col">Nachname</th>
        <th scope="col">Vorname</th>
        <th scope="col">Klasse</th>
        <th scope="col">UID</th>
        <th class="table-action-col"></th>
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
            @editEntry="onEditEntry"
          />
        </td>
      </tr>
    </tbody>
  </table>
  <h4 v-else>Es wurden keine Einträge gefunden</h4>
  <LoadMore @loadMore="loadMore" :disable-load="disableLoad" />
  <UserModal
    ref="addEditModal"
    :users="users"
    :selected-user="selectedEntry"
    @updatedEntry="loadFirst"
  />
  <ConfirmModal
    ref="confirmModal"
    @confirmed="deleteEntry"
    modal-id="confirm-delete-user-modal"
    modal-title="Nutzer löschen"
    :is-waiting="isDeleting"
    :is-dangerous="true"
    :error-message="confirmErrorMessage"
    >Möchtest du den Nutzer {{ selectedEntry?.firstName }}
    {{ selectedEntry?.lastName }} wirklich löschen?</ConfirmModal
  >
</template>
