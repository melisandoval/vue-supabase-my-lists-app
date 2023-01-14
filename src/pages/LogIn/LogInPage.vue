<template>
  <LogInForm
    @showResetPasswordForm="showResetPasswordForm"
    v-if="showLogInForm"
  />
  <ResetPasswordForm v-else />
</template>

<script setup>
import LogInForm from "./components/LogInForm.vue";
import ResetPasswordForm from "./components/ResetPasswordForm.vue";
import { ref } from "vue";

let showLogInForm = ref(true);

function showResetPasswordForm() {
  showLogInForm.value = !showLogInForm.value;
}
</script>

<style scoped></style>
