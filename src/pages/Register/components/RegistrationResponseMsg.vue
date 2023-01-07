<template>
  <div class="bg-gray-200 h-screen flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-xl w-1/3">
      <p class="text-2xl font-bold mb-4">Thanks for registering!</p>
      <p class="mb-4">
        Please check your email inbox and confirm your registration.
      </p>
      <p>
        Once your email has been confirmed,
        <span class="text-blue-500 hover:text-blue-800"
          ><router-link to="/login">please login</router-link></span
        >.
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
