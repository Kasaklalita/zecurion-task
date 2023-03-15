import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { reactive } from "vue";
import { IStatus } from "./types";

export const useStatusesStore = defineStore("statuses", () => {
  const statuses = reactive<IStatus[]>([]);

  const getStatusByName = (name: string) => {
    return statuses.find((IStatus: IStatus) => {
      return IStatus.value === name;
    });
  };

  const createStatus = (status: string) => {
    if (!status.trim()) {
      return { data: null, error: "Статус не должен быть пустым." };
    }
    const statusToCreate: IStatus = {
      id: uuidv4(),
      value: status,
    };
    if (getStatusByName(statusToCreate.value)) {
      return { data: null, error: "Такой статус уже существует." };
    }
    statuses.push(statusToCreate);
    return { data: statusToCreate, error: null };
  };

  return { statuses, createStatus, getStatusByName };
});
