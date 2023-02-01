<template>
  <div class="no-items-content-container">
    <p>{{ text }}</p>
    <img :src="img" alt="" />
  </div>
</template>

<script setup>
const props = defineProps(["text", "img"]);
</script>

<style scoped>
.no-items-content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  padding-top: 2em;
}

@media (min-width: 1024px) {
  .no-items-content-container {
    padding-top: 0;
    gap: 1em;
  }
}

p {
  text-align: center;
}

img {
  width: 30%;
}
</style>
