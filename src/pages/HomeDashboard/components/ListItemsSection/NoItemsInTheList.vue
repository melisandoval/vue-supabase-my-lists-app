<template>
  <div>
    <p>{{ text }}</p>
    <img :src="img" alt="" />
  </div>
</template>

<script setup>
const props = defineProps(["text", "img"]);
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  padding-top: 2em;
}

p {
  text-align: center;
}

img {
  width: 40%;
}
</style>
