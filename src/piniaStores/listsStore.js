import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./userStore";

// const userStore = useUserStore();

export const useListsStore = defineStore("lists", {
  stores: [useUserStore],

  state: () => ({
    lists: null,
    listSelectedToDelete: null,
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

    // add a new list to the Lists table in Supabase:
    async addNewList(newListTitle) {
      const userStore = useUserStore();

      const { error } = await supabase
        .from("lists")
        .insert({ title: newListTitle, user_id: userStore.user.id });

      return { error };
    },

    // handle state in order to show/hide delete list confirmation modal:
    selectListToDelete(listObj) {
      this.listSelectedToDelete = listObj;
      console.log(
        `listSelectedToDelete in Pinia is ${JSON.stringify(
          this.listSelectedToDelete
        )}`
      );
    },

    deselectListToDelete() {
      this.listSelectedToDelete = null;
      console.log(
        `listSelectedToDelete in Pinia is ${this.listSelectedToDelete}`
      );
    },

    // delete in Supabase selected list to delete:
    async deleteSelectedList(listId) {
      try {
        const { error } = await supabase
          .from("lists")
          .delete()
          .eq("list_id", listId);

        if (error) {
          console.log(
            `Error from supabase.from("lists").delete().eq("list_id", listId); is ${error.message}`
          );
        }

        if (!error) {
          return true;
        }
      } catch (e) {
        console.log(`Error from deleteSelectedList(listId) catch is ${e}`);
      }
    },

    // to-do cambiar nombre de la lista:
  },
});
