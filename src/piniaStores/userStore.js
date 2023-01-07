import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    // to get the current Supabase logged-in user:
    async fetchUser() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession(); // gets the logged-in user
        if (session) {
          const { user } = session;
          this.user = user; // save the current Supabase logged in user in the state "user":
        }
      } catch (error) {
        console.log(`userStore fetchUser() error is: "${error}"`);
      }
    },

    // to register a new user to Supabase:
    async signUp(userEmail, userPassword, userName) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: userEmail,
          password: userPassword,
          options: {
            data: {
              name: userName,
            },
          },
        });
        if (data) {
          this.user = data;
          console.log(`User from Pinia is ${JSON.stringify(this.user)}`);
        }
        if (error) {
          return error;
        }
      } catch (error) {
        console.log(`userStore signUp() error is ${error}`);
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
