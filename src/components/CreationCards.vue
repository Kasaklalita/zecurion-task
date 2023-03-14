<template>
  <div>
    <div class="flex gap-4">
      <AddItemCard
        placeholder="Введите значение tasks"
        @create-item="onTaskCreated"
      />
      <AddItemCard
        placeholder="Введите значение dates"
        type="date"
        @create-item="onDateCreated"
      />
      <AddItemCard placeholder="Введите значение statuses" />
    </div>
    <div class="flex gap-4">
      <ul>
        <li v-for="task in tasks" :key="task.id">{{ task.title }}</li>
      </ul>
      <ul>
        <li v-for="date in dates" :key="date.id">{{ date.value }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMainStore } from "../store";
import AddItemCard from "./AddItemCard.vue";

const store = useMainStore();
const { tasks, dates } = storeToRefs(store);

const onTaskCreated = (task: string) => {
  store.createTask(task);
};

const onDateCreated = (date: Date) => {
  store.createDate(date);
};
</script>

<style scoped></style>
