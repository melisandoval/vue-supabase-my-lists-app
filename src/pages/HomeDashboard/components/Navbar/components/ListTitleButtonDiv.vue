<template>
  <div class="list-title-button-div">
    <button
      @click="handleShowList"
      class="list-title-button"
      :class="{ 'list-is-selected': isSelected }"
      style="display: flex"
    >
      <BookmarkSVG />
      {{ title }}
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
import { watch, ref, toRef } from "vue";

const props = defineProps(["title", "listId", "key", "showButtons"]);
const emit = defineEmits(["deleteList", "hideNavbarInMobileVersion"]);

const showButtons = toRef(props, "showButtons");

const listsStore = useListsStore();

const { selectedList } = storeToRefs(listsStore);

let isSelected = ref(false);

watch(selectedList, () => {
  if (selectedList.value) {
    if (selectedList.value.listName === props.title) {
      isSelected.value = true;
    } else isSelected.value = false;
  } else return;
});

// handle show selected list item's:
function handleShowList() {
  let screenWidth = window.innerWidth;
  if (screenWidth < 767) {
    emit("hideNavbarInMobileVersion");
  }

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
