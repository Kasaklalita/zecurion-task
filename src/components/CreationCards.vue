<template>
  <div>
    <div class="flex gap-4">
      <AddItemCard
        placeholder="Введите значение tasks"
        @create-item="onTaskCreated"
      />
      <AddItemCard placeholder="Введите значение dates" />
      <AddItemCard placeholder="Введите значение statuses" />
    </div>
    <div class="flex gap-4">
      <ul>
        <li v-for="task in tasks" :key="task.id">{{ task.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMainStore } from "../store";
import AddItemCard from "./AddItemCard.vue";

const store = useMainStore();
const { tasks } = storeToRefs(store);

const onTaskCreated = (task: string) => {
  store.createTask(task);
};
</script>

<style scoped></style>
