<template>
  <main class="flex items-center justify-center h-screen">
    <form
      v-on:submit.prevent="submitRegistration"
      class="w-full max-w-xs flex-col"
    >
      <!-- user name -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Name *
        </label>
        <input
          v-model="user.name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          required
        />
      </div>

      <!-- user email -->
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email *
        </label>
        <input
          v-model="user.email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          required
        />
      </div>

      <!-- user password -->
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
          required
        >
          Password *
        </label>
        <input
          v-model="user.password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          required
        />
      </div>

      <!-- oninvalid="this.setCustomValidity('Please enter a password with at least 6 characters.')" -->

      <!-- error message -->
      <div class="my-6">
        <p class="text-red-600">{{ errorMsg }}</p>
      </div>

      <!-- submit button -->
      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </div>

      <!-- link to Sign up form -->
      <div class="my-4 flex items-center justify-between">
        <p>
          Already have an account?
          <span class="text-blue-500 hover:text-blue-800"
            ><router-link to="/login">Please login</router-link></span
          >.
        </p>
      </div>
    </form>
  </main>
</template>

<script setup>
import { reactive, ref } from "vue";
import { defineEmits } from "vue";
import { useUserStore } from "../../../piniaStores/userStore";

// emits
const emit = defineEmits(["toggleFormHasBeenSent"]);

const user = reactive({
  name: "",
  email: "",
  password: "",
});

let errorMsg = ref("");

function showResponse() {
  emit("toggleFormHasBeenSent");
}

// extract object with state and methods from userStore:
const userStore = useUserStore();

async function submitRegistration(event) {
  console.log(`User from inputs is ${JSON.stringify(user)}`);

  // signUp() action from userStore registers the user to Supabase and returns and error if there is one:
  const error = await userStore.signUp(user.email, user.password, user.name);

  if (error) {
    console.log(`error returned from userStore.signUp() is ${error.message}`);
    if (error.message === "Password should be at least 6 characters") {
      errorMsg.value = "Please enter a password with at least 6 characters.";
    } else errorMsg.value = error.message;
  }

  if (userStore.user.user) {
    errorMsg.value = "";
    showResponse();
  }

  event.target.reset();
}
</script>

<style lang="scss" scoped></style>
