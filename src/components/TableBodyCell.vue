<template>
  <td
    class="p-2 w-32 text-center font-normal border border-[#d9d9d9] cursor-pointer"
    @click="onClick"
  >
    <div v-if="!props.event">
      <i class="fa-solid fa-plus text-xl"></i>
    </div>
    <div v-else>
      <i class="fa-regular fa-pen-to-square"></i>
      <teleport to="body" v-if="isPopupShown">
        <CreateEventPopup />
      </teleport>
    </div>
  </td>
</template>

<script setup lang="ts">
import { ref, defineProps, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import { IEvent } from "../store/types";
import { useEventsStore } from "../store/events";
import CreateEventPopup from "./CreateEventPopup.vue";

const toast = useToast();
const isPopupShown = ref(false);

interface ITableBodyCellProps {
  dateId: string;
  taskId: string;
  event: IEvent | null;
}

const props = defineProps<ITableBodyCellProps>();

const eventsStore = useEventsStore();

const onClick = () => {
  // Если события в данной ячейке не существует
  if (!props.event) {
    const { data, error } = eventsStore.createEvent(
      props.taskId,
      props.dateId,
      "123"
    );
    if (!data || error) {
      toast.error(error ?? "Что-то пошло не так");
      return;
    }
    toast.success("Событие успешно создано");
    isPopupShown.value = true;
  } else {
    // Если событие существует
    // eventsStore.deleteEvent(props.event.id);
    // toast.success("Событие уже есть");
  }
};
</script>

<style scoped></style>
