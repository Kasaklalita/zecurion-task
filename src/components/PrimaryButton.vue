<template>
  <button
    class="shadow-sm w-40 rounded-full bg-[#0062d5] text-white py-1 hover:bg-[#ffb14e] hover:text-black transition ease-in-out duration-300"
  >
    {{ props.text }}
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

interface IPrimaryButtonProps {
  text: string;
}

const props = defineProps<IPrimaryButtonProps>();
</script>

<style scoped></style>
