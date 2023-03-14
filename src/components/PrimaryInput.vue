<template>
  <input type="text" v-model="value" :placeholder="props.placeholder" />
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

interface IPrimaryInputProps {
  modelValue: string;
  placeholder: string;
}

const props = defineProps<IPrimaryInputProps>();
const emits = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emits("update:modelValue", value);
  },
});
</script>

<style scoped></style>
