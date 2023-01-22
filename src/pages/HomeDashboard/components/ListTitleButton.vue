<template>
  <div>
    <div class="flex flex-row gap-2">
      <button @click="handleShowList">{{ title }}</button>
      <button @click="handleEditList" class="text-blue-500">Edit</button>
      <button @click="handleDeleteList" class="text-blue-500">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { useListsStore } from "../../../piniaStores/listsStore";

const props = defineProps(["title", "listId"]);
const emit = defineEmits(["deleteList"]);

const listsStore = useListsStore();

// handle show selected list item's:
function handleShowList() {
  listsStore.selectListToShow({
    listName: props.title,
    listId: props.listId,
  });
  console.log(
    `listsStore.selectedList is ${JSON.stringify(listsStore.selectedList)}`
  );
}

// makes the edit list modal appears:
function handleEditList() {
  listsStore.selectListToEdit({
    listName: props.title,
    listId: props.listId,
  });

  console.log(
    `listsStore.listSelectedToEdit is ${JSON.stringify(
      listsStore.listSelectedToEdit
    )}`
  );
}

// makes the delete list modal appears:
function handleDeleteList() {
  // call lists store action and pass a list obj to set listSelectedToDelete state:
  listsStore.selectListToDelete({
    listName: props.title,
    listId: props.listId,
  });

  console.log(
    `listsStore.listSelectedToDelete is ${JSON.stringify(
      listsStore.listSelectedToDelete
    )}`
  );
}
</script>

<style lang="scss" scoped></style>
