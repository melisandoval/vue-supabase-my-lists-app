<template>
  <button
    @click="logOut"
    class="bg-blue-500 hover:bg-blue-700 absolute top-0 right-0 text-white font-bold py-2 px-4 my-6 mx-8 rounded focus:outline-none focus:shadow-outline"
  >
    Log out
  </button>
  <EditListModal v-if="selectedListToEdit" />
  <DeleteListModal v-if="selectedListToDelete" />
  <Navbar />
</template>

<script setup>
import { useUserStore } from "../../piniaStores/userStore.js";
import { useListsStore } from "../../piniaStores/listsStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import Navbar from "./components/Navbar.vue";
import DeleteListModal from "./components/DeleteListModal.vue";
import EditListModal from "./components/EditListModal.vue";

const router = useRouter();

// stores:
const userStore = useUserStore();
const listsStore = useListsStore();

// ref from store to handle show/hide DeleteListModal component:
const { selectedListToDelete, selectedListToEdit } = storeToRefs(listsStore);

async function logOut() {
  const error = await userStore.signOut();
  if (error) {
    console.log(`Error from HomeDashboard logOut() is ${error.message}`);
  }
  // after log out redirect user to login page:
  router.push({ path: "/login" });
}
</script>

<style scoped></style>
