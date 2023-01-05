import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    // error: null,
  }),

  actions: {
    // prueba. borrar luego!
    // setUser(user) {
    //   this.user = user;
    // },

    async fetchUser() {
      try {
        const user = supabase.auth.user();
        this.user = user;
      } catch (error) {
        console.log(error);
      }
    },

    async signUp(userEmail, userPassword, userName) {
      try {
        const { user, error } = await supabase.auth.signUp({
          email: userEmail,
          password: userPassword,
          options: {
            user: {
              name: userName,
            },
          },
        });
        if (user) {
          console.log(`User from Supabase is ${JSON.stringify(this.user)}`);
          this.user = user;
          console.log(`User from Pinia is ${JSON.stringify(this.user)}`);
        }
        if (error) {
          // this.error = error.message;
          // console.log(`Error from Pinia is ${this.error}`);
          return error;
        }
      } catch (error) {
        console.log(`signUp try-catch error is ${error}`);
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
