import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { reactive } from "vue";
import { IDate, IEvent, IStatus, ITask } from "./types";

interface EventKey {
  taskId: ITask["id"];
  dateId: IDate["id"];
}

export const useEventsStore = defineStore("events", () => {
  // const events = reactive<Set<IEvent>>(new Set());
  const events = reactive<Map<string, IEvent>>(new Map());

  const getEventByTaskAndDate = (taskId: ITask["id"], dateId: IDate["id"]) => {
    const event = events.get(taskId + dateId);
    console.log(event);
    return event;
    // console.log(taskId, dateId);
    // events.forEach((event: IEvent) => {
    //   if (event.taskId === taskId && event.dateId === dateId) {
    //     return event;
    //   }
    // });
    // return null;
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
    events.set(taskId + dateId, eventToCreate);
    console.log(eventToCreate);
    return { data: eventToCreate, error: null };
  };

  const deleteEvent = (id: IEvent["id"]) => {
    events.forEach((event: IEvent) => {
      if (event.id === id) {
        events.delete(event);
      }
    });
  };

  const deleteEventByTask = (taskId: ITask["id"]) => {
    events.forEach((event: IEvent) => {
      if (event.taskId === taskId) {
        events.delete(event);
      }
    });
  };

  const deleteEventByDate = (dateId: IDate["id"]) => {
    events.forEach((event: IEvent) => {
      if (event.dateId === dateId) {
        events.delete(event);
      }
    });
  };

  return {
    events,
    createEvent,
    getEventByTaskAndDate,
    deleteEvent,
    deleteEventByTask,
    deleteEventByDate,
  };
});
