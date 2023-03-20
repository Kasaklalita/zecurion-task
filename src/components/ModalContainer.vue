<template>
  <div class="modal-container">
    <Teleport to="body">
      <div
        class="background"
        :style="backgroundStyle"
        @click="onBackgroundClick"
      >
        <slot></slot>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
export interface ModalContainerProps {
  backgroundStyle: Record<string, string | number>;
  isShown?: boolean;
}

defineProps<ModalContainerProps>();
const emits = defineEmits(["background-click"]);

const onBackgroundClick = (event: MouseEvent) => {
  if (event.target !== event.currentTarget) {
    return;
  }

  emits("background-click");
};
</script>

<style scoped>
.background {
  @apply flex flex-col justify-center items-center w-screen h-screen;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
  @apply w-full h-full;
}
</style>
