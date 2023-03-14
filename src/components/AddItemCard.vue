<template>
  <div
    class="bg-white rounded-md shadow-md flex flex-col items-center gap-4 w-80 p-4"
  >
    <PrimaryInput
      :placeholder="props.placeholder"
      v-model="inputValue"
      :type="props.type"
      @update:modelValue="onInputValueUpdated"
    />
    <PrimaryButton text="Добавить" @click="onItemCreated" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import PrimaryButton from "./PrimaryButton.vue";
import PrimaryInput from "./PrimaryInput.vue";

interface IAddItemCardProps {
  placeholder: string;
  type?: string;
}

const props = withDefaults(defineProps<IAddItemCardProps>(), {
  type: "text",
});
const emits = defineEmits(["create-item"]);

const inputValue = ref("");

const onInputValueUpdated = (newValue: string) => {
  inputValue.value = newValue;
};

const onItemCreated = () => {
  emits("create-item", inputValue.value);
};
</script>

<style scoped></style>
