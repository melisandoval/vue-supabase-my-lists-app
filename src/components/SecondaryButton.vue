<template>
  <button>{{ text }}</button>
</template>

<script setup>
const props = defineProps(["text"]);
</script>

<style scoped>
button {
  color: #fe8684;
  background-color: #fdaea14f;
  font-size: 1.4rem;
  padding: 0.4rem 1rem;
  border: 0.1rem solid #fdaea14f;
  border-radius: 0.5rem;
  margin: 1rem;
  cursor: pointer;
  height: 4rem;
}

button:hover {
  background-color: white;
  border: 0.1rem solid #fdaea14f;
}
</style>
