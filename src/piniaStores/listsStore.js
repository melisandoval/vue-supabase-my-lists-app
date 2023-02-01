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
    async fetchUserLists(userId) {
      const userStore = useUserStore();
      try {
        const { data, error } = await supabase
          .from("lists")
          .select()
          .match({ user_id: userId || userStore.user.id })
          .order("title", { ascending: true });

        if (data) {
          this.lists = data;
        }
        if (error) {
          console.log(`Error from fetchUserLists() is ${error.message}`);
        }
        return { data, error };
      } catch (e) {
        console.log(`Error from fetchUserLists() try-catch is ${e}`);
      }
    },

    // handle state to SHOW the item's list:
    // format of listObj: {listName, listId}
    selectListToShow(listObj) {
      this.selectedList = listObj;
    },

    // sets selectedList back to null:
    deselectListToShow() {
      this.selectedList = null;
    },

    // create a new list:
    async addNewList(newListTitle) {
      const userStore = useUserStore();
      try {
        const { data, error } = await supabase
          .from("lists")
          .insert({ title: newListTitle, user_id: userStore.user.id })
          .select();

        return { data, error };
      } catch (e) {
        console.log(`Error from addNewList() catch is ${e}`);
      }
    },

    // handle state in order to SHOW delete list confirmation modal:
    // format of listObj: {listName, listId}
    selectListToDelete(listObj) {
      this.selectedListToDelete = listObj;
    },

    // handle state in order to HIDE delete list confirmation modal:
    deselectListToDelete() {
      this.selectedListToDelete = null;
    },

    // handle delete in Supabase selected list to delete:
    async deleteSelectedList(listId) {
      // first delete all items related with the list:
      try {
        const { error } = await supabase
          .from("items")
          .delete()
          .eq("list_id", listId);

        if (error) {
          console.log(
            `Error from deleteSelectedList(listId) is ${error.message}`
          );
          return error;
        }

        if (!error) {
          // now delete the list:
          try {
            const { error } = await supabase
              .from("lists")
              .delete()
              .eq("list_id", listId);

            if (error) {
              console.log(
                `Error from deleteSelectedList(listId) is ${error.message}`
              );
            }
            if (!error) {
              this.selectedListToDelete = null;
            }

            return error;
          } catch (e) {
            console.log(`Error from deleteSelectedList(listId) catch is ${e}`);
          }
        }
      } catch (e) {
        console.log(`Error from deleteSelectedList(listId) catch is ${e}`);
      }
    },

    // handle state in order to SHOW edit list modal:
    // format of listObj: {listName, listId}
    selectListToEdit(listObj) {
      this.selectedListToEdit = listObj;
    },

    // handle state in order to HIDE edit list modal:
    deselectListToEdit() {
      this.selectedListToEdit = null;
    },

    async editSelectedList(newListName, listId) {
      try {
        const { data, error } = await supabase
          .from("lists")
          .update({ title: newListName })
          .eq("list_id", listId)
          .select();

        if (error) {
          console.log(error.message);
        }

        if (!error) {
          this.selectedListToEdit = null;
        }

        return { data, error };
      } catch (e) {
        console.log(`Error from editSelectedList() catch is ${e}`);
      }
    },
  },
});
