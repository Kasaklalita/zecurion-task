import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { reactive } from "vue";
import { useEventsStore } from "./events";
import { ActionReturnType, IDate } from "./types";

export const useDatesStore = defineStore("dates", () => {
  const eventsStore = useEventsStore();
  const dates = reactive<IDate[]>([]);

  // CRUD операции для дат
  const createDate = (date: Date): ActionReturnType<IDate> => {
    if (!date.toString()) {
      return { data: null, error: "Дата не должна быть пустой." };
    }
    const dateToCreate: IDate = {
      id: uuidv4(),
      value: date,
    };
    dates.push(dateToCreate);
    return { data: dateToCreate, error: null };
  };

  const getDate = (id: IDate["id"]): ActionReturnType<IDate> => {
    const fountDate = dates.find((date: IDate) => date.id === id);
    return fountDate
      ? { data: fountDate, error: null }
      : { data: null, error: "Такой даты не существует" };
  };

  const deleteDate = (id: IDate["id"]): ActionReturnType<IDate> => {
    let deletedDate;
    for (let i = 0; i < dates.length; i++) {
      if (dates[i].id === id) {
        deletedDate = dates[i];
        dates.splice(i, 1);
      }
    }
    // Вместе с датой удаляем связанные события
    eventsStore.deleteEventsByDate(id);
    return deletedDate
      ? { data: deletedDate, error: null }
      : { data: null, error: "Такой задачи не существует" };
    // Добавить удаление связных событий
  };

  return { dates, createDate, getDate, deleteDate };
});
