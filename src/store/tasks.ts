import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { reactive } from "vue";
import { ITask } from "./types";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = reactive<ITask[]>([]);

  // CRUD операции для задач
  const createTask = (task: string) => {
    if (!task.trim()) {
      return { data: null, error: "Имя задачи не должно быть пустым." };
    }
    const taskToCreate: ITask = {
      id: uuidv4(),
      title: task,
    };
    tasks.push(taskToCreate);
    return { data: taskToCreate, error: null };
  };

  const getTask = (id: ITask["id"]) => {
    return tasks.find((task: ITask) => task.id === id);
  };

  const deleteTask = (id: ITask["id"]) => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        tasks.splice(i, 1);
      }
    }
    // Добавить удаление связных событий
  };

  // const deleteTask = (taskId: string) => {
  //   let taskIndex = -1;
  //   for (let i = 0; i < tasks.length; i++) {
  //     if (tasks[i].id === taskId) {
  //       tasks.splice(i, 1);
  //       break;
  //     }
  //   }
  // };

  return { tasks, createTask, getTask, deleteTask };
});
