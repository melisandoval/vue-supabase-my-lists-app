<template>
  <div class="list-title-button-div">
    <button
      @click="handleOnListClickEmit"
      class="list-title-button"
      style="display: flex"
      :class="{ 'list-is-selected': isListSelected }"
    >
      <!-- <BookmarkSVG /> -->
      • {{ title }}
    </button>
    <div v-if="showButtons" class="title-edit-delete-buttons-container">
      <EditIconButton
        @click="showEditListModal"
        class="action-icon-button"
        width="16px"
      />
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
import BookmarkSVG from "../../../../../components/BookmarkSVG.vue";
import { storeToRefs } from "pinia";
import { toRef, computed } from "vue";

const props = defineProps(["title", "listId", "key", "showButtons"]);

const emit = defineEmits([
  "deleteList",
  "hideNavbarInMobileVersion",
  "onListClicked",
]);

const listsStore = useListsStore();

function handleOnListClickEmit() {
  let clickedList = {
    title: props.title,
    listId: props.listId,
  };
  emit("onListClicked", clickedList);
}

const showButtons = toRef(props, "showButtons");

const { selectedList } = storeToRefs(listsStore);

// for the highlighted style in the list title button:
const isListSelected = computed(() => {
  if (!selectedList.value) return;

  if (selectedList.value) {
    if (selectedList.value.listId === props.listId) {
      return true;
    } else return false;
  }
});

// makes the edit list modal appears:
function showEditListModal() {
  listsStore.selectListToEdit({
    listName: props.title,
    listId: props.listId,
  });
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
