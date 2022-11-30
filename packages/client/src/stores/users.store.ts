import { ref } from "vue";
import { defineStore } from "pinia";
import { useSocketStore } from "@/stores/socket.store";
import type { User } from "@/types/commons";

export const useUsersStore = defineStore("users", () => {
  const socketStore = useSocketStore();
  const users = ref<User[]>([]);

  socketStore.socket.on("users", (newUsers) => {
    console.log("Store:Users -> Setting Users");
    setUsers(newUsers);
  });

  const setUsers = (newUsers: User[]) => {
    users.value = newUsers;
  }

  return { users, setUsers };
});
