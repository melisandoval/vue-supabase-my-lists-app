<template>
  <button>
    <svg
      width="29px"
      height="29px"
      stroke-width="2.06"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#fe8684"
    >
      <path
        d="M16 12H8m0 0l3.5 3.5M8 12l3.5-3.5M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
        stroke="#f8a2a0"
        stroke-width="2.06"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  </button>
</template>

<script setup></script>

<style scoped>
button {
  margin-left: 1rem;
  border: 2px solid white;
  display: grid;
  place-items: center;
  padding: 0.4em;
}

button:hover {
  border: 2px solid #ffe6e3;
  border-radius: 50%;
  background-color: #ffe6e3;
}

@media (min-width: 768px) {
  button {
    visibility: hidden;
  }
}
</style>
