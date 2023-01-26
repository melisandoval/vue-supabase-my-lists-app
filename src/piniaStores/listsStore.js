import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./userStore";

export const useListsStore = defineStore("lists", {
  stores: [useUserStore],

  state: () => ({
    lists: null,
    selectedList: null,
    selectedListToEdit: null,
    selectedListToDelete: null,
  }),

  actions: {
    async fetchUserLists() {
      const userStore = useUserStore();
      try {
        const { data, error } = await supabase
          .from("lists")
          .select()
          .match({ user_id: userStore.user.id })
          .order("title", { ascending: true });

        if (data) {
          this.lists = data;
          console.log(`lists in Pinia store are ${JSON.stringify(this.lists)}`);
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
      console.log(
        `selectedListToShow is ${JSON.stringify(this.selectedList)}}`
      );
    },

    // add a new list to the Lists table in Supabase:
    async addNewList(newListTitle) {
      const userStore = useUserStore();
      try {
        const { error } = await supabase
          .from("lists")
          .insert({ title: newListTitle, user_id: userStore.user.id });
        return { error };
      } catch (e) {
        console.log(`error from listsSTore.addNewList catch is ${e}`);
      }
    },

    // handle state in order to SHOW delete list confirmation modal:
    // needs to receive an obj with the name and Id of the list:
    selectListToDelete(listObj) {
      this.selectedListToDelete = listObj;
      console.log(
        `selectedListToDelete in Pinia is ${JSON.stringify(
          this.selectedListToDelete
        )}`
      );
    },

    // handle state in order to HIDE delete list confirmation modal:
    deselectListToDelete() {
      this.selectedListToDelete = null;
      console.log(
        `selectedListToDelete in Pinia is ${this.selectedListToDelete}`
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
      this.selectedListToEdit = listObj;
      console.log(
        `selectedListToEdit in Pinia is ${JSON.stringify(
          this.selectedListToEdit
        )}`
      );
    },

    // handle state in order to HIDE edit list modal:
    deselectListToEdit() {
      this.selectedListToEdit = null;
      console.log(`selectedListToEdit in Pinia is ${this.selectedListToEdit}`);
    },

    async editSelectedList(newListName, listId) {
      try {
        const { error } = await supabase
          .from("lists")
          .update({ title: newListName })
          .eq("list_id", listId);

        if (error) {
          console.log(error.message);
          return error;
        }

        if (!error) {
          this.selectedListToEdit = null;
        }
      } catch (e) {
        console.log(`Error from editSelectedList() catch is ${e}`);
      }
    },
  },
});
