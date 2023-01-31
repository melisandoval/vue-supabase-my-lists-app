<template>
  <!-- full page modals -->
  <EditListModal v-if="selectedListToEdit" />
  <DeleteListModal v-if="selectedListToDelete" />
  <DeleteAllListItemsModal v-if="areListItemsSelectedToDelete" />
  <!-- Home/ Dashboard -->
  <div class="dashboard-container">
    <section class="navbar-container">
      <Navbar />
    </section>
    <section class="lists-items-section-container">
      <div class="buttons-container">
        <BurgerMenuButton />
        <PrimaryButton @click="logOut" text="Log out" class="log-out-button" />
      </div>
      <div class="list-items-section-content-container">
        <div class="list-items-div-container">
          <ListItemsWelcomeVue v-if="!selectedList" />
          <ListItemsSection v-else />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useUserStore } from "../../piniaStores/userStore.js";
import { useListsStore } from "../../piniaStores/listsStore";
import { useItemsStore } from "../../piniaStores/itemsStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Navbar from "./components/Navbar/Navbar.vue";
import DeleteListModal from "./components/Modals/DeleteListModal.vue";
import EditListModal from "./components/Modals/EditListModal.vue";
import ListItemsWelcomeVue from "./components/ListItemsSection/ListItemsWelcome.vue";
import PrimaryButton from "../../components/PrimaryButton.vue";
import ListItemsSection from "./components/ListItemsSection/ListItemsSection.vue";
import DeleteAllListItemsModal from "./components/Modals/DeleteAllListItemsModal.vue";
import BurgerMenuButton from "../../components/BurgerMenuButton.vue";

const router = useRouter();

// stores:
const userStore = useUserStore();
const listsStore = useListsStore();
const itemsStore = useItemsStore();

// ref to handle v-ifs =
const { selectedList, selectedListToEdit, selectedListToDelete } =
  storeToRefs(listsStore);
const { areListItemsSelectedToDelete } = storeToRefs(itemsStore);

async function logOut() {
  const error = await userStore.signOut();
  if (error) {
    console.log(`Error from HomeDashboard logOut() is ${error.message}`);
  }
  // after log out redirect user to login page:
  router.push({ path: "/auth" });
}
</script>

<style scoped>
.buttons-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
