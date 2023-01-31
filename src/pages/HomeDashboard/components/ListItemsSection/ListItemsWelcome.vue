<template>
  <section class="no-list-items-container">
    <div class="content-container">
      <h2 v-if="user">Hi, {{ user.user_metadata.name }}!</h2>
      <p>Select a list or create a new one!</p>
      <img
        src="../../../../assets/light-rabbit-happy.png"
        alt="illustration of a happy rabbit"
      />
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../../../../piniaStores/userStore";

const userStore = useUserStore();

const { user } = storeToRefs(userStore);
</script>

<style scoped>
h2 {
  font-size: 2rem;
}

.content-container {
  padding-top: 7em;
}
.no-list-items-container {
  height: 100vh;
  z-index: 10;
  display: grid;
  text-align: center;
  align-items: start;
}

p {
  font-size: 1.4rem;
}

img {
  width: 20%;
  height: auto;
  padding: 1.5em;
}
</style>
