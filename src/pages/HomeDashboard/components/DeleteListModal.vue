<template>
  <div class="absolute w-full h-full grid place-items-center">
    <div class="min-w-fit z-40 bg-white border-2 border-slate-500 p-12">
      <h3>Are you sure you want to delete that list?</h3>
      <p>All the items asociated to the list will be deleted too!</p>
      <button class="border-2 border-slate-500 p-4 m-2">Delete list</button>
      <button
        @click="handleCloseModal"
        class="border-2 border-slate-500 p-4 m-2"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup>
import { useListsStore } from "../../../piniaStores/listsStore";

const listsStore = useListsStore();

function handleCloseModal() {
  console.log("handleCloseModal clicled!!");
  listsStore.deselectList();
}
</script>

<style lang="scss" scoped></style>
