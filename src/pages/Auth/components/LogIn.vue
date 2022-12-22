<template>
  <main class="flex items-center justify-center h-screen">
    <form class="w-full max-w-xs flex-col">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Name *
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="e.g. Bob Smith"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email *
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="e.g. bobsmith@gmail.com"
          required
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
          required
        >
          Password *
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="********"
          required
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Log in
        </button>
      </div>
      <div class="my-4 flex items-center justify-between">
        <button
          @click="showSignUpForm"
          class="text-blue-500 hover:text-blue-800"
          href="#"
        >
          Don't have an account? Please register.
        </button>
      </div>
    </form>
  </main>
</template>

<script setup>
import { defineEmits } from "vue";

const emits = defineEmits(["toggleForm"]);

function showSignUpForm() {
  emits("toggleForm");
}
</script>

<style scoped></style>
