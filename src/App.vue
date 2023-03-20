<template>
  <div class="flex p-10 justify-center">
    <div class="main-container flex flex-col gap-10">
      <div class="flex flex-col gap-5">
        <h1 class="text-5xl font-medium">Тестовое задание для Zecurion</h1>
        <p>
          Выполненное тестовое задание для Zecurion от Полиенко В. С. Условие
          задания доступно
          <a
            href="https://github.com/Kasaklalita/zecurion-task/blob/master/src/assets/%D0%A2%D0%97_Frontend%20Developer%20JS.docx"
            class="text-blue-500"
            >здесь</a
          >. Рекомендуется прочитать Readme перед началом работы.
        </p>
      </div>
      <CreationCards />
      <div class="w-full flex gap-6 justify-between">
        <div class="flex flex-col gap-6">
          <MainTable />
          <EventsCards />
        </div>
        <AllItems />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CreationCards from "./components/CreationCards.vue";
import AllItems from "./components/AllItems.vue";
import MainTable from "./components/MainTable.vue";
import EventsCards from "./components/EventsCards.vue";
</script>

<style scoped>
.main-container {
  width: 1300px;
}
</style>
