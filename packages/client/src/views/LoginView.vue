<script lang="ts" setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useUsersStore } from "@/stores/users.store";
import { useSocketStore } from "@/stores/socket.store";
import { useGeneralStore } from "@/stores/general.store";
import ThreeSections from "@/layouts/ThreeSections.layout.vue";
import MyButton from "@/components/MyButton.vue";
import MyInput from "@/components/MyInput.vue";
import router from "@/router";
import IconLogin from "@/components/icons/IconLogin.vue";
import IconAbout from "@/components/icons/IconAbout.vue";

const name = ref("");
const room = ref("off-topic");
const error = ref<any>("");

const socket = useSocketStore();
const { setRoom, setUser } = useGeneralStore();
const usersStore = useUsersStore();

const login = async () => {
  try {
    await socket.login(name.value, room.value);
    console.log("b", room.value, name.value);
    setRoom(room.value);
    setUser(name.value);
    console.log("a", room.value, name.value);

    router.push({ name: "room", params: { roomId: room.value } });
  } catch (loginError) {
    error.value = loginError;
    console.error("console.error(loginError);", loginError);
  }
};
</script>

<template>
  <ThreeSections>
    <template #header>
      <h1 class="my-header__title">Zorvan</h1>
      <RouterLink to="/about">
        <IconAbout />
      </RouterLink>
    </template>

    <template #default>
      <div class="flex flex-col grow justify-center px-6">
        <h2 class="text-5xl font-bold mb-6">Welcome 👋</h2>
        <div class="flex flex-col gap-6 justify-self-center">
          <MyInput
            label="What's your Nickname?"
            id="user"
            v-model="name"
            placeholder="Bruce Wayne"
          />
          <MyInput
            label="Which Room you wanna get it?"
            id="room"
            v-model="room"
            placeholder="off-topic"
          />
          <div v-if="error">{{ error }}</div>
          <div class="flex flex-wrap gap-1">
            <MyButton
              v-for="r of usersStore.rooms"
              :key="r"
              size="small"
              @click="room = r"
            >
              {{ r }}
            </MyButton>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <MyButton
        type="submit"
        variant="primary"
        class="grow flex justify-center items-center gap-2"
        @click="login"
        :disabled="!name || !room"
      >
        <div>Log in</div>
        <IconLogin />
      </MyButton>
    </template>
  </ThreeSections>
</template>

<style scoped></style>
