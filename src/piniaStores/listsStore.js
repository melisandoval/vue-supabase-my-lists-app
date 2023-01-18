import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./userStore";

// const userStore = useUserStore();

export const useListsStore = defineStore("lists", {
  stores: [useUserStore],

  state: () => ({
    lists: null,
  }),

  actions: {
    async fetchUserLists() {
      const userStore = useUserStore();
      try {
        const { data, error } = await supabase
          .from("lists")
          .select()
          .match({ user_id: userStore.user.id });

        if (data) {
          this.lists = data;
          console.log(`lists in Pinia store is ${JSON.stringify(this.lists)}`);
        }

        if (error) {
          console.log(
            `error from supabase.from("lists").select() is ${error.message}`
          );
        }
      } catch (e) {
        console.log(`error from fetchUserLists() try-catch is ${e}`);
      }
    },
  },

  // hacer borrar lista seleccionada:

  // hacer cambiar nombre de la lista:
});
