<script setup lang="ts">
import { type Ref, ref } from "vue";
import LoadMore from "../base/tables/LoadMore.vue";
import type { BookingFilterOption, BookingResponse } from "../../types/Booking";
import { fetchDelete, fetchGet } from "../../utils/fetchClient";
import { useDeleteEntry } from "../base/tables/EditDeleteEntry";
import { removeObjectFromArrayByProperty } from "../../utils/arrayHelper";
import TableActionColumn from "../base/tables/TableActionColumn.vue";
import ConfirmModal from "../base/BaseModal.vue";
import BookingModal from "./BookingModal.vue";
import Filter from "../base/Filter.vue";
import { retrieveLocaleDate, retrieveLocaleTime } from "../../utils/dateUtils";
import type { FilterOptions } from "../../types/Components";
import { addFilterOptionsToRequest } from "../../utils/requestFilter";

let DEFAULT_TAKE = 25;

const isLoading = ref(false);

const bookings = ref(await fetchData(DEFAULT_TAKE));
const disableLoad = ref(false);

const filterConfiguration: FilterOptions = {
  from: {
    placeholder: "Von (2011-11-11)",
    value: "",
  },
  till: {
    placeholder: "Bis (2012-12-12)",
    value: "",
  },
  name: {
    placeholder: "Name",
    value: "",
  },
  course: {
    placeholder: "Klasse",
    value: "",
  },
  location: {
    placeholder: "Standort",
    value: "",
  },
};

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

await loadFirst();

async function loadFirst(filterOptions?: BookingFilterOption) {
  bookings.value = await fetchData(DEFAULT_TAKE, 0, filterOptions);
}

async function loadMore() {
  const res = await fetchData(DEFAULT_TAKE, bookings.value.length);

  if (!res.length) {
    disableLoad.value = true;
    return;
  }

  bookings.value = bookings.value.concat(res);
}

async function fetchData(
  take: number,
  skip: number = 0,
  filterOptions?: BookingFilterOption
) {
  try {
    isLoading.value = true;
    let query = `skip=${skip}&take=${take}`;
    query = addFilterOptionsToRequest(query, filterOptions);

    return (await fetchGet(`bookings?${query}`)) as BookingResponse[];
  } catch (error) {
    console.log("Error while loading data");
    return [];
  } finally {
    isLoading.value = false;
  }
}

async function deleteBookingFunction(selectedEntry: Ref<BookingResponse>) {
  await fetchDelete(`bookings/${selectedEntry.value.id}`);
  removeObjectFromArrayByProperty(bookings.value, "id", selectedEntry.value.id);
}

// function onEditEntry() {
//   toggleAddEditModal();
// }
async function onFilterTable(filterOptions: BookingFilterOption) {
  loadFirst(filterOptions);
}
</script>

<template>
  <button @click="toggleAddEditModal(true)">
    Manuelle Buchung durchführen
  </button>
  <div>
    <Filter
      @filter-table="onFilterTable"
      :filter-configuration="filterConfiguration"
    />
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
        <td>{{ retrieveLocaleDate(b.bookingTime) }}</td>
        <td>{{ retrieveLocaleTime(b.bookingTime) }}</td>
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
  <BookingModal
    ref="addEditModal"
    :selected-booking="selectedEntry"
    @updatedEntry="loadFirst"
  />
  <ConfirmModal
    ref="confirmModal"
    @confirmed="deleteEntry"
    modal-id="confirm-delete-booking-modal"
    modal-title="Buchung löschen"
    :is-waiting="isDeleting"
    :is-dangerous="true"
    :error-message="confirmErrorMessage"
    >Möchtest du den Eintrag von {{ selectedEntry?.user.firstName }}
    {{ selectedEntry?.user.lastName }} wirklich löschen?</ConfirmModal
  >
</template>
