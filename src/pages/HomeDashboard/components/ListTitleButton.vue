<template>
  <div class="flex flex-row gap-2">
    <button>{{ title }}</button>
    <button class="text-blue-500">Edit</button>
    <button class="text-blue-500">Delete</button>
  </div>
</template>

<script setup>
const props = defineProps(["title"]);
</script>

<style lang="scss" scoped></style>
