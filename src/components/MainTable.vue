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
      <TableBodyCell v-for="date in datesList" :key="date.id" />
    </tr>
  </table>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useMainStore } from "../store";
import TableHeaderCell from "./TableHeaderCell.vue";
import TableBodyCell from "./TableBodyCell.vue";
import { DateType, Task } from "../store/types";

const store = useMainStore();
const { tasks, dates } = storeToRefs(store);

const datesList = computed(() => {
  console.log("datesLIst");
  return dates.value.map((date: DateType) => ({
    id: date.id,
    value: date.value.toString(),
  }));
});
</script>

<style scoped></style>
