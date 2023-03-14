<template>
  <button>{{ props.text }}</button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

interface IPrimaryButtonProps {
  text: string;
}

const props = defineProps<IPrimaryButtonProps>();
</script>

<style scoped></style>
