<template>
  <div class="spinner"></div>
</template>

<script setup></script>

<style scoped>
.spinner {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 3px solid #ffe6e3;
  border-top-color: #fe8684;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
