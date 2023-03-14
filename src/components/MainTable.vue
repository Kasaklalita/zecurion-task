<template>
  <table class="bg-slate-300">
    <tr v-for="task in tasks" :key="task.id">
      <th>asdf</th>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMainStore } from "../store";

const store = useMainStore();
const { tasks } = storeToRefs(store);
</script>

<style scoped></style>
