import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    session: null,
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
          this.session = session;
          this.user = user; // save the current Supabase logged in user in the state "user":
          console.log(`User in Pinia is ${this.user}`);
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
        return { data, error }; // to use the values in the components
      } catch (error) {
        console.log(`userStore signUp() error is ${error}`);
      }
    },

    // To Sign in user to Supabase:
    async signIn(userEmail, userPassword) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: userEmail,
          password: userPassword,
        });
        this.user = data.user; // save the current Supabase logged in user in the state "user":
        return { data, error };
      } catch (error) {
        console.log(`Error from userStore signIn() is ${error}`);
      }
    },

    // to Log Out a user from Supabase:
    async signOut() {
      try {
        const { error } = await supabase.auth.signOut();
        console.log(`Supabase signOut error is ${error}`);
        this.user = null;
        this.session = null;
        console.log(`Pinia user after signOut is ${JSON.stringify(this.user)}`);

        return error;
      } catch (e) {
        console.log(`Error from userStore signOut() is ${e}`);
      }
    },
  },

  // from Pinia persist:
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
