<template>
  <div class="modal-container">
    <div class="modal">
      <h3>Are you sure?</h3>
      <p>
        Do you want to <br />
        <u>delete all the items</u><br />
        in the "<span>{{ selectedList.listName }}</span
        >" list?
      </p>
      <div class="modal-buttons">
        <SecondaryButton text="Delete" @click="deleteAllListItems" />
        <PrimaryButton text="Cancel" @click="handleCloseModal" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useListsStore } from "../../../../piniaStores/listsStore";
import { useItemsStore } from "../../../../piniaStores/itemsStore";
import { storeToRefs } from "pinia";
import SecondaryButton from "../../../../components/SecondaryButton.vue";
import PrimaryButton from "../../../../components/PrimaryButton.vue";

const listsStore = useListsStore();
const itemsStore = useItemsStore();

const { selectedList } = storeToRefs(listsStore);

function handleCloseModal() {
  itemsStore.toggleAreListItemsSelectedToDelete();
}

async function deleteAllListItems() {
  const error = await itemsStore.deleteAllListItems(selectedList.value.listId);

  if (!error) {
    try {
      await itemsStore.fetchListItems(selectedList.value.listId);
    } catch (e) {
      console.log(
        `Error for fetchListItems() after deleting all list items is ${e} `
      );
    }

    handleCloseModal();
  }
}
</script>

<style scoped>
h3 {
  padding-top: 1em;
}

p {
  text-align: center;
  padding: 1em;
  line-height: 3.2rem;
}

p,
p u,
p span {
  font-size: 1.3rem;
}

u {
  padding: 0 1em;
  background-color: #fdaea14f;
}

p span {
  font-family: "Pacifico", cursive;
  font-size: 1.6rem;
  text-decoration: underline;
}

.modal-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (min-width: 768px) {
  .modal-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>
