<template>
  <div class="modal-container">
    <div class="modal">
      <div v-if="!showDeleteListResponse" class="m-6">
        <h3>
          Are you sure you want to delete the
          <span>{{ selectedListToDelete.listName }}</span>
          list?
        </h3>
        <p>All the items asociated to the list will be deleted too!</p>

        <div>
          <button @click="handleDeleteList">Delete list</button>
          <button @click="handleCloseModal">Cancel</button>
        </div>
      </div>

      <div v-if="showDeleteListResponse" class="grid place-items-center">
        <p>Done! The list has been deleted.</p>
        <button @click="handleCloseModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useListsStore } from "../../../../piniaStores/listsStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

// list store:
const listsStore = useListsStore();

const { selectedListToDelete } = storeToRefs(listsStore);

// to show response and hide delete buttons after deleting a list:
let showDeleteListResponse = ref(false);

function handleCloseModal() {
  // importan: sets the selectedList state back to null:
  listsStore.deselectListToDelete();
}

async function handleDeleteList() {
  // send the ID of the selected list to delete list action in store:
  console.log(
    `listsStore.selectedListToDelete is ${listsStore.selectedListToDelete}`
  );
  const isDeleted = await listsStore.deleteSelectedList(
    selectedListToDelete.value["listId"]
  );

  if (isDeleted) {
    console.log(`isDeleted is ${true}`);
    listsStore.fetchUserLists();
  }

  showDeleteListResponse.value = true;
  console.log(
    `listsStore.selectedListToDelete is ${listsStore.selectedListToDelete}`
  );
}
</script>

<style lang="scss" scoped></style>
