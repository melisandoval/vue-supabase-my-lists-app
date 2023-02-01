<template>
  <div class="auth-page-container">
    <section class="auth-content-container">
      <header>
        <h1>My lists</h1>
        <img src="../../assets/rabbit-writting.png" alt="" />
      </header>
      <LoginForm
        v-if="userIsRegistered && !showRegisterResponse"
        @userIsNotRegistered="toggleForms"
      />
      <RegisterForm
        v-if="!userIsRegistered && !showRegisterResponse"
        @userIsRegistered="toggleForms"
        @registerFormHasBeenSubmitted="handleShowRegisterResponse"
      />
      <RegisterResponse v-if="showRegisterResponse" />
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import LoginForm from "./components/LogInForm.vue";
import RegisterForm from "./components/RegisterForm.vue";
import RegisterResponse from "./components/RegisterResponse.vue";

let userIsRegistered = ref(true);
let showRegisterResponse = ref(false);

function toggleForms() {
  userIsRegistered.value = !userIsRegistered.value;
}

function handleShowRegisterResponse() {
  showRegisterResponse.value = true;
}
</script>

<style scoped>
h1 {
  font-size: 2rem;
}

img {
  max-width: 50px;
  padding: 1em;
}

.auth-page-container {
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  padding: 1em 0;
}

.auth-content-container {
  display: grid;
  place-items: center;
  width: 90%;
}

header {
  display: flex;
  align-items: center;
}

@media (min-width: 768px) {
  h1 {
    font-size: 4rem;
  }

  img {
    max-width: 100px;
    padding: 1em;
  }

  .auth-content-container {
    width: 70%;
  }
}

@media (min-width: 1024px) {
  .auth-content-container {
    width: 50%;
  }
}

@media (min-width: 1440px) {
  .auth-content-container {
    width: 30%;
  }
}

@media (min-width: 2560px) {
  h1 {
    font-size: 6rem;
  }

  img {
    max-width: 150px;
    padding: 1em 4em;
  }
}
</style>
