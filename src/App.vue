<template>
  <div class="flex justify-center">
    <div class="main-container flex flex-col gap-10 items-start">
      <div class="flex flex-col gap-5">
        <h1 class="text-5xl font-medium">Тестовое задание для Zecurion</h1>
        <p>
          Выполненное тестовое задание для Zecurion от Полиенко В. С. Условие
          задания доступно
          <a href="./assets/ТЗ_Frontend Developer JS.docx" class="text-blue-500"
            >здесь</a
          >.
        </p>
      </div>
      <CreationCards />
      <MainTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import CreationCards from "./components/CreationCards.vue";
import MainTable from "./components/MainTable.vue";
</script>

<style scoped>
.main-container {
  max-width: 1024px;
}
</style>
