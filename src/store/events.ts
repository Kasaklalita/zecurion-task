import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { reactive } from "vue";
import { IDate, IEvent, IStatus, ITask } from "./types";

export const useEventsStore = defineStore("events", () => {
  // const events = reactive<Map<string, IEvent>>(new Map());
  const events = reactive<IEvent[]>([]);

  const getEventByTaskAndDate = (taskId: ITask["id"], dateId: IDate["id"]) => {
    let foundEvent;
    events.forEach((event: IEvent) => {
      if (event.taskId === taskId && event.dateId === dateId) {
        foundEvent = event;
      }
    });
    return foundEvent;
  };

  const getEvent = (id: IEvent["id"]) => {
    let foundEvent;
    events.forEach((value) => {
      if (value.id === id) {
        foundEvent = value;
        return;
      }
    });
    return foundEvent;
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
    return { data: eventToCreate, error: null };
  };

  const deleteEvent = (id: IEvent["id"]) => {
    for (let i = 0; i < events.length; i++) {
      if (events[i].id === id) {
        const deletedEvent = events[i];
        events.splice(i, 1);
        return { data: deletedEvent, error: null };
      }
    }
    return { data: null, error: "Такого события не существует" };
  };

  const deleteEventsByTask = (taskId: ITask["id"]) => {
    let deletedEvents = 0;
    for (let i = 0; i < events.length; i++) {
      if (events[i].taskId === taskId) {
        events.splice(i, 1);
        i -= 1;
        deletedEvents += 1;
      }
    }
    return deletedEvents > 0
      ? { data: "События удалены", error: null }
      : { data: null, error: "Таких событий не существует" };
  };

  const deleteEventsByDate = (dateId: IDate["id"]) => {
    let deletedEvents = 0;
    for (let i = 0; i < events.length; i++) {
      if (events[i].dateId === dateId) {
        events.splice(i, 1);
        i -= 1;
        deletedEvents += 1;
      }
    }
    return deletedEvents > 0
      ? { data: "События удалены", error: null }
      : { data: null, error: "Таких событий не существует" };
  };

  const deleteEventsByStatus = (statusId: IStatus["id"]) => {
    let deletedEvents = 0;
    for (let i = 0; i < events.length; i++) {
      if (events[i].statusId === statusId) {
        // Просто очищаем статус, но не удаляем событие
        events[i].statusId = "";
        i -= 1;
        deletedEvents += 1;
      }
    }
    return deletedEvents > 0
      ? { data: "Статусы очищены", error: null }
      : { data: null, error: "Таких событий не существует" };
  };

  const setEventStatus = (id: IEvent["id"], statusId: IStatus["id"]) => {
    let updatedEvent;
    events.forEach((event: IEvent) => {
      if (event.id === id) {
        event.statusId = statusId;
        updatedEvent = event;
      }
    });
    return updatedEvent
      ? { data: updatedEvent, error: null }
      : {
          data: null,
          error: "Такого события не существует",
        };
  };

  return {
    events,
    createEvent,
    getEventByTaskAndDate,
    deleteEvent,
    deleteEventsByTask,
    deleteEventsByDate,
    setEventStatus,
    getEvent,
    deleteEventsByStatus,
  };
});
