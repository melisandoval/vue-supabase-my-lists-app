<template>
  <section class="no-list-items-container">
    <div>
      <h2>Hi, {{ user.user_metadata.name }}!</h2>
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
.no-list-items-container {
  height: 100%;
  z-index: 10;
  display: grid;
  text-align: center;
  align-items: center;
}

p {
  font-size: 1.4rem;
}

img {
  width: 30%;
  height: auto;
  padding: 1.5em;
}
</style>
