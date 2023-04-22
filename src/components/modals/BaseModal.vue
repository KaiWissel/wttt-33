<template>
  <!-- Modal -->
  <dialog :id="modalId">
    <article>
      <a href="#close" aria-label="Close" class="close" @click="toggleModal">
      </a>
      <h3>{{ modalTitle }}</h3>
      <slot></slot>
      <label v="if" class="error-label">
        {{ errorMessage }}
      </label>
      <div v-if="isWaiting" class="loader"></div>
      <footer>
        <a href="#cancel" role="button" class="secondary" @click="toggleModal">
          Abbrechen
        </a>
        <a
          href="#confirm"
          role="button"
          :class="isDangerous ? 'btn-danger' : undefined"
          @click="$emit('confirmed')"
          :disabled="disableConfirm ? true : undefined"
        >
          OK
        </a>
      </footer>
    </article>
  </dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  modalId: { type: String, required: true },
  modalTitle: { type: String, required: true },
  disableConfirm: { type: Boolean, default: undefined },
  errorMessage: { type: String, default: undefined },
  isWaiting: { type: Boolean, default: false },
  isDangerous: { type: Boolean, default: false },
});

defineEmits(["confirmed"]);

defineExpose({
  toggleModal,
});

// Config
const isOpenClass = "modal-is-open";
const openingClass = "modal-is-opening";
const closingClass = "modal-is-closing";
const animationDuration = 400; // ms
let visibleModal: HTMLElement | null = null;

// Toggle modal
function toggleModal() {
  const modal = document.getElementById(props.modalId);
  if (!modal) throw "No modal found with id " + props.modalId;
  typeof modal != "undefined" && modal != null && isModalOpen(modal)
    ? closeModal(modal)
    : openModal(modal);
}

// Is modal open
const isModalOpen = (modal: HTMLElement) => {
  return modal.hasAttribute("open") && modal.getAttribute("open") != "false"
    ? true
    : false;
};

// Open modal
const openModal = (modal: HTMLElement) => {
  if (isScrollbarVisible()) {
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${getScrollbarWidth()}px`
    );
  }
  document.documentElement.classList.add(isOpenClass, openingClass);
  setTimeout(() => {
    visibleModal = modal;
    document.documentElement.classList.remove(openingClass);
  }, animationDuration);
  modal.setAttribute("open", "true");
};

// Close modal
function closeModal(modal: HTMLElement) {
  visibleModal = null;
  document.documentElement.classList.add(closingClass);
  setTimeout(() => {
    document.documentElement.classList.remove(closingClass, isOpenClass);
    document.documentElement.style.removeProperty("--scrollbar-width");
    modal.removeAttribute("open");
  }, animationDuration);
}

// Close with a click outside
document.addEventListener("click", (event) => {
  if (visibleModal != null) {
    const modalContent = visibleModal.querySelector("article");
    const isClickInside = modalContent?.contains(event.target as Node);
    !isClickInside && closeModal(visibleModal);
  }
});

// Close with Esc key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && visibleModal != null) {
    closeModal(visibleModal);
  }
});

// Get scrollbar width
const getScrollbarWidth = () => {
  // Creating invisible container
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll"; // forcing scrollbar to appear
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement("div");
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  outer.parentNode?.removeChild(outer);

  return scrollbarWidth;
};

// Is scrollbar visible
const isScrollbarVisible = () => {
  return document.body.scrollHeight > screen.height;
};
</script>
