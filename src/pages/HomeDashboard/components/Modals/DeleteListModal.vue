<template>
  <div class="modal-container">
    <div class="modal">
      <div v-if="!showDeleteListResponse" class="m-6">
        <h3>Are you sure?</h3>
        <p>
          All the items asociated with the list <br />
          <span>" {{ selectedListToDelete.listName }} "</span><br />
          will be deleted too!!!
        </p>
        <div>
          <SecondaryButton @click="handleDeleteList" text="Delete list" />
          <PrimaryButton @click="handleCloseModal" text="Cancel" />
        </div>
      </div>

      <div v-if="showDeleteListResponse" class="grid place-items-center">
        <h3>Done!</h3>
        <p>The list has been deleted.</p>
        <PrimaryButton @click="handleCloseModal" text="Close" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useListsStore } from "../../../../piniaStores/listsStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import SecondaryButton from "../../../../components/SecondaryButton.vue";
import PrimaryButton from "../../../../components/PrimaryButton.vue";

// list store:
const listsStore = useListsStore();

const { selectedListToDelete, selectedList } = storeToRefs(listsStore);

// to show response and hide delete buttons after deleting a list:
let showDeleteListResponse = ref(false);

function handleCloseModal() {
  // important: sets the selectedList state back to null:
  listsStore.deselectListToDelete();
}

async function handleDeleteList() {
  // if (selectedListToDelete.value.listId === selectedList.value.listId) {
  //   listsStore.deselectListToShow();
  // }
  console.log(`selected list is ${JSON.stringify(selectedList.value)}`);
  console.log(
    `selectedListToDelete is ${JSON.stringify(selectedListToDelete.value)}`
  );

  listsStore.deselectListToShow();
  // call to store to delete list from Supabase:
  const error = await listsStore.deleteSelectedList(
    selectedListToDelete.value.listId
  );

  if (!error) {
    listsStore.fetchUserLists();
  }

  showDeleteListResponse.value = true;
  console.log(
    `listsStore.selectedListToDelete is ${listsStore.selectedListToDelete}`
  );
}
</script>

<style scoped>
* {
  text-align: center;
}

h3 {
  font-family: "Pacifico", cursive;
  font-size: 2.2rem;
  padding: 1rem;
}

p {
  font-size: 1.3rem;
  padding-bottom: 1rem;
}

p span {
  font-size: 1.3rem;
  background-color: #fdaea14f;
  font-family: "Pacifico", cursive;
  padding: 0 1em;
}
</style>
