<template>
  <td
    class="p-2 w-32 text-center font-normal border border-[#d9d9d9]"
    @click="onClick"
  >
    <div v-if="!event.id">Создать</div>
    <div v-else>-</div>
  </td>
</template>

<script setup lang="ts">
import { ref, defineProps, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import { useMainStore } from "../store";
import { IEvent } from "../store/types";

const toast = useToast();

interface ITableBodyCellProps {
  dateId: string;
  taskId: string;
  event?: IEvent | null;
}

const props = defineProps<ITableBodyCellProps>();

const store = useMainStore();
const { events } = storeToRefs(store);

const event = reactive<IEvent | Partial<IEvent>>({ id: "" });

const onClick = () => {
  // Если события в данной ячейке не существует
  if (!event.id) {
    const { data, error } = store.createEvent(
      props.taskId,
      props.dateId,
      "123"
    );
    if (!data || error) {
      toast.error(error ?? "Что-то пошло не так");
      return;
    }
    toast.success("Событие успешно создано");
    event.dateId = data.dateId;
    event.taskId = data.taskId;
    event.id = data.id;
    event.statusId = data.statusId;
  } else {
    // Если событие существует
  }

  // if (event) {
  //   console.log("second click");
  // } else {
  //   console.log("first click");
  //   isClicked.value = true;
  // }
};
</script>

<style scoped></style>
