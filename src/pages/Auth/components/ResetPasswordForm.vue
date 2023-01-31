<template>
  <main>
    <form @submit.prevent="sendResetPasswordLink">
      <div>
        <p>
          Enter the email associated with your account, and we'll send you a
          link to reset your password.
        </p>
        <label> Email * </label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <button>Send me the link</button>
    </form>
    <!-- error message -->
    <div>
      <p>{{ errorMsg }}</p>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../../../supabase.js";

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
