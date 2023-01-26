import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./userStore";
import { useListsStore } from "./listsStore";

export const useItemsStore = defineStore("items", {
  stores: [useUserStore, useListsStore],

  state: () => ({
    items: null,
    // selectedItem: null,
  }),

  actions: {
    // fetch a list of items from a single list of the logged in user:
    async fetchListItems(selectedListId) {
      console.log(
        "%c fetchListItems() is called!",
        "background: #222; color: #bada55"
      );

      const userStore = useUserStore();
      const listStore = useListsStore();
      // console.log(
      //   `selectedList in itemsStore is ${JSON.stringify(
      //     listStore.selectedList
      //   )}`
      // );

      try {
        const { data, error } = await supabase
          .from("items")
          .select()
          .match({
            user_id: userStore.user.id,
            list_id: selectedListId,
          })
          .order("is_favourite")
          .order("is_completed");

        if (data) {
          // update items state with the fetched data:
          this.items = data;
          // console.log(`items are ${JSON.stringify(this.items)}`);
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
          item_text: item,
          user_id: userStore.user.id,
          list_id: listStore.selectedList.listId,
        });
        return error;
      } catch (e) {
        console.log(`Error from itemsStore.addItemToList() catch is ${e}`);
      }
    },

    // toggle is_completed of selected item:
    async toggleItemIsCompleted(itemId, isCompleted) {
      if (!isCompleted) {
        try {
          const { error } = await supabase
            .from("items")
            .update({ is_completed: true })
            .eq("item_id", itemId);

          if (error) {
            console.log(error.message);
          }

          return error;
        } catch (e) {
          console.log(`Error from toggleItemIsCompleted() catch is ${e}`);
        }
      }

      if (isCompleted) {
        try {
          const { error } = await supabase
            .from("items")
            .update({ is_completed: false })
            .eq("item_id", itemId);

          if (error) {
            console.log(error.message);
          }
          return error;
        } catch (e) {
          console.log(`Error from toggleItemIsCompleted() catch is ${e}`);
        }
      }
    },

    // hacer el de cambiar entre favorito/ no favorito

    // Hacer el delete
  },
});
