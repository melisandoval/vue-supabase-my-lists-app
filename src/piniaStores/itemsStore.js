import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./userStore";
import { useListsStore } from "./listsStore";

export const useItemsStore = defineStore("items", {
  stores: [useUserStore, useListsStore],

  state: () => ({
    items: null,
  }),

  actions: {
    // fetch a list of items from a single list of the logged in user:
    async fetchListItems(selectedListId) {
      console.log("fetchListItems() is called!!!!!!!!!!!!!");

      const userStore = useUserStore();
      const listStore = useListsStore();
      console.log(
        `selectedList in itemsStore is ${JSON.stringify(
          listStore.selectedList
        )}`
      );

      try {
        const { data, error } = await supabase
          .from("items")
          .select()
          .match({
            user_id: userStore.user.id,
            list_id: selectedListId,
          })
          .order("item", { ascending: true });

        if (data) {
          this.items = data;
          console.log(`this.items are ${JSON.stringify(this.items)}`);
        }
        if (error) {
          console.log(
            `error from supabase.from("items").select() is ${error.message}`
          );
        }
      } catch (e) {
        console.log(`error from fetchListItems() try-catch is ${e}`);
      }
    },

    // add a new item to a specific User's List:
    async addItemToList(item) {
      const userStore = useUserStore();
      const listStore = useListsStore();

      try {
        const { error } = await supabase.from("items").insert({
          item: item,
          user_id: userStore.user.id,
          list_id: listStore.selectedList.listId,
        });
        return error;
      } catch (e) {
        console.log(`Error from itemsStore.addItemToList() catch is ${e}`);
      }
    },

    // Hacer el PUT (edit)
    // Hacer el delete
    // Hacer el PUT (cambiar entre completada y pendiente)
    // hacer el de cambiar entre favorito/ no favorito
  },
});
