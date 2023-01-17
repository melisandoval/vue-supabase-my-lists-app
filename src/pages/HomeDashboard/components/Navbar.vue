<template>
  <div class="h-screen">
    <nav
      class="bg-gray-200 min-w-min max-w-xl px-8 flex flex-col absolute inset-y-0 left-0"
    >
      <div
        class="text-3xl text-blue-500 py-16 px-6 block font-medium leading-relaxed"
      >
        <h1>
          Welcome, <br />
          <span class="text-gray-900">{{
            userStore.user.user_metadata.name
          }}</span>
        </h1>
      </div>

      <div class="text-lg py-3 px-6 block">
        <h2>Your lists:</h2>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useUserStore } from "../../../piniaStores/userStore.js";
const userStore = useUserStore();
</script>

<style lang="scss" scoped></style>
