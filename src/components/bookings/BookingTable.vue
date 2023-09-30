<script setup lang="ts">
import { type Ref, ref } from "vue";
import LoadMore from "../tables/LoadMore.vue";
import type { BookingResponse } from "../../types/Booking";
import { fetchDelete, fetchGet } from "../../utils/fetchClient";
import { useDeleteEntry } from "../tables/EditDeleteEntry";
import { removeObjectFromArrayByProperty } from "../../utils/arrayHelper";
import TableActionColumn from "../tables/TableActionColumn.vue";
import ConfirmModal from "../modals/BaseModal.vue";

let DEFAULT_TAKE = 25;

const isLoading = ref(false);

const bookings = ref(await fetchData(DEFAULT_TAKE));
const disableLoad = ref(false);

const addEditModal = ref<any>();
const confirmModal = ref<any>();

const {
  confirmErrorMessage,
  isDeleting,
  selectedEntry,
  onEditEntry,
  deleteEntry,
  onDeleteEntry,
  toggleAddEditModal,
} = useDeleteEntry<BookingResponse>(
  addEditModal,
  confirmModal,
  deleteBookingFunction
);

async function loadMore() {
  const res = await fetchData(DEFAULT_TAKE, bookings.value.length);

  if (!res.length) {
    disableLoad.value = true;
    return;
  }

  bookings.value = bookings.value.concat(res);
}

async function fetchData(take: number, skip: number = 0) {
  try {
    isLoading.value = true;
    return (await fetchGet(
      `bookings?skip=${skip}&take=${take}`
    )) as BookingResponse[];
  } catch (error) {
    console.log("Error while loading data");
    return [];
  } finally {
    isLoading.value = false;
  }
}

async function deleteBookingFunction(selectedEntry: Ref<BookingResponse>) {
  await fetchDelete(`bookings/${selectedEntry.value.id}`);
  //^?
  removeObjectFromArrayByProperty(bookings.value, "id", selectedEntry.value.id);
}
</script>

<template>
  <div class="grid">
    <input type="text" placeholder="Von (11.11.2011)" />
    <input type="text" placeholder="Bis (12.12.2012)" />
    <input type="text" placeholder="Klasse" />
    <input type="text" placeholder="Standort" />
  </div>

  <div v-if="isLoading" aria-busy="true"></div>
  <table v-else-if="bookings.length">
    <thead>
      <tr>
        <th scope="col">Datum</th>
        <th scope="col">Uhrzeit</th>
        <th scope="col">Name</th>
        <th scope="col">Aktion</th>
        <th scope="col">Klasse</th>
        <th scope="col">Standort</th>
        <th></th>
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
        <td>
          <TableActionColumn
            :data="b"
            @deleteEntry="onDeleteEntry"
            @editEntry="onEditEntry"
          />
        </td>
      </tr>
    </tbody>
  </table>
  <h4 v-else>Es wurden keine Einträge gefunden</h4>
  <LoadMore @loadMore="loadMore" :disable-load="disableLoad" />
  <!-- <UserModal
    ref="addEditModal"
    :users="users"
    :selected-user="selectedEntry"
    @updatedEntry="loadFirst"
  /> -->
  <confirmModal
    ref="confirmModal"
    @confirmed="deleteEntry"
    modal-id="confirm-delete-booking-modal"
    modal-title="Nutzer löschen"
    :is-waiting="isDeleting"
    :is-dangerous="true"
    :error-message="confirmErrorMessage"
    >Möchtest du den Eintrag von {{ selectedEntry?.user.firstName }}
    {{ selectedEntry?.user.lastName }} wirklich löschen?</confirmModal
  >
</template>
