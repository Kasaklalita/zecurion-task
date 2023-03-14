<template>
  <div>
    <div class="flex gap-4">
      <AddItemCard placeholder="Введите значение tasks" />
      <AddItemCard placeholder="Введите значение dates" />
      <AddItemCard placeholder="Введите значение statuses" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AddItemCard from "./components/AddItemCard.vue";
</script>

<style scoped></style>
