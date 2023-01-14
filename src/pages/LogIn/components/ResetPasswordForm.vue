<template>
  <main class="flex items-center justify-center h-screen">
    <form @submit.prevent="resetPassword">
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="email">
          Enter the email associated with your account, and we'll send you a
          link to reset your password:
        </label>
        <input
          v-model="email"
          class="border border-gray-400 p-2 w-full"
          type="email"
          id="email"
          required
        />
      </div>
      <button
        class="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600"
      >
        Reset password
      </button>
    </form>
  </main>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
</script>

<style lang="scss" scoped></style>
