<template>
  <table class="bg-slate-300">
    <tr>
      <th>з</th>
      <th v-for="date in dates" :key="date.id">{{ date.value }}</th>
    </tr>
    <tr v-for="task in tasks" :key="task.id">
      <td>{{ task.title }}</td>
      <td>asdf</td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMainStore } from "../store";

const store = useMainStore();
const { tasks, dates } = storeToRefs(store);
</script>

<style scoped></style>
