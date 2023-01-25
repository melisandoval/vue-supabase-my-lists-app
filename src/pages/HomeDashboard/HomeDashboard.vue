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
      <PrimaryButton @click="logOut" text="Log out" class="log-out-button" />
      <div class="list-items-div-container">
        <ListItemsWelcomeVue v-if="!selectedList" />
        <ListItems v-else />
      </div>
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
import ListItems from "./components/ListItemsSection/ListItems.vue";
import PrimaryButton from "../../components/PrimaryButton.vue";

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
