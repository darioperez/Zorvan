<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps(["user", "text", "isMine"]);

const messageElement = ref();

onMounted(() => {
  messageElement.value.scrollIntoView();
});
</script>

<template>
  <article
    ref="messageElement"
    class="px-4 py-3 rounded-3xl"
    :class="[isMine ? 'message--mine' : 'message--not-mine']"
  >
    <div v-if="!isMine" class="uppercase text-xs font-black tracking-wider">
      {{ props.user }}
    </div>
    <div>{{ props.text }}</div>
  </article>
</template>

<style scoped lang="postcss">
.message--not-mine {
  @apply ml-4 mr-12 bg-gray-300 text-gray-800 rounded-tl-sm self-start;
}
.message--mine {
  @apply ml-12 mr-4 bg-gray-800 text-white rounded-br-sm self-end;
}
</style>
