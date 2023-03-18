import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { reactive } from "vue";
import { useEventsStore } from "./events";
import { ITask, ActionReturnType } from "./types";

export const useTasksStore = defineStore("tasks", () => {
  const eventsStore = useEventsStore();
  const tasks = reactive<ITask[]>([]);

  // CRUD операции для задач
  const createTask = (task: string): ActionReturnType<ITask> => {
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

  const getTask = (id: ITask["id"]): ActionReturnType<ITask> => {
    const foundTask = tasks.find((task: ITask) => task.id === id);
    return foundTask
      ? { data: foundTask, error: null }
      : { data: null, error: "Такой задачи не существует" };
  };

  const deleteTask = (id: ITask["id"]): ActionReturnType<ITask> => {
    let deletedTask;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        deletedTask = tasks[i];
        tasks.splice(i, 1);
      }
    }
    // Вместе с задачей удаляем связанные события
    eventsStore.deleteEventsByTask(id);

    return deletedTask
      ? { data: deletedTask, error: null }
      : { data: null, error: "Такой задачи не существует" };
  };

  return { tasks, createTask, getTask, deleteTask };
});
