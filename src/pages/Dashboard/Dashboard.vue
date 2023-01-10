<template>
  <div class="flex justify-center items-center h-screen">
    <div class="p-4 bg-white rounded-lg shadow-md">
      <p class="text-center text-lg font-medium">Home/Dashboard</p>
      <button
        @click="logOut"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Log out
      </button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../../piniaStores/userStore.js";

// get userStore object in order to use user state and actions:
const userStore = useUserStore();

function logOut() {
  userStore.signOut();
}
</script>

<style scoped></style>
