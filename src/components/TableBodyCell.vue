<template>
  <td
    class="p-2 w-32 text-center font-normal border border-[#d9d9d9] cursor-pointer"
    @click="onClick"
  >
    <div v-if="!props.event">
      <i class="fa-solid fa-plus text-xl"></i>
    </div>
    <div v-else><i class="fa-regular fa-pen-to-square"></i></div>
  </td>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { useToast } from "vue-toastification";
import { IEvent } from "../store/types";
import { useEventsStore } from "../store/events";

const toast = useToast();
const isPopupShown = ref(false);

interface ITableBodyCellProps {
  dateId: string;
  taskId: string;
  event: IEvent | null;
}

const props = defineProps<ITableBodyCellProps>();
const emits = defineEmits(["cell-click"]);

const eventsStore = useEventsStore();

const onClick = () => {
  // Если события в данной ячейке не существует
  if (!props.event) {
    const { data, error } = eventsStore.createEvent(
      props.taskId,
      props.dateId,
      ""
    );
    if (!data || error) {
      toast.error(error ?? "Что-то пошло не так");
      return;
    }
    toast.success("Событие успешно создано");
    isPopupShown.value = true;
  } else {
    // Если событие существует
    emits("cell-click", props.event);
  }
};
</script>

<style scoped></style>
