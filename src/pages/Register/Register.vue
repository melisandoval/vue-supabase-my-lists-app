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
import RegistrationResponse from "../Register/components/RegistrationResponseMsg.vue";

let formHasBeenSent = ref(false);
console.log(`formHasBeenSent is ${formHasBeenSent.value}`);

function toggleFormHasBeenSent() {
  formHasBeenSent.value = !formHasBeenSent.value;
  console.log(`formHasBeenSent is ${formHasBeenSent.value}`);
}
</script>

<style lang="scss" scoped></style>
