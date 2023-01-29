<template>
  <div class="modal-container">
    <div class="modal">
      <h3>Are you sure?</h3>
      <p>
        Do you want to delete <u>all the items</u> in the
        <span>{{ selectedList.listName }}</span> list?
      </p>
      <div>
        <SecondaryButton text="Delete" />
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
</script>

<style scoped>
h3 {
  padding: 1em;
}

p {
  text-align: center;
}

p,
p u,
p span {
  font-size: 1.3rem;
}

p span {
  font-family: "Pacifico", cursive;
}
</style>
