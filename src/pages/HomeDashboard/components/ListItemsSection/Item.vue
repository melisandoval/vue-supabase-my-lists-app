<template>
  <div class="item-component">
    <!-- bullet button -->
    <div class="button-container">
      <button
        :class="{ 'empty-bullet': !isCompleted, 'filled-bullet': isCompleted }"
        @click="toggleBullet"
      />
    </div>
    <!-- favorite button -->
    <div class="button-container">
      <button @click="toggleFavourite">
        <!-- filled heart icon ("favourite")-->
        <svg
          v-if="isFavourite"
          class="heart-icon"
          width="16px"
          height="16px"
          stroke-width="2.02"
          viewBox="0 0 24 24"
          fill="#fe8684"
          xmlns="http://www.w3.org/2000/svg"
          color="#fe8684"
        >
          <path
            d="M22 8.862a5.95 5.95 0 01-1.654 4.13c-2.441 2.531-4.809 5.17-7.34 7.608-.581.55-1.502.53-2.057-.045l-7.295-7.562c-2.205-2.286-2.205-5.976 0-8.261a5.58 5.58 0 018.08 0l.266.274.265-.274A5.612 5.612 0 0116.305 3c1.52 0 2.973.624 4.04 1.732A5.95 5.95 0 0122 8.862z"
            stroke="#fe8684"
            stroke-width="2.02"
            stroke-linejoin="round"
          ></path>
        </svg>
        <!-- unfilled heart icon ("no-favourite")-->
        <svg
          v-else
          class="heart-icon"
          width="16px"
          height="16px"
          stroke-width="2.02"
          viewBox="0 0 24 24"
          fill="#ffffff"
          xmlns="http://www.w3.org/2000/svg"
          color="#fe8684"
        >
          <path
            d="M22 8.862a5.95 5.95 0 01-1.654 4.13c-2.441 2.531-4.809 5.17-7.34 7.608-.581.55-1.502.53-2.057-.045l-7.295-7.562c-2.205-2.286-2.205-5.976 0-8.261a5.58 5.58 0 018.08 0l.266.274.265-.274A5.612 5.612 0 0116.305 3c1.52 0 2.973.624 4.04 1.732A5.95 5.95 0 0122 8.862z"
            stroke="#fe8684"
            stroke-width="2.02"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
    </div>
    <!-- item text -->
    <p>Algo para hacer</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

let isCompleted = ref(true);
let isFavourite = ref(false);

function toggleBullet() {
  isCompleted.value = !isCompleted.value;
}

function toggleFavourite() {
  isFavourite.value = !isFavourite.value;
}
</script>

<style scoped>
button {
  display: grid;
  place-items: center;
}
.item-component {
  display: flex;
  align-items: center;
}

.item-component p {
  padding-left: 0.6em;
}

.button-container {
  width: 1.6rem;
  height: 1.6rem;
  display: grid;
  place-items: center;
  border: 2px solid white;
  border-radius: 50%;
}

.button-container:hover {
  border: 2px solid #ffe6e3;
  border-radius: 50%;
  background-color: #ffe6e3;
}

.empty-bullet {
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid #fe8684;
  border-radius: 50%;
  background-color: white;
}

.filled-bullet {
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid #fe8684;
  background-color: #fe8684;
  border-radius: 50%;
}

.heart-icon {
  width: 1.3rem;
  height: 1.3rem;
}
</style>
