<template>
  <nav>
    <!-- welcome section -->
    <section class="navbar-header">
      <img src="../../../../assets/rabbit-writting.png" alt="" />
    </section>
    <!-- lists of Lists section -->
    <section class="lists-of-lists-section">
      <div>
        <h1>My lists</h1>
      </div>
      <!-- Display a list of List titles buttons, -->
      <!-- lists come from storeToRefs(listsStore) -->
      <ul>
        <li v-for="list in lists">
          <ListTitleButton
            :title="list.title"
            :listId="list.list_id"
            :key="list.list_id"
          ></ListTitleButton>
        </li>
      </ul>
    </section>
    <!-- new list form section -->
    <section class="navbar-new-list-form-section">
      <form v-on:submit.prevent="createNewList">
        <h3>New list</h3>
        <label for="new-list-title">List's title:</label>
        <div class="new-list-input-and-button">
          <input v-model="newListTitle" id="new-list-title" />
          <button>
            <img src="../../../../assets/add-circle.svg" alt="Add list" />
          </button>
        </div>
      </form>
    </section>
  </nav>
</template>

<script setup>
import { useUserStore } from "../../../../piniaStores/userStore.js";
import { useListsStore } from "../../../../piniaStores/listsStore";
import { storeToRefs } from "pinia";

import { ref } from "vue";
import ListTitleButton from "./components/ListTitleButtonSection.vue";

// get user store to get the name of the user to display in Navbar:
const userStore = useUserStore();
// get lists store to get the titles of the lists to display in lists titles button section:
const listsStore = useListsStore();

// fetch user lists with first render:
listsStore.fetchUserLists();

// obtain lists state as ref to display a list of Lists titles buttons:
const { lists } = storeToRefs(listsStore);

// ref for the create a new list input field:
let newListTitle = ref("");

// function for create new list form:
async function createNewList() {
  try {
    // call listStore action that adds a new list to Supabase Lists table:
    const { error } = await listsStore.addNewList(newListTitle.value);

    if (!error) {
      console.log(newListTitle.value);
      // fetch the lists' titles again to reflect the updated lists in the lists titles section:
      listsStore.fetchUserLists();
      // clear newList input field:
      newListTitle.value = "";
    }

    if (error) {
      console.log(
        `error returned from listsStore.addNewList() is ${error.message}`
      );
    }
  } catch (e) {
    console.log(`error from createNewList() is ${e}`);
  }
}
</script>

<style scoped>
#new-list-title {
  padding: 0.4em;
  font-size: 1rem;
}
</style>
