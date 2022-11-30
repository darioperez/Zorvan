<script setup lang="ts">
import { RouterView } from "vue-router";
import router from "@/router";
import { useSocketStore } from "@/stores/socket.store";
import { useGeneralStore } from "@/stores/general.store";
import { useUsersStore } from "@/stores/users.store";

const socketStore = useSocketStore();
const generalStore = useGeneralStore();
const usersStore = useUsersStore();

socketStore.socket.on("logout", () => {
  generalStore.setUser("");
  generalStore.setRoom("");
  router.push({ name: "login" });
});
</script>

<template>
  <div class="main-wrapper">
    <RouterView />
  </div>
</template>

<style scoped lang="postcss">
.main-wrapper {
  @apply flex flex-col bg-slate-100 text-slate-900 border border-slate-300 rounded-lg;

  height: 100%;
  width: 100%;
  max-height: var(--app-max-height);
  max-width: var(--app-max-width);
}
</style>
