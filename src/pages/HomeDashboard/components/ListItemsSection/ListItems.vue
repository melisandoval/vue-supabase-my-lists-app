<template>
  <!-- form section -->
  <section>
    <form v-on:submit.prevent="createNewListItem">
      <h3>New item:</h3>
      <label for="new-item"></label>
      <div class="input-and-button">
        <input v-model="newListTitle" id="new-list-item" />
        <button>
          <img src="../../../../assets/add-circle.svg" alt="Add list" />
        </button>
      </div>
    </form>
  </section>

  <!-- list of list's items section -->
  <section>
    <h2>{{ listsStore.selectedList.listName }}:</h2>
  </section>
</template>

<script setup>
import { useListsStore } from "../../../../piniaStores/listsStore";

// stores:
const listsStore = useListsStore();
</script>

<style scoped>
form {
  background-color: #ffe6e3;
  margin-top: 2em;
  margin-bottom: 2em;
  padding: 1em;
  border-radius: 1em;
}

@media (min-width: 1440px) {
  form {
    max-width: 70%;
  }
}

h3 {
  font-size: 1.2rem;
  padding-top: 1em;
}

.input-and-button {
  display: flex;
}

#new-list-item {
  width: 100%;
  margin: 1em 0;
  padding: 0.4em;
}

.add-new-item-button {
  font-size: 1rem;
  height: 3rem;
  margin: 1em 0;
}

button {
  display: grid;
  place-items: center;
  padding: 0.5em;
}

img {
  min-width: 1rem;
  padding: 0.2em;
}
</style>
