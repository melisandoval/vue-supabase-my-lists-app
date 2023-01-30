<template>
  <div class="auth-page-container">
    <section class="auth-content-container">
      <header>
        <h1>My lists</h1>
        <img src="../../assets/rabbit-writting.png" alt="" />
      </header>
      <LoginForm />
    </section>
  </div>
</template>

<script setup>
import LoginForm from "./components/LogInForm.vue";
</script>

<style scoped>
h1 {
  font-size: 2.5rem;
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
}

.auth-content-container {
  display: grid;
  place-items: center;
  width: 90%;
}

header {
  display: flex;
  align-items: center;
  padding: 1em 0;
}
</style>
