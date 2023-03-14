<template>
  <div class="bg-white rounded-md shadow-md">
    <PrimaryInput
      :placeholder="props.placeholder"
      v-model="inputValue"
      @update:modelValue="onInputValueUpdated"
    />
    <PrimaryButton text="Добавить" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import PrimaryButton from "./PrimaryButton.vue";
import PrimaryInput from "./PrimaryInput.vue";

interface IAddItemCardProps {
  placeholder: string;
}

const props = defineProps<IAddItemCardProps>();

const inputValue = ref("");

const onInputValueUpdated = (newValue: string) => {
  inputValue.value = newValue;
  console.log(inputValue.value);
};
</script>

<style scoped></style>
