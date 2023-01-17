<template>
  <main class="flex flex-col items-center justify-center h-screen">
    <form @submit.prevent="sendResetPasswordLink">
      <div class="mb-4">
        <p class="mb-2">
          Enter the email associated with your account, and we'll send you a
          link to reset your password.
        </p>
        <label class="block text-gray-700 font-medium mb-2" for="email">
          Email *
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
        Send me the link
      </button>
    </form>

    <!-- error message -->
    <div class="my-6">
      <p class="text-red-600">{{ errorMsg }}</p>
    </div>

    <!-- link to Register form -->
    <div class="my-4 flex items-center justify-between">
      <p>
        <span class="text-blue-500 hover:text-blue-800"
          ><router-link to="/register">Go to register</router-link></span
        >.
      </p>
    </div>

    <!-- link to Log In form -->
    <!-- <div class="my-4 flex items-center justify-between">
      <p>
        <span class="text-blue-500 hover:text-blue-800"
          ><router-link to="/login">Go to login</router-link></span
        >.
      </p>
    </div> -->
  </main>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../../supabase.js";

const email = ref("");
let errorMsg = ref("");

async function sendResetPasswordLink() {
  const { data, error } = await supabase.auth.resetPasswordForEmail(
    email.value,
    {
      redirectTo: "http://localhost:5173/update-password",
    }
  );

  if (data) {
    console.dir(data);
    // if (data.user === undefined) {
    //   errorMsg.value =
    //     "Looks like we don't have a registered account with this email. Please go to register and sign up.";
    // }
  }
  if (error) {
    console.log(`error from resetPasswordForEmail() is "${error.message}"`);
  }
}
</script>

<style lang="scss" scoped></style>
