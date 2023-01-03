import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    error: null,
  }),

  actions: {
    // prueba. borrar luego!
    // setUser(user) {
    //   this.user = user;
    // },

    async fetchUser() {
      try {
        const user = await supabase.auth.user();
        this.user = user;
      } catch (error) {
        console.log(error);
      }
    },

    async signUp(userEmail, userPassword) {
      try {
        const { user, error } = await supabase.auth.signUp({
          email: userEmail,
          password: userPassword,
        });
        if (user) this.user = user;
        if (error) this.error = error;
      } catch (error) {
        this.error = error;
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
