import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { IDate, ITask, IStatus, IEvent } from "./types";

type ActionReturn = {
  data: ITask | IDate | IStatus | null;
  error: string | null;
};

export const useMainStore = defineStore("main", {
  state: () => ({
    tasks: <ITask[]>[],
    dates: <IDate[]>[],
    statuses: <IStatus[]>[],
    events: <IEvent[]>[],
  }),
  actions: {
    // createTask(task: string): ActionReturn {
    //   if (!task.trim()) {
    //     return { data: null, error: "Имя задачи не должно быть пустым." };
    //   }
    //   const taskToCreate: ITask = {
    //     id: uuidv4(),
    //     title: task,
    //   };
    //   console.log(taskToCreate);
    //   this.tasks.push(taskToCreate);
    //   return { data: taskToCreate, error: null };
    // },
    // createDate(date: Date) {
    //   if (!date.toString()) {
    //     return { data: null, error: "Дата не должна быть пустой." };
    //   }
    //   const dateToCreate: IDate = {
    //     id: uuidv4(),
    //     value: date,
    //   };
    //   this.dates.push(dateToCreate);
    //   return { data: dateToCreate, error: null };
    // },
    // createStatus(status: string) {
    //   if (!status.trim()) {
    //     return { data: null, error: "Статус не должен быть пустым." };
    //   }
    //   const statusToCreate: IStatus = {
    //     id: uuidv4(),
    //     value: status,
    //   };
    //   if (this.getStatusByName(statusToCreate.value)) {
    //     return { data: null, error: "Такой статус уже существует." };
    //   }
    //   this.statuses.push(statusToCreate);
    //   return { data: statusToCreate, error: null };
    // },
    // getStatusByName(name: string) {
    //   return this.statuses.find((IStatus: IStatus) => {
    //     return IStatus.value === name;
    //   });
    // },
    createEvent(taskId: string, dateId: string, statusId: string) {
      if (this.getEventByTaskAndDate(taskId, dateId)) {
        return { data: null, error: "Такое событие уже существует" };
      }
      const eventToCreate: IEvent = {
        taskId,
        dateId,
        statusId,
        id: uuidv4(),
      };
      this.events.push(eventToCreate);
      console.log(eventToCreate);
      return { data: eventToCreate, error: null };
    },
    getEventByTaskAndDate(taskId: string, dateId: string) {
      return this.events.find(
        (event: IEvent) => event.taskId === taskId && event.dateId === dateId
      );
    },
  },
});
