<template>
  <div class="absolute w-full h-full grid place-items-center">
    <div
      class="relative min-w-fit z-40 bg-white border-2 border-slate-500 p-12"
    >
      <div class="m-6">
        <p>Insert the new list's name:</p>
        <label for="new-list-name">
          <input
            v-model="newListName"
            id="new-list-name"
            type="text"
            placeholder=""
            class="border-2 border-slate-500"
          />
        </label>
        <div>
          <button
            @click="handleConfirmNewName"
            class="border-2 border-slate-500 p-4 m-2"
          >
            Confirm
          </button>
          <button
            @click="handleCloseModal"
            class="border-2 border-slate-500 p-4 m-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useListsStore } from "../../../piniaStores/listsStore";

// list store:
const listsStore = useListsStore();

// ref for the input:

const newListName = ref("");

function handleConfirmNewName() {
  //   console.log(newListName.value);
}

function handleCloseModal() {
  // important: sets the selectedListToEdit state back to null:
  listsStore.deselectListToEdit();
}
</script>

<style lang="scss" scoped></style>
