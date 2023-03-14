<template>
  <input
    :type="props.type"
    v-model="value"
    :placeholder="props.placeholder"
    class="outline-none shadow-sm py-2 px-3"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, withDefaults } from "vue";

interface IPrimaryInputProps {
  modelValue: string | Date;
  placeholder: string;
  type?: string;
}

const props = withDefaults(defineProps<IPrimaryInputProps>(), {
  type: "text",
});
const emits = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value: string | Date) {
    emits("update:modelValue", value);
  },
});
</script>

<style scoped></style>
