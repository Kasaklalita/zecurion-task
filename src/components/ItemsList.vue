<template>
  <div class="mb-3">
    <p class="text-lg font-medium mb-3">{{ props.title }}</p>
    <div v-if="props.items.length" class="flex flex-col gap-3">
      <ItemCard
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :value="item.value"
        @edit="onEdit"
        @delete="onDelete"
      />
    </div>
    <p v-else class="text-red-500">Список пуст</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import ItemCard from "./ItemCard.vue";

interface ItemsListProps {
  title: string;
  items: { id: string; value: string }[];
}

const props = defineProps<ItemsListProps>();
const emits = defineEmits(["edit", "delete"]);

const onEdit = (id: string) => {
  emits("edit", id);
};
const onDelete = (id: string) => {
  emits("delete", id);
};
</script>

<style scoped></style>
