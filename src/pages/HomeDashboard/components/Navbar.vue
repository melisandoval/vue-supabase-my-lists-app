<template>
  <section class="h-screen">
    <nav
      class="bg-gray-200 min-w-min max-w-xl px-8 flex flex-col absolute inset-y-0 left-0"
    >
      <!-- welcome section -->
      <section
        class="text-3xl text-blue-500 py-16 px-6 block font-medium leading-relaxed"
      >
        <h1>
          Welcome, <br />
          <span class="text-gray-900">{{
            userStore.user.user_metadata.name
          }}</span>
        </h1>
      </section>

      <section>
        <div class="text-lg py-3 px-6 block">
          <h2>Your lists:</h2>
        </div>

        <!-- display a list of List titles buttons: -->
        <!-- lists come from storeToRefs(listsStore) -->
        <ul>
          <li v-for="list in lists">
            <ListTitleButton
              :title="list.title"
              :listId="list.list_id"
            ></ListTitleButton>
          </li>
        </ul>
      </section>

      <!-- form to create a new List: -->
      <form v-on:submit.prevent="createNewList" class="my-12">
        <h2>Create a new list:</h2>
        <label
          for="title"
          class="block text-sm font-medium leading-5 text-gray-900"
          >List's title</label
        >
        <input
          v-model="newList"
          id="title"
          class="form-input py-3 px-4 block w-full leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        />

        <button
          class="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800"
        >
          Add list
        </button>
      </form>
    </nav>
  </section>
</template>

<script setup>
import { supabase } from "../../../supabase.js";
import { useUserStore } from "../../../piniaStores/userStore.js";
import { useListsStore } from "../../../piniaStores/listsStore";
import { storeToRefs } from "pinia";

import { ref } from "vue";
import ListTitleButton from "./ListTitleButton.vue";

// get user store to get the name of the user to display in Navbar:
const userStore = useUserStore();
// get lists store to get the titles of the lists to display in lists titles button section:
const listsStore = useListsStore();

// fetch user lists with first render:
listsStore.fetchUserLists();

// obtain lists state as ref to display a list of Lists titles buttons:
const { lists } = storeToRefs(listsStore);

// ref for the create a new list input field:
let newList = ref("");

// function for create new list form:
async function createNewList() {
  try {
    const { error } = await supabase
      .from("lists")
      .insert({ title: newList.value, user_id: userStore.user.id });

    if (!error) {
      // fetch the lists' titles again to reflect the updated lists in the lists tittles section:
      listsStore.fetchUserLists();
      // clear newList input field:
      newList.value = "";
    }

    if (error) {
      console.log(
        `error returned from supabase.from("lists").insert() is ${error.message}`
      );
    }
  } catch (e) {
    console.log(`error from createNewList() is ${e}`);
  }
}
</script>

<style lang="scss" scoped></style>
