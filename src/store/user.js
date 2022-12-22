import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      try {
        const user = await supabase.auth.user();
        this.user = user;
      } catch (error) {
        console.log(error);
      }
    },

    async signUp(email, password) {
      try {
        const { user, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (user) this.user = user;
      } catch (error) {
        console.log(error);
      }
    },

    // Hacer sign in
    // Hacer log out

    persist: {
      enabled: true,
      strategies: [
        {
          key: "user",
          storage: localStorage,
        },
      ],
    },
  },
});
