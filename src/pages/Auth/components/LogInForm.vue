<template>
  <main class="auth">
    <form v-on:submit.prevent="submitLogIn" class="auth-form-card">
      <!-- email input -->
      <div class="input-container">
        <label> Email</label>
        <input v-model="user.email" id="email" type="email" required />
      </div>
      <!-- password input -->
      <div class="input-container">
        <label for="password" required> Password</label>
        <input v-model="user.password" id="password" type="password" required />
      </div>
      <!-- error message -->
      <div>
        <p>{{ errorMsg }}</p>
      </div>
      <!-- log in button with Spinner-->
      <section class="button-section">
        <div class="button-container">
          <PrimaryButton type="submit" text="Log in" />
          <!-- spinner -->
          <div v-if="showSpinner">
            <Spinner />
          </div>
        </div>
      </section>
    </form>
    <!-- link to register page -->
    <div class="links">
      <p>
        Don't have an account?
        <span><router-link to="/register">Please register</router-link></span
        >.
      </p>
      <!-- link to reset password form -->
      <p>
        Forgot your password?
        <span
          ><router-link to="/reset-password">Reset password</router-link></span
        >.
      </p>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useUserStore } from "../../../piniaStores/userStore";
import Spinner from "../../../components/Spinner.vue";
import { useRouter } from "vue-router";
import PrimaryButton from "../../../components/PrimaryButton.vue";

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

const userStore = useUserStore();

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
