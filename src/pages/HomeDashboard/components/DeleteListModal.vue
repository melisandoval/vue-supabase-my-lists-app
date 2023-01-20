<template>
  <div class="absolute w-full h-full grid place-items-center">
    <div
      class="relative min-w-fit z-40 bg-white border-2 border-slate-500 p-12"
    >
      <div v-if="!showDeleteListResponse" class="m-6">
        <h3>
          Are you sure you want to delete the
          <span class="text-blue-500">{{ listSelectedToDelete.listName }}</span>
          list?
        </h3>
        <p>All the items asociated to the list will be deleted too!</p>

        <div>
          <button
            @click="handleDeleteList"
            class="border-2 border-slate-500 p-4 m-2"
          >
            Delete list
          </button>
          <button
            @click="handleCloseModal"
            class="border-2 border-slate-500 p-4 m-2"
          >
            Cancel
          </button>
        </div>
      </div>

      <div v-if="showDeleteListResponse" class="grid place-items-center">
        <p class="bg-blue-500 text-center p-4">
          Done! The list has been deleted.
        </p>
        <button
          @click="handleCloseModal"
          class="m-4 p-2 border-2 border-slate-500"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useListsStore } from "../../../piniaStores/listsStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

// list store:
const listsStore = useListsStore();

const { listSelectedToDelete } = storeToRefs(listsStore);

// to show response and hide delete buttons after deleting a list:
let showDeleteListResponse = ref(false);

function handleCloseModal() {
  // importan: sets the selectedList state back to null:
  listsStore.deselectListToDelete();
}

async function handleDeleteList() {
  // send the ID of the selected list to delete list action in store:
  console.log(
    `listsStore.listSelectedToDelete is ${listsStore.listSelectedToDelete}`
  );
  const isDeleted = await listsStore.deleteSelectedList(
    listSelectedToDelete.value["listId"]
  );

  if (isDeleted) {
    console.log(`isDeleted is ${true}`);
    listsStore.fetchUserLists();
  }

  showDeleteListResponse.value = true;
  console.log(
    `listsStore.listSelectedToDelete is ${listsStore.listSelectedToDelete}`
  );
}
</script>

<style lang="scss" scoped></style>
