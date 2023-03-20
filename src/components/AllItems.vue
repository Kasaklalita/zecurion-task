<template>
  <div class="w-64">
    <ItemsList
      title="Задачи"
      :items="tasksList"
      @edit="onTaskEdit"
      @delete="onTaskDelete"
    />
    <ItemsList
      title="Даты"
      :items="datesList"
      @edit="onDateEdit"
      @delete="onDateDelete"
    />
    <ItemsList
      title="Статусы"
      :items="statusesList"
      @edit="onStatusEdit"
      @delete="onStatusDelete"
    />
    <ModalContainer
      v-if="isTaskEditPopupShown"
      :background-style="{ zIndex: 10 }"
      @background-click="() => (isTaskEditPopupShown = false)"
    >
      <EditPopup
        :id="selectedTaskId"
        title="Редактирование задачи"
        placeholder="Текст задачи"
        @edit="editTask"
      />
    </ModalContainer>
    <ModalContainer
      v-if="isDateEditPopupShown"
      :background-style="{ zIndex: 10 }"
      @background-click="() => (isDateEditPopupShown = false)"
    >
      <EditPopup
        :id="selectedDateId"
        title="Редактирование даты"
        placeholder="Значение даты"
        type="date"
        @edit="editDate"
      />
    </ModalContainer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import { useTasksStore } from "../store/tasks";
import { IDate, IStatus, ITask } from "../store/types";
import { useDatesStore } from "../store/dates";
import { useStatusesStore } from "../store/statuses";
import ModalContainer from "./ModalContainer.vue";
import ItemsList from "./ItemsList.vue";
import EditPopup from "./EditPopup.vue";

const toast = useToast();

const isTaskEditPopupShown = ref(false);
const isDateEditPopupShown = ref(false);
const isStatusEditPopupShown = ref(false);

const tasksStore = useTasksStore();
const datesStore = useDatesStore();
const statusesStore = useStatusesStore();

const { tasks } = storeToRefs(tasksStore);
const { dates } = storeToRefs(datesStore);
const { statuses } = storeToRefs(statusesStore);

const selectedTaskId = ref("");
const selectedDateId = ref("");
const selectedStatusId = ref("");

const tasksList = computed(() => {
  if (!tasks.value) {
    return [];
  }
  return tasks.value.map((task: ITask) => {
    return { id: task.id, value: task.title };
  });
});

const datesList = computed(() => {
  if (!dates.value) {
    return [];
  }
  return dates.value.map((date: IDate) => {
    return { id: date.id, value: date.value.toString() };
  });
});

const statusesList = computed(() => {
  if (!statuses.value) {
    return [];
  }
  return statuses.value.map((status: IStatus) => {
    return { id: status.id, value: status.value };
  });
});

const onTaskEdit = (id: string) => {
  isTaskEditPopupShown.value = true;
  selectedTaskId.value = id;
};

const onTaskDelete = (id: string) => {
  const { data, error } = tasksStore.deleteTask(id);
  if (!data || error) {
    toast.error(error ?? "Что-то пошло не так");
    return;
  }
  toast.success("Задача удалена");
};

const onDateEdit = (id: string) => {
  isDateEditPopupShown.value = true;
  selectedDateId.value = id;
};

const onDateDelete = (id: string) => {
  const { data, error } = datesStore.deleteDate(id);
  if (!data || error) {
    toast.error(error ?? "Что-то пошло не так");
    return;
  }
  toast.success("Дата удалена");
};

const onStatusEdit = (id: string) => {
  isStatusEditPopupShown.value = true;
  selectedStatusId.value = id;
};

const onStatusDelete = (id: string) => {
  const { data, error } = statusesStore.deleteStatus(id);
  if (!data || error) {
    toast.error(error ?? "Что-то пошло не так");
    return;
  }
  toast.success("Статус удалён");
};

const editTask = ({
  id,
  newValue,
}: {
  id: string;
  newValue: Date | string;
}) => {
  isTaskEditPopupShown.value = false;
  const { data, error } = tasksStore.updateTask(id, newValue.toString());
  if (!data || error) {
    toast.error(error ?? "Что-то пошло не так");
    return;
  }
  toast.success("Задача изменена");
};

const editDate = ({ id, newValue }: { id: string; newValue: Date }) => {
  isDateEditPopupShown.value = false;
  const { data, error } = datesStore.updateDate(id, newValue);
  if (!data || error) {
    toast.error(error ?? "Что-то пошло не так");
    return;
  }
  toast.success("Дата изменена");
};
</script>

<style scoped></style>
