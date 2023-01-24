<template>
  <button>{{ text }}</button>
</template>

<script setup>
const props = defineProps(["text"]);
</script>

<style scoped>
button {
  font-family: "Pacifico", cursive;
  color: white;
  background-color: #fe8684;
  font-size: 1.4rem;
  padding: 0.4rem 1rem;
  border: 0.1rem solid #fe8684;
  border-radius: 0.5rem;
  margin: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: white;
  color: #fe8684;
  border: 0.1rem solid #fe8684;
}
</style>
