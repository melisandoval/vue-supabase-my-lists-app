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

      <!-- error message -->
      <div class="my-6">
        <p class="text-red-600">{{ errorMsg }}</p>
      </div>

      <!-- submit button -->
      <div class="flex items-center">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>

        <!-- spinner -->
        <div v-if="showSpinner" class="mx-4">
          <Spinner />
        </div>
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
import { useUserStore } from "../../../piniaStores/userStore";
import Spinner from "../../../components/Spinner.vue";

// for storing user inputs:
const user = reactive({
  name: "",
  email: "",
  password: "",
});

// v-ifs:
let errorMsg = ref("");
let showSpinner = ref(false);

// emits
const emit = defineEmits(["toggleFormHasBeenSent"]);

function showResponse() {
  emit("toggleFormHasBeenSent");
}

// get userStore object in order to use user state and actions:
const userStore = useUserStore();

// Register button function:
async function submitRegistration() {
  showSpinner.value = true;

  // action from userStore that registers the user to Supabase and
  // returns and error if there is one
  // and a data object that Supabase creates if the user is succesfully registered:
  const { data, error } = await userStore.signUp(
    user.email,
    user.password,
    user.name
  );

  if (error) {
    showSpinner.value = false;
    console.log(`error returned from userStore.signUp() is ${error.message}`);

    if (error.message === "Password should be at least 6 characters") {
      // show a different error copy to user:
      errorMsg.value = "Please enter a password with at least 6 characters.";
    } else errorMsg.value = error.message;
  }

  // if user is succesfully registered in Supabase, emit an event in order to
  // make parent component Register to show the RegistrationResponse instead of this Form component:
  if (data.user) {
    errorMsg.value = "";
    showResponse();
  }
}
</script>

<style scoped></style>
