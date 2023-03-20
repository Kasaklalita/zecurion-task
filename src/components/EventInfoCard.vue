<template>
  <div class="bg-white shadow-md rounded-md p-4 flex flex-col gap-3">
    <p>
      Собственный ID: <span class="font-medium">{{ props.event.id }}</span>
    </p>
    <p>
      ID задачи: <span class="font-medium">{{ props.event.taskId }}</span>
    </p>
    <p>
      ID даты: <span class="font-medium">{{ props.event.dateId }}</span>
    </p>
    <p>
      ID статуса: <span class="font-medium">{{ props.event.statusId }}</span>
    </p>
    <PrimaryButton text="Удалить событие" @click="onDelete" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { IEvent } from "../store/types";
import PrimaryButton from "./PrimaryButton.vue";

interface EventInfoCardProps {
  event: IEvent;
}

const props = defineProps<EventInfoCardProps>();
const emits = defineEmits(["delete"]);

const onDelete = () => {
  emits("delete", props.event.id);
};
</script>

<style scoped></style>
