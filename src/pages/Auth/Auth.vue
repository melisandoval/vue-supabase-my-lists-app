<template>
  <div class="auth-page-container">
    <section class="auth-content-container">
      <header>
        <h1>My lists</h1>
        <img src="../../assets/rabbit-writting.png" alt="" />
      </header>
      <LoginForm v-if="userIsRegistered" @userIsNotRegistered="toggleForms" />
      <RegisterForm v-if="!userIsRegistered" @userIsRegistered="toggleForms" />
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import LoginForm from "./components/LogInForm.vue";
import RegisterForm from "./components/RegisterForm.vue";

let userIsRegistered = ref(true);

function toggleForms() {
  userIsRegistered.value = !userIsRegistered.value;
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
