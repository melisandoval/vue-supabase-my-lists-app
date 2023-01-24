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

<style scoped>
* {
  text-align: center;
}

h3 {
  font-family: "Pacifico", cursive;
  font-size: 2.2rem;
  padding: 1rem;
}

p,
u {
  font-size: 1.3rem;
  padding: 1rem;
}

p span {
  font-size: 1.3rem;
  background-color: #fdaea14f;
  font-family: "Pacifico", cursive;
  padding: 0 1em;
}
</style>
