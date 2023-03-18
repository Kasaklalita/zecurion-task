<template>
  <th class="table-header-cell">
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

<style scoped>
.table-header-cell {
  @apply p-2 w-32 text-center font-normal border border-[#d9d9d9] shrink-0;
}
</style>
