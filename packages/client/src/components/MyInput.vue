<script setup lang="ts">
import { computed } from "vue";

const props = defineProps(["modelValue", "label", "id", "placeholder"]);
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <label
      v-if="props.label"
      :for="props.id"
      class="uppercase text-xs font-black tracking-wider"
      >{{ props.label }}</label
    >
    <input
      :id="props.id"
      type="text"
      v-model="value"
      class="h-14 border border-slate-300 px-4 rounded-lg"
      :placeholder="props.placeholder"
    />
  </div>
</template>
