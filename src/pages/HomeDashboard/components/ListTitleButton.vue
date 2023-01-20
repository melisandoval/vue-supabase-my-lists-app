<template>
  <div class="flex flex-row gap-2">
    <button>{{ title }}</button>
    <button class="text-blue-500">Edit</button>
    <button @click="handleDeleteList" class="text-blue-500">Delete</button>
  </div>
</template>

<script setup>
import { useListsStore } from "../../../piniaStores/listsStore";

const props = defineProps(["title", "listId"]);
const emit = defineEmits(["deleteList"]);

const listsStore = useListsStore();

function handleDeleteList() {
  listsStore.selectListToDelete({
    listId: props.listId,
    listName: props.title,
  });
}
</script>

<style lang="scss" scoped></style>
