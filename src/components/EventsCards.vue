<template>
  <div>
    <p class="mb-3 text-lg font-medium w-72">Информация о всех событиях:</p>
    <div v-if="events.length > 0" class="flex flex-col gap-4">
      <EventInfoCard
        v-for="event in events"
        :key="event.id"
        :event="event"
        @delete="onDelete"
      />
    </div>
    <p v-else class="text-red-500">Событий нет</p>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import EventInfoCard from "./EventInfoCard.vue";
import { useEventsStore } from "../store/events";

const toast = useToast();

const eventsStore = useEventsStore();
const { events } = storeToRefs(eventsStore);

const onDelete = (id: string) => {
  const { data, error } = eventsStore.deleteEvent(id);
  if (!data || error) {
    toast.error(error ?? "Что-то пошло не так");
    return;
  }
  toast.success("Событие удалено ");
};
</script>

<style scoped></style>
