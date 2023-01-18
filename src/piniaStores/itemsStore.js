import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useItemsStore = defineStore("items", {
  state: () => ({
    items: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: items } = await supabase
        .from("items")
        .select("*")
        .order("id", { ascending: false });
      this.items = items;
    },
    // Hacer POST
    // Hacer el PUT (edit)
    // Hacer el delete
    // Hacer el PUT (cambiar entre completada y pendiente)
  },
});
