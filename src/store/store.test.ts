import { expect, describe, it, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useTasksStore } from "./tasks";

describe("Counter Store", () => {
  let store: ReturnType<typeof useTasksStore>;
  let taskId = "";

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useTasksStore();
  });

  it("create a good task", () => {
    const { data, error } = store.createTask("task 1");
    expect(data).toBeTruthy();
    expect(error).toBeFalsy();
  });

  it("create a task with an empty name", () => {
    const { data, error } = store.createTask("");
    expect(data).toBeFalsy();
    expect(error).toBeTruthy();
    taskId = data?.id ?? "";
  });

  it("get a task an with unexisting id", () => {
    const { data, error } = store.getTask("");
    expect(data).toBeFalsy();
    expect(error).toBeTruthy();
  });
});
