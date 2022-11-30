import { ref } from "vue";
import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general", () => {
  const user = ref("");
  const room = ref("");

  function setUser(newUser: string) {
    user.value = newUser;
  }

  function setRoom(newRoom: string) {
    room.value = newRoom;
  }

  return { user, room, setUser, setRoom };
});
