<template>
  <div class="edit-popup">
    <p class="text-lg font-medium">{{ props.title }}</p>
    <PrimaryInput
      :placeholder="props.placeholder"
      :model-value="inputValue"
      :type="props.type"
      @update:model-value="onInputValueUpdated"
      class="w-full"
    />
    <PrimaryButton text="Готово" @click="onDoneClick" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, withDefaults } from "vue";
import PrimaryButton from "./PrimaryButton.vue";
import PrimaryInput from "./PrimaryInput.vue";

const inputValue = ref("");

interface EditPopupProps {
  title: string;
  placeholder: string;
  type?: string;
  id: string;
}

const props = withDefaults(defineProps<EditPopupProps>(), {
  type: "text",
});
const emits = defineEmits(["edit"]);

const onDoneClick = () => {
  emits("edit", { newValue: inputValue.value, id: props.id });
};

const onInputValueUpdated = (newValue: string) => {
  inputValue.value = newValue;
  console.log(inputValue.value);
};
</script>

<style scoped>
.edit-popup {
  @apply p-4 bg-white shadow-lg rounded-lg flex flex-col w-64 items-center gap-6;
}
</style>
