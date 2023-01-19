import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./userStore";

// const userStore = useUserStore();

export const useListsStore = defineStore("lists", {
  stores: [useUserStore],

  state: () => ({
    lists: null,
    listSelected: null,
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

    // mostrar modal que borra:

    selectList(listId) {
      this.listSelected = listId;
      console.log(`listSelected in Pinia is ${this.listSelected}`);
    },

    deselectList() {
      this.listSelected = null;
      console.log(`listSelected in Pinia is ${this.listSelected}`);
    },

    // borrar lista seleccionada:

    // to-do cambiar nombre de la lista:
  },
});
