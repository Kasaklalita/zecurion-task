<template>
  <div class="create-event-popup">
    <PrimaryDropdown
      :default-value="toRaw(selectedStatus)"
      :options="statusesToSelect"
      @select="onSelect"
    />
    <PrimaryButton text="Готово" @click="onDoneClick" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import {
  defineEmits,
  reactive,
  computed,
  unref,
  defineProps,
  toRaw,
} from "vue";
import { useStatusesStore } from "../store/statuses";
import PrimaryButton from "./PrimaryButton.vue";
import PrimaryDropdown from "./PrimaryDropdown.vue";
import { IEvent, IStatus } from "../store/types";
import { useEventsStore } from "../store/events";

const toast = useToast();

interface CreateEventProps {
  event: IEvent;
}

const props = defineProps<CreateEventProps>();
const emits = defineEmits(["edit"]);

const statusesStore = useStatusesStore();
const { statuses } = storeToRefs(statusesStore);
const eventsStore = useEventsStore();

const statusesToSelect = computed(() => {
  return unref(statuses);
});

const selectedStatus = reactive<IStatus | { id: string; value: string }>(
  statusesStore.getStatusById(props.event.statusId).data ?? {
    id: "",
    value: "",
  }
);

const onSelect = (status: IStatus) => {
  selectedStatus.id = status.id;
};

const onDoneClick = () => {
  if (selectedStatus.id) {
    const { data, error } = eventsStore.setEventStatus(
      props.event.id,
      selectedStatus.id
    );
    if (!data || error) {
      toast.error(error ?? "Что-то пошло не так");
      return;
    }
    toast.success("Событие обновлено");
    emits("edit");
  } else {
    toast.error("Выберите статус события");
  }
};
</script>

<style scoped>
.create-event-popup {
  @apply p-4 bg-white shadow-lg rounded-lg flex flex-col w-60 items-center gap-6;
}
</style>
