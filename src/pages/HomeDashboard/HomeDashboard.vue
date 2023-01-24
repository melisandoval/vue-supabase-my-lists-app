<template>
  <!-- full page modals -->
  <EditListModal v-if="selectedListToEdit" />
  <DeleteListModal v-if="selectedListToDelete" />
  <!-- Home/ Dashboard -->
  <div class="dashboard-container">
    <section class="navbar-container">
      <Navbar />
    </section>
    <section class="lists-items-section-container">
      <button @click="logOut">Log out</button>
      <ListItemsWelcomeVue v-if="!selectedList" />
    </section>
  </div>
</template>

<script setup>
import { useUserStore } from "../../piniaStores/userStore.js";
import { useListsStore } from "../../piniaStores/listsStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import Navbar from "./components/Navbar/Navbar.vue";
import DeleteListModal from "./components/Modals/DeleteListModal.vue";
import EditListModal from "./components/Modals/EditListModal.vue";
import ListItemsWelcomeVue from "./components/ListItemsSection/ListItemsWelcome.vue";

const router = useRouter();

// stores:
const userStore = useUserStore();
const listsStore = useListsStore();

// ref to handle v-if =
const { selectedList, selectedListToEdit, selectedListToDelete } =
  storeToRefs(listsStore);

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
