<template>
  <td
    class="p-2 w-32 text-center font-normal border border-[#d9d9d9]"
    @click="onClick"
  >
    <div v-if="isClicked"></div>
  </td>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";

interface ITableBodyCellProps {
  dateId: string;
  taskId: string;
}

const props = defineProps<ITableBodyCellProps>();

const isClicked = ref(false);

console.log(`init ${props.taskId} ${props.dateId}`);
const onClick = () => {
  if (isClicked.value) {
    console.log("second click");
  } else {
    console.log("first click");
    isClicked.value = true;
  }
};
</script>

<style scoped></style>
