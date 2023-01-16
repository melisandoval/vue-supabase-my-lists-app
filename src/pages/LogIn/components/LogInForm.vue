<template>
  <main class="flex items-center justify-center h-screen">
    <form v-on:submit.prevent="submitLogIn" class="w-full max-w-xs flex-col">
      <!-- email input -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email *
        </label>
        <input
          v-model="user.email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="e.g. bobsmith@gmail.com"
          required
        />
      </div>

      <!-- password input -->
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
          required
        >
          Password *
        </label>
        <input
          v-model="user.password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="********"
          required
        />
      </div>

      <!-- error message -->
      <div class="my-6">
        <p class="text-red-600">{{ errorMsg }}</p>
      </div>

      <!-- log in button -->
      <div class="flex flex items-center">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Log in
        </button>

        <!-- spinner -->
        <div v-if="showSpinner" class="mx-4">
          <Spinner />
        </div>
      </div>

      <!-- link to register page -->
      <div class="my-4 flex items-center justify-between">
        <p>
          Don't have an account?
          <span class="text-blue-500 hover:text-blue-800"
            ><router-link to="/register">Please register</router-link></span
          >.
        </p>
      </div>
    </form>

    <!-- link to Reset password page  -->
    <div class="my-4 flex items-center justify-between">
      Forgot your password?
      <button
        @click="showResetPasswordForm"
        class="text-blue-500 hover:text-blue-800"
      >
        Reset password.
      </button>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useUserStore } from "../../../piniaStores/userStore";
import Spinner from "../../../components/Spinner.vue";
import { useRouter } from "vue-router";

// for redirecting the user after logged in:
const router = useRouter();

// for v-if showSpinner:
let showSpinner = ref(false);

// for storing the error message to display:
let errorMsg = ref("");

// for storing user inputs:
const user = reactive({
  email: "",
  password: "",
});

// get userStore object in order to use user state and actions:
const userStore = useUserStore();

const emit = defineEmits(["showResetPasswordForm"]);

function showResetPasswordForm() {
  console.log(`showResetPasswordForm was clicked!!!!!!!`);
  emit("showResetPasswordForm");
}

async function submitLogIn() {
  showSpinner.value = true;

  const { data, error } = await userStore.signIn(user.email, user.password);
  console.log(`data from Pinia in logInForm is ${JSON.stringify(data)}`);

  if (error) {
    showSpinner.value = false;
    console.log(`error returned from userStore.signIn() is ${error.message}`);

    if (error.message === "Email not confirmed") {
      // show a different error message to user:
      errorMsg.value =
        "Your email address has not been confirmed. Please check your inbox for a confirmation email and confirm your account to log in.";
    } else if (error.message === "Invalid login credentials") {
      // show a different error message to user:
      errorMsg.value =
        "Sorry, the email or password you entered is incorrect. Please try again or click 'Reset password' to reset your credentials.";
    } else errorMsg.value = error.message;
  }

  if (!error) {
    router.push({ path: "/" });
  }

  showSpinner.value = false;
}
</script>

<style scoped></style>
