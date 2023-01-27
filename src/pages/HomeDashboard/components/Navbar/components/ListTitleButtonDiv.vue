<template>
  <div class="list-title-button-div">
    <button @click="handleShowList" class="list-title-button">
      {{ title }}
    </button>
    <div class="title-edit-delete-buttons-container">
      <EditIconButton @click="showEditListModal" class="action-icon-button" />
      <DeleteIconButton
        @click="showDeleteListModal"
        class="action-icon-button"
      />
    </div>
  </div>
</template>

<script setup>
import { useListsStore } from "../../../../../piniaStores/listsStore";
import EditIconButton from "../../../../../components/EditIconButton.vue";
import DeleteIconButton from "../../../../../components/DeleteIconButton.vue";

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
function showEditListModal() {
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
function showDeleteListModal() {
  // call lists store action and pass a list obj to set selectedListToDelete state:
  listsStore.selectListToDelete({
    listName: props.title,
    listId: props.listId,
  });
}
</script>

<style lang="scss" scoped></style>
