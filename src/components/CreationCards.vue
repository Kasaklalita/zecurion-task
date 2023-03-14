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
      <AddItemCard
        placeholder="Введите значение statuses"
        @create-item="onStatusCreated"
      />
    </div>
    <div class="flex gap-4">
      <ul>
        <li v-for="task in tasks" :key="task.id">{{ task.title }}</li>
      </ul>
      <ul>
        <li v-for="date in dates" :key="date.id">{{ date.value }}</li>
      </ul>
      <ul>
        <li v-for="status in statuses" :key="status.id">{{ status.value }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import { useMainStore } from "../store";
import AddItemCard from "./AddItemCard.vue";

const toast = useToast();

const store = useMainStore();
const { tasks, dates, statuses } = storeToRefs(store);

const onTaskCreated = (task: string) => {
  const { data, error } = store.createTask(task);
  if (!data || error) {
    toast.error(error ?? "Что-то пошло не так");
    return;
  }
  toast.success("Задача успешно создана");
};

const onDateCreated = (date: Date) => {
  const { data, error } = store.createDate(date);
  if (!data || error) {
    toast.error(error ?? "Что-то пошло не так");
    return;
  }
  toast.success("Дата успешно создана");
};

const onStatusCreated = (status: string) => {
  const { data, error } = store.createStatus(status);
  if (!data || error) {
    toast.error(error ?? "Что-то пошло не так");
    return;
  }
  toast.success("Статус успешно создан");
};
</script>

<style scoped></style>
