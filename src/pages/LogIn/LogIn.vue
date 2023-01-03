<template>
  <LogInForm />
  <LogInErrorMsg v-if="thereIsAnError" />
</template>

<script setup>
import LogInForm from "./components/LogInForm.vue";
import LogInErrorMsg from "./components/LogInErrorMsg.vue";
import { ref } from "vue";

const thereIsAnError = ref(false);
</script>

<style scoped></style>
