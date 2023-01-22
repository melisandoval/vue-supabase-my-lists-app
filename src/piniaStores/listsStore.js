import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./userStore";

// const userStore = useUserStore();

export const useListsStore = defineStore("lists", {
  stores: [useUserStore],

  state: () => ({
    lists: null,
    selectedList: null,
    listSelectedToEdit: null,
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

    // handle state to SHOW the item's list:
    selectListToShow(listObj) {
      this.selectedList = listObj;
    },

    // add a new list to the Lists table in Supabase:
    async addNewList(newListTitle) {
      const userStore = useUserStore();

      const { error } = await supabase
        .from("lists")
        .insert({ title: newListTitle, user_id: userStore.user.id });

      return { error };
    },

    // handle state in order to SHOW delete list confirmation modal:
    // needs to receive an obj with the name and Id of the list:
    selectListToDelete(listObj) {
      this.listSelectedToDelete = listObj;
      console.log(
        `listSelectedToDelete in Pinia is ${JSON.stringify(
          this.listSelectedToDelete
        )}`
      );
    },

    // handle state in order to HIDE delete list confirmation modal:
    deselectListToDelete() {
      this.listSelectedToDelete = null;
      console.log(
        `listSelectedToDelete in Pinia is ${this.listSelectedToDelete}`
      );
    },

    // handle delete in Supabase selected list to delete:
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

    // handle state in order to SHOW edit list modal:
    // needs to receive Id and name of the list
    selectListToEdit(listObj) {
      this.listSelectedToEdit = listObj;
      console.log(
        `listSelectedToEdit in Pinia is ${JSON.stringify(
          this.listSelectedToEdit
        )}`
      );
    },

    // handle state in order to HIDE edit list modal:
    deselectListToEdit() {
      this.listSelectedToEdit = null;
      console.log(`listSelectedToEdit in Pinia is ${this.listSelectedToEdit}`);
    },

    async editSelectedList(newListTitle, listId) {
      try {
        const { error } = await supabase
          .from("lists")
          .update({ title: newListTitle })
          .eq("list_id", listId);

        if (error) {
          console.log(error.message);
          return error;
        }

        if (!error) {
          this.listSelectedToEdit = null;
        }
      } catch (e) {
        console.log(`Error from editSelectedList() catch is ${e}`);
      }
    },
  },
});
