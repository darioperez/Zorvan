import { computed, ref } from "vue";
import { defineStore } from "pinia";
import io from "socket.io-client";
import type { User } from "@/types/commons";

export const useSocketStore = defineStore("socket", () => {
  const ENDPOINT = "http://localhost:5000/";
  const socket = ref(io(ENDPOINT, { transports: ["websocket", "polling"] }));

  const login = (name: string, room: string) => {
    return new Promise((resolve, reject) => {
      console.log("Login", name, room);

      const cb = (loginError: any) => {
        if (loginError) {
          console.error(loginError);

          reject(loginError);
        }

        console.log("logged as", name, "to", room);

        resolve({ name, room });
      };

      socket.value.emit("login", { name, room }, cb);
    });
  };

  const logout = (user: User, room: string) => {
    return new Promise((resolve, reject) => {
      const cb = (logoutError: any) => {
        if (logoutError) {
          console.error(logoutError);

          reject(logoutError);
        }

        resolve(null);
      };

      socket.value.emit("logout", { name: user, room }, cb);
    });
  };

  const sendMessage = (message) => {
    return new Promise((resolve, reject) => {
      try {
        const cb = (sendMsgError: any) => {
          if (sendMsgError) {
            reject(sendMsgError);
          }

          resolve(message);
        };
        socket.value.emit("sendMessage", message, cb);
      } catch (sendMsgError) {
        console.error(sendMsgError);
      }
    });
  };

  return { socket, login, logout, sendMessage };
});
