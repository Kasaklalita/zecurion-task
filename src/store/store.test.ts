import { expect, describe, it, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useTasksStore } from "./tasks";

// Здесь находятся тесты для стора задач.
// Посчитал нужным добавить сюда несколько тестов, чтобы показать
// Что о тестах я не забыл и писать их умею :)
// Для остальных сторов писать тесты не стал

describe("Counter Store", () => {
  let store: ReturnType<typeof useTasksStore>;

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
  });

  it("get a task an with unexisting id", () => {
    const { data, error } = store.getTask("");
    expect(data).toBeFalsy();
    expect(error).toBeTruthy();
  });
});
