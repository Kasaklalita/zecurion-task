<template>
  <table class="main-table" v-if="isTableOk">
    <tr class="">
      <TableHeaderCell value="Задачи" />
      <TableHeaderCell
        v-for="date in datesList"
        :key="date.id"
        :value="date.value.toString()"
        @click="() => deleteDate(date.id)"
      />
    </tr>
    <tr v-for="task in tasks" :key="task.id">
      <TableHeaderCell :value="task.title" @click="() => deleteTask(task.id)" />
      <TableBodyCell
        v-for="date in datesList"
        :key="date.id"
        :date-id="date.id"
        :task-id="task.id"
        :event="eventsStore.getEventByTaskAndDate(task.id, date.id) ?? null"
      />
    </tr>
  </table>
  <h2 v-else>
    Чтобы создать таблицу, создайте хотя бы одну задачу, одну дату и один
    статус.
  </h2>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import { useTasksStore } from "../store/tasks";
import TableHeaderCell from "./TableHeaderCell.vue";
import TableBodyCell from "./TableBodyCell.vue";
import { IDate, ITask } from "../store/types";
import { useDatesStore } from "../store/dates";
import { useStatusesStore } from "../store/statuses";
import { useEventsStore } from "../store/events";

const toast = useToast();

// const store = useMainStore();
// const { tasks, dates } = storeToRefs(store);
const tasksStore = useTasksStore();
const datesStore = useDatesStore();
const statusesStore = useStatusesStore();
const eventsStore = useEventsStore();

const { tasks } = storeToRefs(tasksStore);
const { dates } = storeToRefs(datesStore);
const { statuses } = storeToRefs(statusesStore);

const datesList = computed(() => {
  return dates.value.map((date: IDate) => ({
    id: date.id,
    value: date.value.toString(),
  }));
});

const deleteTask = (id: ITask["id"]) => {
  const { data, error } = tasksStore.deleteTask(id);
  if (!data || error) {
    toast.error(error ?? "Что-то пошло не так");
    return;
  }
  toast.success("Задача успешно удалена");
};

const deleteDate = (id: IDate["id"]) => {
  const { data, error } = datesStore.deleteDate(id);
  if (!data || error) {
    toast.error(error ?? "Что-то пошло не так");
    return;
  }
  toast.success("Дата успешно удалена");
};

const isTableOk = computed(() => {
  return (
    tasks.value.length > 0 &&
    dates.value.length > 0 &&
    statuses.value.length > 0
  );
});
</script>

<style scoped>
.main-table {
  /* width: 1024px;
  max-width: 1024px;
  overflow-x: auto; */
}
</style>
