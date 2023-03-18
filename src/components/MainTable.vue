<template>
  <table class="">
    <tr>
      <TableHeaderCell value="Задачи" />
      <TableHeaderCell
        v-for="date in datesList"
        :key="date.id"
        :value="date.value.toString()"
      />
    </tr>
    <tr v-for="task in tasks" :key="task.id">
      <TableHeaderCell :value="task.title" />
      <TableBodyCell
        v-for="date in datesList"
        :key="date.id"
        :date-id="date.id"
        :task-id="task.id"
        :event="eventsStore.getEventByTaskAndDate(task.id, date.id) ?? null"
      />
    </tr>
  </table>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useTasksStore } from "../store/tasks";
import TableHeaderCell from "./TableHeaderCell.vue";
import TableBodyCell from "./TableBodyCell.vue";
import { IDate } from "../store/types";
import { useDatesStore } from "../store/dates";
import { useStatusesStore } from "../store/statuses";
import { useEventsStore } from "../store/events";

// const store = useMainStore();
// const { tasks, dates } = storeToRefs(store);
const tasksStore = useTasksStore();
const datesStore = useDatesStore();
const statusesStore = useStatusesStore();
const eventsStore = useEventsStore();

const { tasks } = storeToRefs(tasksStore);
const { dates } = storeToRefs(datesStore);
const { statuses } = storeToRefs(statusesStore);
const { events } = storeToRefs(eventsStore);

console.log(tasksStore.getTask("asdff"));

const datesList = computed(() => {
  return dates.value.map((date: IDate) => ({
    id: date.id,
    value: date.value.toString(),
  }));
});

const eventsList = computed(() => {
  return events;
});

// const eventsTable;
</script>

<style scoped></style>
