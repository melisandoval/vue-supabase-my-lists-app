<template>
  <section class="no-list-items-container">
    <div>
      <p>Select a list to see the items!</p>
      <img
        src="../../../../assets/light-rabbit-happy.png"
        alt="illustration of a happy rabbit"
      />
    </div>
  </section>
</template>

<script setup></script>

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
  padding: 1em;
}
</style>
