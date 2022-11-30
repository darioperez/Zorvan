<script setup lang="ts">
import IconSend from "@/components/icons/IconSend.vue";
import MyButton from "@/components/MyButton.vue";
</script>

<template>
  <div
    class="grow flex flex-col justify-center items-center p-6 text-center gap-6"
  >
    <IconSend class="h-20 w-20" />
    <div>
      <h1 class="uppercase text-5xl font-black mb-4">Zorvan</h1>
      <p class="text-xl">
        This is a very simple practice of a multiroom messaging app made with
        Vue 3, Tailwinds.css, Express.js and Socket.io
      </p>
    </div>
    <RouterLink to="/">
      <MyButton variant="primary">Go Home</MyButton>
    </RouterLink>
  </div>
</template>
