import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { reactive } from "vue";
import { IDate, IEvent, IStatus, ITask } from "./types";

export const useEventsStore = defineStore("events", () => {
  const events = reactive<IEvent[]>([]);

  const getEventByTaskAndDate = (taskId: ITask["id"], dateId: IDate["id"]) => {
    return events.find(
      (event: IEvent) => event.taskId === taskId && event.dateId === dateId
    );
  };

  const createEvent = (
    taskId: ITask["id"],
    dateId: IDate["id"],
    statusId: IStatus["id"]
  ) => {
    if (getEventByTaskAndDate(taskId, dateId)) {
      return { data: null, error: "Такое событие уже существует" };
    }
    const eventToCreate: IEvent = {
      taskId,
      dateId,
      statusId,
      id: uuidv4(),
    };
    events.push(eventToCreate);
    console.log(eventToCreate);
    return { data: eventToCreate, error: null };
  };

  return { events, createEvent, getEventByTaskAndDate };
});
