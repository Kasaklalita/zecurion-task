<template>
  <div
    class="bg-white shadow-md rouned-sm p-2 flex justify-between items-center w-64"
  >
    <p>{{ props.value }}</p>
    <div class="flex items-center gap-3 shri">
      <i class="fa-regular fa-pen-to-square cursor-pointer" @click="onEdit"></i>
      <i class="fa-solid fa-trash cursor-pointer" @click="onDelete"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

interface ItemCardProps {
  id: string;
  value: string;
}

const props = defineProps<ItemCardProps>();
const emits = defineEmits(["delete", "edit"]);

const onEdit = () => {
  emits("edit", props.id);
};

const onDelete = () => {
  emits("delete", props.id);
};
</script>

<style scoped></style>
