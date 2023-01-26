import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./userStore";
import { listsStore } from "./listsStore";

export const useItemsStore = defineStore("items", {
  stores: [useUserStore, listsStore],

  state: () => ({
    items: null,
  }),

  actions: {
    // hacer el fetch lists:
    // async fetchTasks() {
    //   const { data: items } = await supabase
    //     .from("items")
    //     .select("*")
    //     .order("id", { ascending: false });
    //   this.items = items;
    // },
    // Hacer POST
    // Hacer el PUT (edit)
    // Hacer el delete
    // Hacer el PUT (cambiar entre completada y pendiente)
    // hacer el de cambiar entre favorito/ no favorito
  },
});
