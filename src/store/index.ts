import { defineStore } from "pinia";
import { Task } from "./types";
export const useMainStore = defineStore("main", {
  state: () => ({
    tasks: <Task[]>[],
    count: 0,
    // dates: <string[]>[],
    // statuses: <string[]>[],
  }),
  actions: {
    createTask(task: string) {
      if (task.trim()) {
        console.log("empty");
      }
      const taskToCreate: Task = {
        id: ++this.count,
        title: task,
      };
      this.tasks.push(taskToCreate);
    },
  },
});
