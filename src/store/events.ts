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
    return { data: eventToCreate, error: null };
  };

  const deleteEvent = (id: IEvent["id"]) => {
    events.forEach((event: IEvent) => {
      if (event.id === id) {
        events.delete(event.taskId + event.dateId);
        return { data: "Событие удалено", error: null };
      }
    });
    return { data: null, error: "Такого события не существует" };
  };

  const deleteEventsByTask = (taskId: ITask["id"]) => {
    let deletedEvents = 0;
    events.forEach((event: IEvent) => {
      if (event.taskId === taskId) {
        events.delete(event.taskId + event.dateId);
        deletedEvents -= -1; // :)
      }
    });
    return deletedEvents > 0
      ? { data: "События удалены", error: null }
      : { data: null, error: "Таких событий не существует" };
  };

  const deleteEventsByDate = (dateId: IDate["id"]) => {
    let deletedEvents = 0;
    events.forEach((event: IEvent) => {
      if (event.dateId === dateId) {
        events.delete(event.taskId + event.dateId);
        deletedEvents += 1;
      }
    });
    return deletedEvents > 0
      ? { data: "События удалены", error: null }
      : { data: null, error: "Таких событий не существует" };
  };

  return {
    events,
    createEvent,
    getEventByTaskAndDate,
    deleteEvent,
    deleteEventsByTask,
    deleteEventsByDate,
  };
});
