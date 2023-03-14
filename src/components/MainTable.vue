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
      />
    </tr>
  </table>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useMainStore } from "../store";
import TableHeaderCell from "./TableHeaderCell.vue";
import TableBodyCell from "./TableBodyCell.vue";
import { IDate } from "../store/types";

const store = useMainStore();
const { tasks, dates } = storeToRefs(store);

const datesList = computed(() => {
  return dates.value.map((date: IDate) => ({
    id: date.id,
    value: date.value.toString(),
  }));
});

// const eventsTable;
</script>

<style scoped></style>
