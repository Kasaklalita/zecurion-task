import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { reactive } from "vue";
import { IDate } from "./types";

export const useDatesStore = defineStore("dates", () => {
  const dates = reactive<IDate[]>([]);

  // CRUD операции для дат
  const createDate = (date: Date) => {
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

  const getDate = (id: IDate["id"]) => {
    return dates.find((date: IDate) => date.id === id);
  };

  const deleteDate = (id: IDate["id"]) => {
    for (let i = 0; i < dates.length; i++) {
      if (dates[i].id === id) {
        dates.splice(i, 1);
      }
    }
    // Добавить удаление связных событий
  };

  return { dates, createDate, getDate, deleteDate };
});
