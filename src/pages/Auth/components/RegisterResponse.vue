<template>
  <main class="auth">
    <div class="auth-form-card">
      <article>
        <h2>Thanks for registering!</h2>
        <p>Please check your email inbox and confirm your account.</p>
      </article>
    </div>
  </main>
</template>

<script setup></script>

<style scoped>
.auth-form-card {
  margin: 1em;
}
article {
  text-align: center;
  padding: 2em 2em 3em;
}

@media (min-width: 768px) {
  h2 {
    font-size: 2rem;
  }

  p {
    font-size: 1.1rem;
  }
}

@media (min-width: 1024px) {
  p {
    font-size: 1.3rem;
  }
}
</style>
