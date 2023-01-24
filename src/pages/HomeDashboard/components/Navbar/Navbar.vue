<template>
  <nav>
    <!-- welcome section -->
    <section class="navbar-welcome-section">
      <h1>
        <span>{{ userStore.user.user_metadata.name }}</span
        >'s <br />
        amaizing lists!
      </h1>
    </section>
    <!-- lists of Lists section -->
    <section>
      <div>
        <h2>My lists:</h2>
      </div>
      <!-- display a list of List titles buttons: -->
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
    <section>
      <form v-on:submit.prevent="createNewList" class="my-12">
        <h2>New list:</h2>
        <label for="new-list-title">List's title</label>
        <input v-model="newListTitle" id="new-list-title" />
        <button>Add list</button>
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

<style lang="scss" scoped></style>
