<template>
  <div>
    <input
      :id="`input-${type}-${placeholder}`"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      @focus="wasFocused = true"
      :aria-invalid="wasFocused && validation ? isInvalid : undefined"
    />
    <label
      v-if="isInvalid"
      class="error-label"
      for="`input-${type}-${placeholder}`"
      >Die Eingabe entspricht nicht der Vorgabe {{ validation }}</label
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  type: { type: String, default: "text" },
  placeholder: { type: String, required: false },
  validation: { type: RegExp, required: false },
  isValidationInvalid: {
    type: Boolean,
    required: false,
  },
});

const emits = defineEmits([
  "update:modelValue",
  "update:isValidationInvalid",
  "validationChanged",
]);

const wasFocused = ref(false);
const isInvalid = ref(false);

watchEffect(() => {
  if (!wasFocused.value) return;
  if (!props.validation) return;

  const match = props.modelValue.toString().match(props.validation);
  if (match) {
    isInvalid.value = false;
    emits("update:isValidationInvalid", false);
    return;
  }

  isInvalid.value = true;
  emits("update:isValidationInvalid", true);
});

function onInput(event: Event) {
  const eventTarget = event.target as HTMLInputElement;
  const value = eventTarget?.value;
  emits("update:modelValue", value);
}
</script>
