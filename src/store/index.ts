import { defineStore } from "pinia";
import { DateType, Task, Status } from "./types";

type ActionReturn = {
  data: Task | DateType | Status | null;
  error: string | null;
};

export const useMainStore = defineStore("main", {
  state: () => ({
    tasks: <Task[]>[],
    dates: <DateType[]>[],
    statuses: <Status[]>[],
    taskId: 0,
    dateId: 0,
    statusId: 0,
  }),
  actions: {
    createTask(task: string): ActionReturn {
      if (!task.trim()) {
        return { data: null, error: "Имя задачи не должно быть пустым." };
      }
      const taskToCreate: Task = {
        id: ++this.taskId,
        title: task,
      };
      this.tasks.push(taskToCreate);
      return { data: taskToCreate, error: null };
    },
    createDate(date: Date) {
      if (!date.toString()) {
        return { data: null, error: "Дата не должна быть пустой." };
      }
      const dateToCreate: DateType = {
        id: ++this.dateId,
        value: date,
      };
      this.dates.push(dateToCreate);
      return { data: dateToCreate, error: null };
    },
    createStatus(status: string) {
      if (!status.trim()) {
        return { data: null, error: "Статус не должен быть пустым." };
      }
      const statusToCreate: Status = {
        id: ++this.statusId,
        value: status,
      };
      if (this.getStatusByName(statusToCreate.value)) {
        return { data: null, error: "Такой статус уже существует." };
      }
      this.statuses.push(statusToCreate);
      return { data: statusToCreate, error: null };
    },
    getStatusByName(name: string) {
      return this.statuses.find((status: Status) => {
        return status.value === name;
      });
    },
  },
});
