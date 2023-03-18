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
        <li v-for="record in events" :key="record[1].id">
          {{ record[1].id }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import { useDatesStore } from "../store/dates";
import { useEventsStore } from "../store/events";
import { useStatusesStore } from "../store/statuses";
import { useTasksStore } from "../store/tasks";
import AddItemCard from "./AddItemCard.vue";

const toast = useToast();

// const store = useMainStore();
// const { tasks, dates, statuses } = storeToRefs(store);
const tasksStore = useTasksStore();
const datesStore = useDatesStore();
const statusesStore = useStatusesStore();
const eventsStore = useEventsStore();

const { events } = storeToRefs(eventsStore);

const onTaskCreated = (task: string) => {
  const { data, error } = tasksStore.createTask(task);
  if (!data || error) {
    toast.error(error ?? "Что-то пошло не так");
    return;
  }
  toast.success("Задача успешно создана");
};

const onDateCreated = (date: Date) => {
  const { data, error } = datesStore.createDate(date);
  if (!data || error) {
    toast.error(error ?? "Что-то пошло не так");
    return;
  }
  toast.success("Дата успешно создана");
};

const onStatusCreated = (status: string) => {
  const { data, error } = statusesStore.createStatus(status);
  if (!data || error) {
    toast.error(error ?? "Что-то пошло не так");
    return;
  }
  toast.success("Статус успешно создан");
};
</script>

<style scoped></style>
