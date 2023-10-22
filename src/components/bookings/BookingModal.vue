<template>
  <BaseModal
    modal-id="modal-add-edit-booking"
    :modal-title="selectedBooking ? 'Buchung bearbeiten' : 'Buchung erstellen'"
    :disable-confirm="disableConfirm"
    @confirmed="onConfirm"
    :error-message="errorMessage"
    :is-waiting="isWaiting"
    ref="modal"
  >
    <BaseSelect
      v-model="selectedUser"
      :options="userNames"
      placeholder="Bitte wähle eine Person aus"
    />
    <TextInput
      v-model="date"
      v-model:is-validation-invalid="dateValidation"
      placeholder="Datum (2022-12-12)"
      :validation="dateFormatRegex"
    />
    <TextInput
      v-model="time"
      v-model:is-validation-invalid="timeValidation"
      placeholder="Uhrzeit (13:42)"
      :validation="timeFormatRegex"
    />
    <BaseSelect
      v-model="selectedAction"
      :options="BOOKING_ACTIONS"
      placeholder="Bitte wähle eine Aktion aus"
    />
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from "../base/BaseModal.vue";
import TextInput from "../base/TextInput.vue";
import BaseSelect from "../base/BaseSelect.vue";
import { computed, ref, watchEffect } from "vue";
import { fetchGet, fetchPost, fetchPut } from "../../utils/fetchClient";
import type { User } from ".prisma/client";
import { dateFormatRegex, timeFormatRegex } from "../../utils/validationRegExp";
import type { BookingAddEditType, BookingResponse } from "../../types/Booking";
import { BOOKING_ACTIONS } from "../../types/Booking";
import type { UserResponse } from "../../types/User";
import { retrieveLocaleDate, retrieveLocaleTime } from "../../utils/dateUtils";

const props = defineProps<{
  selectedBooking?: BookingResponse;
}>();

defineExpose({
  toggleModal,
});

const emits = defineEmits(["updatedEntry"]);

const modal = ref<any>();

const date = ref("");
const dateValidation = ref(true);

const time = ref("");
const timeValidation = ref(true);

let users: User[] = [];
const userNames = ref<string[]>([]);
const selectedUser = ref("");

const selectedAction = ref("");

const errorMessage = ref("");
const isWaiting = ref(false);

fetchUsers();

watchEffect(() => {
  console.log("Update modal");

  if (!props.selectedBooking) {
    clearFields();
    return;
  }
  selectedUser.value = createFullUserName(props.selectedBooking.user);
  date.value = retrieveLocaleDate(props.selectedBooking.bookingTime);
  time.value = retrieveLocaleTime(props.selectedBooking.bookingTime);
  selectedAction.value = props.selectedBooking.action;
});

const disableConfirm = computed(() => {
  return (
    !selectedUser.value ||
    !selectedAction.value ||
    dateValidation.value ||
    timeValidation.value
  );
});

function clearFields() {
  selectedUser.value = "";
  selectedAction.value = "";
  time.value = "";
  date.value = "";
}

function toggleModal(isNew?: boolean) {
  modal.value.toggleModal();
}

async function onConfirm() {
  const functionToCall = props.selectedBooking ? updateRequest : postRequest;
  try {
    isWaiting.value = true;
    await functionToCall();
    toggleModal();
    clearFields();
    emits("updatedEntry");
  } catch (error: any) {
    console.log(error);
    errorMessage.value = error;
  } finally {
    isWaiting.value = false;
  }
}

async function fetchUsers() {
  users = (await fetchGet("users")) as User[];
  userNames.value = users.map((u) => createFullUserName(u));
}

async function postRequest() {
  const res = await fetchPost<BookingAddEditType>(`bookings`, {
    action: selectedAction.value,
    location: "Manueller Eintrag",
    userId: findUserId(selectedUser.value),
    bookingTime: createBookingTime(date.value, time.value),
  });
}

async function updateRequest() {
  if (!props.selectedBooking) return;

  const res = await fetchPut<BookingAddEditType>(
    `bookings/${props.selectedBooking.id}`,
    {
      action: selectedAction.value,
      location: "Manuelle Änderung",
      userId: findUserId(selectedUser.value),
      bookingTime: createBookingTime(date.value, time.value),
    }
  );
}

function createFullUserName(user: User | UserResponse) {
  return user.firstName + " " + user.lastName;
}

function createBookingTime(date: string, time: string) {
  return new Date(date + "T" + time).toISOString();
}

function findUserId(fullUserName: string): string {
  // FIXME: This is super ambiguous; Imagine we have two Michael Müller; We need to pass the userId!
  // @ts-ignore
  return users.find(
    (u) =>
      fullUserName.includes(u.firstName) && fullUserName.includes(u.lastName)
  ).id;
}
</script>
