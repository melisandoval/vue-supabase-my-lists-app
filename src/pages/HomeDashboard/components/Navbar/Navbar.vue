<template>
  <nav>
    <div class="navbar-content-container">
      <section class="lists-of-lists-section">
        <section class="navbar-header">
          <img src="../../../../assets/rabbit-writting.png" alt="" />
        </section>
        <div class="app-title-container">
          <h1>My lists</h1>
          <div>
            <BigEditIconButtonDisabled v-if="userHasNoLists" />
            <BigEditIconButton
              v-else
              @click="toggleShowEditListsButtons"
              class="button-to-show-edit-buttons"
              :class="{
                'edit-icon-button-is-selected': showEditListsButtons,
              }"
            />
          </div>
        </div>
        <!-- List of list titles buttons, lists state is from storeToRefs(listsStore) -->
        <ul class="list-of-lists">
          <li v-for="list in lists">
            <ListTitleButtonDiv
              :title="list.title"
              :listId="list.list_id"
              :key="list.list_id"
              :showButtons="showEditListsButtons"
            ></ListTitleButtonDiv>
          </li>
        </ul>
      </section>
      <!-- new list form section -->
      <section class="navbar-new-list-form-section">
        <form v-on:submit.prevent="createNewList" autocomplete="off">
          <h3>New list</h3>
          <label for="new-list-title">List's title:</label>
          <div class="new-list-input-and-button">
            <input v-model="newList" id="new-list-title" />
            <button>
              <img src="../../../../assets/add-circle.svg" alt="Add list" />
            </button>
          </div>
          <p v-if="showErrorMsg" class="error-msg">
            Please add at least one character.
          </p>
        </form>
      </section>
    </div>
  </nav>
</template>

<script setup>
import { useListsStore } from "../../../../piniaStores/listsStore";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import ListTitleButtonDiv from "./components/ListTitleButtonDiv.vue";
import BigEditIconButtonDisabled from "./components/BigEditIconButtonDisabled.vue";
import BigEditIconButton from "./components/BigEditIconButton.vue";

// get lists store to get the titles of the lists to display in lists titles button section:
const listsStore = useListsStore();

// fetch user lists with first render:
listsStore.fetchUserLists();

// obtain lists state as ref to display a list of Lists titles buttons:
const { lists } = storeToRefs(listsStore);

// ref for the create a new list input field:
let newList = ref("");
let showErrorMsg = ref(false);
let userHasNoLists = ref(false);
let showEditListsButtons = ref(false);

watch(lists, () => {
  if (lists.value.length === 0) {
    userHasNoLists.value = true;
  } else {
    userHasNoLists.value = false;
    showEditListsButtons.value = false;
  }
});

function toggleShowEditListsButtons() {
  showEditListsButtons.value = !showEditListsButtons.value;
}

// function for create new list form:
async function createNewList() {
  try {
    // preven user to create a list with an empty string:
    if (newList.value.length === 0) {
      showErrorMsg.value = true;
      setTimeout(() => {
        showErrorMsg.value = false;
      }, "2000");
    } else {
      showErrorMsg.value = false;
      // call listStore action that adds a new list to Supabase Lists table:
      const { data, error } = await listsStore.addNewList(newList.value);

      if (!error) {
        // set the new list as the selected list to display:
        listsStore.selectListToShow({
          listName: data[0].title,
          listId: data[0].list_id,
        });
        // fetch the lists' titles again to reflect the updated lists in the lists titles section:
        listsStore.fetchUserLists();
        // clear newList input field:
        newList.value = "";
      }

      if (error) {
        console.log(
          `error returned from listsStore.addNewList() is ${error.message}`
        );
      }
    }
  } catch (e) {
    console.log(`error from createNewList() is ${e}`);
  }
}
</script>

<style scoped>
#new-list-title {
  padding: 0.4em;
  font-size: 1rem;
  width: 100%;
}

.error-msg {
  font-size: 0.8rem;
}
</style>
