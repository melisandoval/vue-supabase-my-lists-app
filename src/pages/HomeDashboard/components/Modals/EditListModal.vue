<template>
  <div class="absolute w-full h-full grid place-items-center">
    <div
      class="relative min-w-fit z-40 bg-white border-2 border-slate-500 p-12"
    >
      <div class="m-6">
        <p>Change the list's name:</p>
        <label for="new-list-name">
          <input
            v-model="newListName"
            id="new-list-name"
            type="text"
            :placeholder="selectedListToEdit.listName"
            class="border-2 border-slate-500"
          />
        </label>
        <div>
          <button
            @click="handleConfirmNewName"
            class="border-2 border-slate-500 p-4 m-2"
          >
            Confirm
          </button>
          <button
            @click="handleCloseModal"
            class="border-2 border-slate-500 p-4 m-2"
          >
            Cancel
          </button>

          <p v-if="showInputValMsg">
            Please enter a name with at least one caracter.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useListsStore } from "../../../../piniaStores/listsStore";

// lists store:
const listsStore = useListsStore();

const { selectedListToEdit } = storeToRefs(listsStore);

// ref for the form input to edit the List's name:
const newListName = ref("");

// ref for input validation:
let showInputValMsg = ref(false);

async function handleConfirmNewName() {
  if (!newListName.value) {
    showInputValMsg.value = true;
  } else {
    try {
      const error = await listsStore.editSelectedList(
        newListName.value,
        selectedListToEdit.value["listId"]
      );

      if (!error) {
        // fetch again the updtated list to update navbar lists buttons:
        listsStore.fetchUserLists();
        // set input validation message back to false:
        showInputValMsg.value = false;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

function handleCloseModal() {
  // important: sets the selectedListToEdit state back to null:
  listsStore.deselectListToEdit();
}
</script>

<style lang="scss" scoped></style>
