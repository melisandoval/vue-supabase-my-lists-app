<template>
  <LogIn
    v-if="userHasAnAccount && userConfirmedEmail"
    @toggleForm="toggleForm"
  />
  <LogInErrorMsg v-if="userHasAnAccount && !userConfirmedEmail" />
  <Register v-if="!userHasAnAccount" @toggleForm="toggleForm" />
</template>

<script setup>
import LogIn from "./components/LogIn.vue";
import Register from "./components/Register.vue";
import LogInErrorMsg from "./components/LogInErrorMsg.vue";

import { ref } from "vue";

const userHasAnAccount = ref(true);
const userConfirmedEmail = ref(true);

function toggleForm() {
  userHasAnAccount.value = !userHasAnAccount.value;
}
</script>

<style scoped></style>
