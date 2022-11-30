<script setup lang="ts">
const props = defineProps(["variant"]);
</script>

<template>
  <button
    class="py-4 px-6 rounded-full font-semibold uppercase disabled:opacity-50 hover:scale-110 transition-transform"
    :class="[
      variant === 'primary'
        ? 'bg-slate-900 text-white'
        : 'border-2 border-slate-900 text-slate-900',
    ]"
  >
    <slot />
  </button>
</template>
