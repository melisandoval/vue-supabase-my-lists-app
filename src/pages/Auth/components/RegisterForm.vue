<template>
  <main class="auth">
    <form v-on:submit.prevent="submitRegistration" class="auth-form-card">
      <div class="input-container">
        <label for="name"> Name* </label>
        <input v-model="user.name" id="name" type="text" required />
      </div>
      <!-- email input -->
      <div class="input-container">
        <label> Email* </label>
        <input v-model="user.email" id="email" type="email" required />
      </div>
      <!-- password input -->
      <div class="input-container">
        <label for="password" required>Password*</label>
        <input v-model="user.password" id="password" type="password" required />
      </div>
      <!-- error message -->
      <div>
        <p>{{ errorMsg }}</p>
      </div>
      <!-- log in button with Spinner-->
      <section class="button-section">
        <div class="button-container">
          <PrimaryButton type="submit" text="Register" />
          <!-- spinner -->
          <div v-if="showSpinner">
            <Spinner />
          </div>
        </div>
      </section>
    </form>
    <!-- link to register page -->
    <div class="links">
      <p>Already have an account? <u @click="toggleForms">Please log in</u>.</p>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useUserStore } from "../../../piniaStores/userStore";
import Spinner from "../../../components/Spinner.vue";
import PrimaryButton from "../../../components/PrimaryButton.vue";

// get userStore object in order to use user state and actions:
const userStore = useUserStore();

const emit = defineEmits(["userIsRegistered", "registerFormHasBeenSubmitted"]);

function toggleForms() {
  emit("userIsRegistered");
}

function showResponse() {
  emit("registerFormHasBeenSubmitted");
}

// for storing user inputs:
const user = reactive({
  name: "",
  email: "",
  password: "",
});

// v-ifs:
const errorMsg = ref("");
const showSpinner = ref(false);

// Register button function:
async function submitRegistration() {
  showSpinner.value = true;

  // action from userStore that registers the user to Supabase and
  // returns and error if there is one
  // and a data object that Supabase creates if the user is succesfully registered:
  const { error } = await userStore.signUp(
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
  if (!error) {
    errorMsg.value = "";
    showSpinner.value = false;
    showResponse();
  }
}
</script>

<style lang="scss" scoped></style>
