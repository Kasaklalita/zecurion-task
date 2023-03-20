import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { reactive } from "vue";
import { IStatus, ActionReturnType } from "./types";

export const useStatusesStore = defineStore("statuses", () => {
  const statuses = reactive<IStatus[]>([]);

  const getStatusByName = (name: string): ActionReturnType<IStatus> => {
    let foundStatus;
    statuses.forEach((status: IStatus) => {
      if (status.value === name) {
        foundStatus = status;
      }
    });
    return foundStatus
      ? { data: foundStatus, error: null }
      : {
          data: null,
          error: "Такого статуса не существует",
        };
  };

  const getStatusById = (id: IStatus["id"]): ActionReturnType<IStatus> => {
    let foundStatus;
    statuses.forEach((status: IStatus) => {
      if (status.id === id) {
        foundStatus = status;
      }
    });
    return foundStatus
      ? { data: foundStatus, error: null }
      : {
          data: null,
          error: "Такого статуса не существует",
        };
  };

  const createStatus = (status: string): ActionReturnType<IStatus> => {
    if (!status.trim()) {
      return { data: null, error: "Статус не должен быть пустым." };
    }
    const statusToCreate: IStatus = {
      id: uuidv4(),
      value: status,
    };
    if (getStatusByName(statusToCreate.value).data) {
      return { data: null, error: "Такой статус уже существует." };
    }
    statuses.push(statusToCreate);
    return { data: statusToCreate, error: null };
  };

  const deleteStatus = (id: IStatus["id"]): ActionReturnType<IStatus> => {
    let deletedStatus;
    for (let i = 0; i < statuses.length; i++) {
      if (statuses[i].id === id) {
        deletedStatus = statuses[i];
        statuses.splice(i, 1);
      }
    }

    return deletedStatus
      ? { data: deletedStatus, error: null }
      : { data: null, error: "Такого статуса не существует" };
  };

  const updateStatus = (
    id: IStatus["id"],
    newValue: IStatus["value"]
  ): ActionReturnType<IStatus> => {
    if (newValue.trim() === "") {
      return { data: null, error: "Значение не дожно быть пустым" };
    }
    let updatedIndex = -1;
    for (let i = 0; i < statuses.length; i++) {
      if (statuses[i].id === id) {
        updatedIndex = i;
        statuses[i].value = newValue;
        break;
      }
    }
    return updatedIndex !== -1
      ? { data: statuses[updatedIndex], error: null }
      : { data: null, error: "Такого статуса не существует" };
  };

  return {
    statuses,
    createStatus,
    getStatusByName,
    getStatusById,
    updateStatus,
    deleteStatus,
  };
});
