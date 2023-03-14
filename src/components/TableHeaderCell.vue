<template>
  <th class="p-2 w-32 text-center font-normal border border-[#d9d9d9]">
    {{ props.value }}
  </th>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

interface ITableHeaderCellProps {
  value: string;
}

const props = defineProps<ITableHeaderCellProps>();
</script>

<style scoped></style>
