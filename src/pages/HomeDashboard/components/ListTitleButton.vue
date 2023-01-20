<template>
  <div>
    <div class="flex flex-row gap-2">
      <button>{{ title }}</button>
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

// makes the edit list modal appears:
function handleEditList() {
  listsStore.selectListToEdit({
    listId: props.listId,
    listName: props.title,
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
    listId: props.listId,
    listName: props.title,
  });
}
</script>

<style lang="scss" scoped></style>
