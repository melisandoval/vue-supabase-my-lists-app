<template>
  <div class="list-title-button-div">
    <button @click="handleShowList" class="list-title-button">
      {{ title }}
    </button>
    <div class="title-edit-delete-buttons-container">
      <button @click="handleEditList" class="action-icon-button">
        <svg
          class="action-icon"
          width="16px"
          height="16px"
          stroke-width="2.02"
          viewBox="0 0 24 24"
          fill="#ffffff"
          xmlns="http://www.w3.org/2000/svg"
          color="#fe8684"
        >
          <path
            d="M13.02 5.828L15.85 3l4.949 4.95-2.829 2.828m-4.95-4.95l-9.606 9.607a1 1 0 00-.293.707v4.536h4.536a1 1 0 00.707-.293l9.606-9.607m-4.95-4.95l4.95 4.95"
            stroke="#fe8684"
            stroke-width="2.02"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
      <button @click="handleDeleteList" class="action-icon-button">
        <svg
          class="action-icon"
          width="16px"
          height="16px"
          viewBox="0 0 24 24"
          stroke-width="2.02"
          fill="#ffffff"
          xmlns="http://www.w3.org/2000/svg"
          color="#fe8684"
        >
          <path
            d="M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75"
            stroke="#fe8684"
            stroke-width="2.02"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useListsStore } from "../../../../../piniaStores/listsStore";

const props = defineProps(["title", "listId"]);
const emit = defineEmits(["deleteList"]);

const listsStore = useListsStore();

// handle show selected list item's:
function handleShowList() {
  listsStore.selectListToShow({
    listName: props.title,
    listId: props.listId,
  });
}

// makes the edit list modal appears:
function handleEditList() {
  listsStore.selectListToEdit({
    listName: props.title,
    listId: props.listId,
  });

  console.log(
    `listsStore.selectedListToEdit is ${JSON.stringify(
      listsStore.selectedListToEdit
    )}`
  );
}

// makes the delete list modal appears:
function handleDeleteList() {
  // call lists store action and pass a list obj to set selectedListToDelete state:
  listsStore.selectListToDelete({
    listName: props.title,
    listId: props.listId,
  });
}
</script>

<style lang="scss" scoped></style>
