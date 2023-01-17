<template>
  <section class="h-screen">
    <nav
      class="bg-gray-200 min-w-min max-w-xl px-8 flex flex-col absolute inset-y-0 left-0"
    >
      <div
        class="text-3xl text-blue-500 py-16 px-6 block font-medium leading-relaxed"
      >
        <h1>
          Welcome, <br />
          <span class="text-gray-900">{{
            userStore.user.user_metadata.name
          }}</span>
        </h1>
      </div>

      <div class="text-lg py-3 px-6 block">
        <h2>Your lists:</h2>
      </div>

      <ul>
        <li v-for="list in lists">
          <button>{{ list.title }}</button>
        </li>
      </ul>

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
import { onMounted, ref, watch } from "vue";

const userStore = useUserStore();

let lists = ref([]);
let newList = ref("");

async function fetchUserLists() {
  try {
    const { data, error } = await supabase
      .from("lists")
      .select("title")
      .match({ user_id: userStore.user.id });

    if (data) {
      lists.value = data;
      console.log(lists.value);
    }

    if (error) {
      console.log(
        `error from supabase.from("lists").select() is ${error.message}`
      );
    }
  } catch (e) {
    console.log(`error from Navbar try-catch fetch lists titles is ${e}`);
  }
}

fetchUserLists();

// onMounted(async () => {
//   try {
//     const { data, error } = await supabase
//       .from("lists")
//       .select("title")
//       .match({ user_id: userStore.user.id });

//     if (data) {
//       lists.value = data;
//       console.log(lists.value);
//     }

//     if (error) {
//       console.log(
//         `error from supabase.from("lists").select() is ${error.message}`
//       );
//     }
//   } catch (e) {
//     console.log(`error from Navbar try-catch fetch lists titles is ${e}`);
//   }
// });

async function createNewList() {
  try {
    const { error } = await supabase
      .from("lists")
      .insert({ title: newList.value, user_id: userStore.user.id });

    if (!error) {
      fetchUserLists();
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
