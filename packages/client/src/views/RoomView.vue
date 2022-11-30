<script setup lang="ts">
import ThreeSections from "@/layouts/ThreeSections.layout.vue";
import MyButton from "@/components/MyButton.vue";
import MyInput from "@/components/MyInput.vue";
import MyMessage from "@/components/MyMessage.vue";
import router from "@/router";
import { useGeneralStore } from "@/stores/general.store";
import { useSocketStore } from "@/stores/socket.store";
import { useUsersStore } from "@/stores/users.store";
import { ref } from "vue";
import IconSend from "@/components/icons/IconSend.vue";
import IconLogout from "@/components/icons/IconLogout.vue";
import type { Message } from "@/types/commons";

const generalStore = useGeneralStore();
const socketStore = useSocketStore();
const usersStore = useUsersStore();
const messages = ref<Message[]>([]);
const message = ref("");
const messagesArea = ref();

const isMine = (message: Message) => message.user === generalStore.user;

if (!generalStore.user || !generalStore.room) {
  router.push({ name: "login" });
}

socketStore.socket.on("message", (msg) => {
  messages.value = [...messages.value, msg];
});

console.log("room", generalStore.user, generalStore.room);

const sendMessage = () => {
  socketStore.sendMessage(message.value);
  message.value = "";
};

const logout = async () => {
  try {
    await socketStore.socket.emit("logout");
    router.push({ name: "login" });
  } catch (logoutError) {
    console.error(logoutError);
  }
};
</script>

<template>
  <ThreeSections>
    <template #header>
      <div>
        <h2 class="my-header__title">
          {{ generalStore.room }}
        </h2>
        <div class="text-xs flex items-baseline gap-1">
          {{ generalStore.user }}
          <div class="h-2 w-2 rounded bg-green-500" />
        </div>
      </div>
      <MyButton @click="logout">
        <IconLogout />
      </MyButton>
    </template>

    <template #default>
      <div class="flex border-b border-b-gray-200 py-3 px-6 gap-1 items-center">
        <h3 class="inline-block uppercase text-xs font-black tracking-wider">
          {{ usersStore.users.length }} User(s) in room:
        </h3>
        <div class="flex flex-wrap gap-2">
          <span
            class="inline-block bg-slate-200 py-1 px-2 rounded-full text-sm font-semibold tracking-wide"
            v-for="u of usersStore.users"
            :key="u.id"
            >{{ u.name }}</span
          >
        </div>
      </div>
      <section
        class="grow overflow-y-auto flex flex-col gap-4 py-4"
        ref="messagesArea"
      >
        <MyMessage
          v-for="(m, i) of messages"
          :key="`${m.user}-${i}`"
          :user="m.user"
          :text="m.text"
          :isMine="isMine(m)"
        />
      </section>
    </template>

    <template #footer>
      <form class="grow flex gap-2" @submit.prevent="sendMessage()">
        <MyInput class="grow" v-model="message" placeholder="Start typing..." />
        <MyButton type="submit" variant="primary" :disabled="!message">
          <IconSend />
        </MyButton>
      </form>
    </template>
  </ThreeSections>
</template>
