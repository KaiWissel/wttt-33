import { ref, type Ref } from "vue";

export function useDeleteEntry<T>(
  addEditModal: Ref,
  confirmModal: Ref,
  deleteFunction: Function
) {
  const selectedEntry: Ref<T | undefined> = ref(undefined);
  const isDeleting = ref(false);
  const confirmErrorMessage = ref("");

  // Modals --------------------------------------------

  function toggleAddEditModal(isNew?: boolean) {
    if (isNew) selectedEntry.value = undefined;
    addEditModal.value.toggleModal(isNew);
  }

  function toggleConfirmModal() {
    confirmModal.value.toggleModal();
  }

  // Edit --------------------------------------------

  function editEntry(entry: T) {
    selectedEntry.value = entry;
    toggleAddEditModal();
  }

  // Delete --------------------------------------------

  function onDeleteEntry(entry: T) {
    selectedEntry.value = entry;
    confirmModal.value.toggleModal();
  }

  async function deleteEntry() {
    if (!selectedEntry.value) return;
    try {
      isDeleting.value = true;
      await deleteFunction(selectedEntry);
      toggleConfirmModal();
    } catch (error) {
      console.log(error);
      confirmErrorMessage.value = new String(error).toString();
    } finally {
      isDeleting.value = false;
    }
  }

  return {
    selectedEntry,
    isDeleting,
    confirmErrorMessage,
    editEntry,
    onDeleteEntry,
    deleteEntry,
    toggleAddEditModal,
    toggleConfirmModal,
  };
}
