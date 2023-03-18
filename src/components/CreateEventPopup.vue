<template>
  <div class="create-event-popup">
    <!-- <select name="" id="" @change="onSelect">
      <option v-for="status in statuses" :key="status.id">
        {{ status.value }}
      </option>
    </select> -->
    <PrimaryDropdown :options="statusesToSelect" @select="onSelect" />
    <!-- <ColorPicker @color-change="onColorChange" /> -->
    <PrimaryButton text="Готово" @click="onDoneClick" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, defineEmits, reactive, computed, unref } from "vue";
import { ColorPicker } from "vue-accessible-color-picker";
import { useStatusesStore } from "../store/statuses";
import PrimaryButton from "./PrimaryButton.vue";
import PrimaryDropdown from "./PrimaryDropdown.vue";
import { IStatus } from "../store/types";

const emits = defineEmits(["edit"]);

const statusesStore = useStatusesStore();
const { statuses } = storeToRefs(statusesStore);

const statusesToSelect = computed(() => {
  return unref(statuses);
});

// const selectedColor = ref("#ffffff");z
const selectedStatus = reactive<IStatus | { id: "" }>({ id: "" });

// const onColorChange = (data: any) => {
//   selectedColor.value = data.colors.hex;
// };

const onSelect = (status: IStatus) => {
  console.log(status);
};

const onDoneClick = () => {
  if (!selectedStatus.id) {
    emits("edit", { selectedStatus });
  }
};
</script>

<style scoped>
.create-event-popup {
  @apply absolute top-0 left-0 p-4 bg-white shadow-lg rounded-lg flex flex-col w-60 items-center gap-6;
}
</style>
