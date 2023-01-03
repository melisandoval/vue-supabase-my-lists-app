<template>
  <main class="flex items-center justify-center h-screen">
    <form v-on:submit.prevent="submitRegistration"
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
          placeholder="e.g. Bob Smith"
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
          placeholder="e.g. bobsmith@gmail.com"
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
          placeholder="********"
          required
        />
      </div>

      <!-- confirm password input -->
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
          required
        >
          Confirm password *
        </label>
        <input
          v-model="user.confirmedPassword"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="confirmed-password"
          type="password"
          placeholder="********"
          required
        />
      </div>

      <!-- error message -->
      <!-- <div v-if="errorMsg" class="mb-6">
        <p>{{ errorMsg }}</p>
      </div> -->

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
        <p>Already have an account? <span class="text-blue-500 hover:text-blue-800"><router-link to="/login">Please login</router-link></span>.</p>
      </div>
    </form>

    <!-- <RegisterResponse v-if="formSubmitted && !errorMsg" /> -->
  </main>
</template>

<script setup allowJs: true >
// import RegisterResponse from "./RegisterResponse.vue";

import { reactive } from "vue";
import { defineEmits } from "vue";
// import { useUserStore } from "../../../store/user";

// emits
const emits = defineEmits([""]);
// function showLogInForm() {
//   emits("toggleForm");
// }

const user = reactive({
  name: "",
  email: "",
  password: "",
  confirmedPassword: "",
});

// submit
// const userStore = useUserStore();
// const formSubmitted = ref(false);
// const errorMsg = ref(null);



function submitRegistration(event) {
  // userStore.signUp(user.email, user.password);
  event.target.reset();

  console.log(user.name)

  // console.log(`user from Register form is: ${user.name}`);
  // console.log(`user in userStore is: ${userStore.user}`);
  // console.log(`user error is ${userStore.error}`);

  // if (userStore.error) {
  //   error.value = true;
  //   errorMsg.value = userStore.error;
  // }

  // formSubmitted.value = true;
}

// const user = useUserStore();
</script>

<style lang="scss" scoped></style>
