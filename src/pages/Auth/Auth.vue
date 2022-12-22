<template>
  <LogIn v-if="userHasAnAccount" @toggleForm="toggleForm" />
  <SignUp v-else @toggleForm="toggleForm" />
</template>

<script setup>
import LogIn from "./components/LogIn.vue";
import SignUp from "./components/SignUp.vue";
import { ref } from "vue";

const userHasAnAccount = ref(true);

function toggleForm() {
  userHasAnAccount.value = !userHasAnAccount.value;
}
</script>

<style scoped></style>
