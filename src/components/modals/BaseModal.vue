<template>
  <div>
    <button @click="toggleModal" :data-target="modalId">
      {{ buttonText }}
    </button>
  </div>

  <!-- Modal -->
  <dialog :id="modalId">
    <article>
      <a
        href="#close"
        aria-label="Close"
        class="close"
        :data-target="modalId"
        @click="toggleModal"
      >
      </a>
      <h3>{{ modalTitle }}</h3>
      <slot></slot>
      <footer>
        <a
          href="#cancel"
          role="button"
          class="secondary"
          :data-target="modalId"
          @click="toggleModal"
        >
          Abbrechen
        </a>
        <a
          href="#confirm"
          role="button"
          :data-target="modalId"
          @click="onConfirm"
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
  buttonText: { type: String, required: true },
  disableConfirm: { type: Boolean, default: undefined },
});
const emit = defineEmits(["confirmed"]);

function onConfirm(event: Event) {
  toggleModal(event);
  emit("confirmed");
}

// Config
const isOpenClass = "modal-is-open";
const openingClass = "modal-is-opening";
const closingClass = "modal-is-closing";
const animationDuration = 400; // ms
let visibleModal: HTMLElement | null = null;

// Toggle modal
const toggleModal = (event: Event) => {
  event.preventDefault();
  const target = event.currentTarget as HTMLButtonElement;
  const dataTarget = target.getAttribute("data-target");
  if (!dataTarget) throw "No data-target on button specified";
  const modal = document.getElementById(dataTarget);
  if (!modal) throw "No modal found with id " + dataTarget;
  typeof modal != "undefined" && modal != null && isModalOpen(modal)
    ? closeModal(modal)
    : openModal(modal);
};

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
const closeModal = (modal: HTMLElement) => {
  visibleModal = null;
  document.documentElement.classList.add(closingClass);
  setTimeout(() => {
    document.documentElement.classList.remove(closingClass, isOpenClass);
    document.documentElement.style.removeProperty("--scrollbar-width");
    modal.removeAttribute("open");
  }, animationDuration);
};

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

<style scoped></style>
