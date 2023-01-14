<template>
  <div>
    <RegisterForm
      v-if="!formHasBeenSent"
      @toggleFormHasBeenSent="toggleFormHasBeenSent"
    />
    <RegistrationResponse v-if="formHasBeenSent" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import RegisterForm from "./components/RegisterForm.vue";
import RegistrationResponse from "./components/RegistrationResponseMsg.vue";

let formHasBeenSent = ref(false);

function toggleFormHasBeenSent() {
  formHasBeenSent.value = !formHasBeenSent.value;
}
</script>

<style scoped></style>
