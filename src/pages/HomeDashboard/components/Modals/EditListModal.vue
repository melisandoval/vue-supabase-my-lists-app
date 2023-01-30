<template>
  <div class="modal-container">
    <div class="modal">
      <div class="edit-list-modal-content">
        <h3>Change the list's name:</h3>
        <!-- input field -->
        <label for="new-list-name"> </label>
        <input
          v-model="newListName"
          id="new-list-name"
          type="text"
          :placeholder="selectedListToEdit.listName"
          autocomplete="off"
        />
        <!-- buttons -->
        <div>
          <PrimaryButton text="Confirm" @click="handleConfirmNewName" />
          <SecondaryButton text="Cancel" @click="handleCloseModal" />
        </div>
        <!-- error message: -->
        <div v-if="showInputValMsg">
          <p>Please enter a name with at least one caracter.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useListsStore } from "../../../../piniaStores/listsStore";
import PrimaryButton from "../../../../components/PrimaryButton.vue";
import SecondaryButton from "../../../../components/SecondaryButton.vue";

// lists store:
const listsStore = useListsStore();

const { selectedListToEdit } = storeToRefs(listsStore);

// ref for the form input to edit the List's name:
const newListName = ref("");

// ref for input validation:
let showInputValMsg = ref(false);

async function handleConfirmNewName() {
  // if input is empty, show error msg:
  if (!newListName.value) {
    showInputValMsg.value = true;
  } else {
    try {
      const { data, error } = await listsStore.editSelectedList(
        newListName.value,
        selectedListToEdit.value["listId"]
      );

      if (error) {
        console.log(error);
      }

      if (!error) {
        // set the selectedList (the list to display) to a new list obj with the new returned title,
        // in order to display the name correctly in ListItemsSection component
        listsStore.selectListToShow({
          listName: data[0].title,
          listId: data[0].list_id,
        });

        // fetch again the updtated list to update navbar lists buttons:
        listsStore.fetchUserLists();

        // set input validation message back to false:
        showInputValMsg.value = false;
        // set store state selectedListToEdit back to null (this closes the modal)
        listsStore.deselectListToEdit();
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

<style scoped>
* {
  text-align: center;
}

h3 {
  font-size: 2rem;
  padding: 1em 0;
  text-align: center;
}

input[type="text"] {
  width: 100%;
  border: 0.1em solid #fdaea14f;
  margin: 1em 0;
}

input::placeholder {
  color: #fdaea14f;
}

.edit-list-modal-content {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
