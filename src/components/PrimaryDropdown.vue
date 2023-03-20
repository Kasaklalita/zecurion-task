<template>
  <div v-if="props.options" class="primary-dropdown">
    <div
      v-if="isDropdownOpened"
      class="primary-dropdown__background"
      @click="closeDropdown"
    ></div>
    <div
      class="primary-dropdown__main main_theme_light dark:main_theme_dark"
      :class="dropdownMainClass"
    >
      <p class="primary-dropdown__selected-item-text">
        {{ selectedValue }}
      </p>
      <i class="fa-solid fa-caret-down" @click="openDropdown"></i>
    </div>
    <Transition name="options">
      <div
        class="primary-dropdown__options options_theme_light dark:options_theme_dark"
        v-if="isDropdownOpened"
      >
        <p
          class="primary-dropdown__item item_theme_light dark:item_theme_dark"
          v-for="item in props.options"
          :key="item.id"
          @click="() => changeSelectedItem(item)"
        >
          {{ item.value }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits, toRaw, unref } from "vue";
import { computed } from "vue";

export interface DropdownControlProps {
  options: { id: string; value: string }[];
  defaultValue: { id: string; value: string };
}

const props = defineProps<DropdownControlProps>();

const emit = defineEmits(["select"]);

const selectedValue = ref(toRaw(props.defaultValue.value) ?? "");

const isDropdownOpened = ref(false);

const openDropdown = () => {
  isDropdownOpened.value = true;
};

const closeDropdown = () => {
  isDropdownOpened.value = false;
};

const changeSelectedItem = (selected: { id: string; value: string }) => {
  console.log(selected);
  closeDropdown();
  selectedValue.value = unref(toRaw(selected).value);
  emit("select", selected);
};

const dropdownMainClass = computed(() => {
  return {
    "primary-dropdown__main_opened": isDropdownOpened.value,
    "primary-dropdown__main_closed": !isDropdownOpened.value,
  };
});
</script>

<style scoped>
.primary-dropdown {
  height: 35px;
  outline: none;
  position: relative;
  font-family: Geometria, sans-serif;
}

.primary-dropdown__main {
  @apply flex justify-between items-center gap-4;
  @apply bg-white;
  height: 35px;
  padding: 0 15px;
  transition: all 0.2s ease;
  width: 206px;
}

.primary-dropdown__main_opened {
  border-radius: 20px 20px 0 0;
}

.primary-dropdown__main_closed {
  border-radius: 20px;
}

.primary-dropdown__selected-item-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.primary-dropdown__open-button {
  cursor: pointer;
  width: 25px;
  height: 25px;
}

.primary-dropdown__open-button_opened {
  transform: rotate(-90deg);
}

.primary-dropdown__open-button_closed {
  transform: rotate(180deg);
}

.primary-dropdown__background {
  position: fixed;
  z-index: 40;
  height: 300vh;
  width: 300vw;
  left: -100vw;
  top: -100vh;
}

.primary-dropdown__options {
  @apply w-full;
  z-index: 50;
  position: absolute;
  top: calc(100%);
  left: 0;
  border-radius: 0 0 20px 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.primary-dropdown__item {
  @apply px-4 py-1;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* animations */
.options-enter-active,
.options-leave-active {
  transition: opacity 0.2s ease;
}

.options-leave-to,
.options-enter-from {
  opacity: 0;
}

/*light theme block*/
.main_theme_light {
  background: #d9d9d9;
  color: black;
}

.options_theme_light {
  background: #d9d9d9;
  border-top: 1px solid #b7b7b7;
}

.item_theme_light:hover,
.item_theme_light:active {
  background: rgba(0, 98, 213, 0.25);
}
</style>
