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
  border-radius: 0.5rem;
  margin: 1rem;
  cursor: pointer;
}
</style>
