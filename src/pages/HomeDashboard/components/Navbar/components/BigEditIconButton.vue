<template>
  <button>
    <svg
      width="29px"
      height="29px"
      stroke-width="1.60"
      viewBox="0 0 24 24"
      fill="#ffffff"
      xmlns="http://www.w3.org/2000/svg"
      color="#fe8684"
    >
      <path
        d="M13.02 5.828L15.85 3l4.949 4.95-2.829 2.828m-4.95-4.95l-9.606 9.607a1 1 0 00-.293.707v4.536h4.536a1 1 0 00.707-.293l9.606-9.607m-4.95-4.95l4.95 4.95"
        stroke="#fe8684"
        stroke-width="1.60"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  </button>
</template>

<script setup></script>

<style scoped>
button {
  padding: 0.7em;
  display: grid;
  place-items: center;
}

button:hover {
  background-color: var(--dark-pink);
  border-radius: 50%;
}
</style>
