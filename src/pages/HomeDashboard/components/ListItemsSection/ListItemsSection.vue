<template>
  <!-- form section -->
  <section>
    <form v-on:submit.prevent="createNewListItem" autocomplete="off">
      <div class="new-item-form-content">
        <h3>New item:</h3>
        <label for="new-item"></label>
        <div class="input-and-button">
          <input v-model="newListItem" id="new-list-item" />
          <button>
            <img src="../../../../assets/add-circle.svg" alt="Add list" />
          </button>
        </div>
        <p v-if="showErrorMsg" class="error-msg">
          {{ errorMsg }}
        </p>
      </div>
    </form>
  </section>
  <!-- list of list's items section -->
  <section>
    <!-- list title with edit items buttons and filter items buttons-->
    <section class="list-title-section">
      <div class="list-title-container">
        <!-- list title -->
        <h2 @click="handleShowAllListItems">{{ selectedList.listName }}</h2>
        <!-- edit list's items buttons -->
        <EditIconButtonDisabled v-if="listItemsIsEmpty" />
        <EditIconButton
          v-else
          @click="showItemsButtons"
          class="button-to-show-edit-buttons"
          :class="{
            'edit-icon-button-is-selected': showEditItemButtons,
          }"
        />
        <DeleteIconButton
          v-if="!listItemsIsEmpty"
          @click="handleShowDeleteAllListItemsModal"
          :class="{
            'action-icon-button': showEditItemButtons,
            'hidden-list-title-button': !showEditItemButtons,
          }"
        />
      </div>
      <div class="list-items-filters">
        <!-- filter by uncompleted items button -->
        <div
          class="item-button-container"
          :class="{ 'filter-button-is-selected': showOnlyUncompletedItems }"
        >
          <button
            @click="toggleShowOnlyUncompletedItems"
            class="empty-bullet"
          />
        </div>
        <!-- filter by completed items button -->
        <div
          class="item-button-container"
          :class="{ 'filter-button-is-selected': showOnlyCompletedItems }"
        >
          <button @click="toggleShowOnlyCompletedItems" class="filled-bullet" />
        </div>
        <!-- filter by favourites items button -->
        <div
          class="item-button-container"
          :class="{ 'filter-button-is-selected': showOnlyFavouritesItems }"
        >
          <button @click="toggleShowOnlyFavouritesItems">
            <FilledHeartIconSVG />
          </button>
        </div>
      </div>
    </section>
    <!-- list of items section -->
    <section>
      <!-- list of ALL items -->
      <div v-if="showAllItems" class="list-of-items">
        <ul>
          <Item
            v-for="item in items"
            :key="item.item_id"
            :item="item"
            @itemChanged="updateItems"
            :showEditItemButtons="showEditItemButtons"
          />
        </ul>
        <div v-if="listItemsIsEmpty">
          <p>The list is empty.</p>
          <p>Lets create create an item for it!</p>
        </div>
      </div>
      <!-- list of only UNCOMPLETED items -->
      <div v-if="showOnlyUncompletedItems" class="list-of-items">
        <ul v-if="uncompletedItems.length >= 1">
          <Item
            v-for="item in uncompletedItems"
            :key="item.item_id"
            :item="item"
            @itemChanged="updateItems"
            :showEditItemButtons="showEditItemButtons"
          />
        </ul>
        <p v-else>No uncompleted items in this list.</p>
      </div>
      <!-- list of only COMPLETED items -->
      <div v-if="showOnlyCompletedItems" class="list-of-items">
        <ul v-if="completedItems.length >= 1">
          <Item
            v-for="item in completedItems"
            :key="item.item_id"
            :item="item"
            @itemChanged="updateItems"
            :showEditItemButtons="showEditItemButtons"
          />
        </ul>
        <p v-else>No completed items in this list.</p>
      </div>
      <!-- list of only FAVOURITES items -->
      <div v-if="showOnlyFavouritesItems" class="list-of-items">
        <ul v-if="favouritesItems.length >= 1">
          <Item
            v-for="item in favouritesItems"
            :key="item.item_id"
            :item="item"
            @itemChanged="updateItems"
            :showEditItemButtons="showEditItemButtons"
          />
        </ul>
        <p v-else>No favourites items in this list.</p>
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { useListsStore } from "../../../../piniaStores/listsStore";
import { useItemsStore } from "../../../../piniaStores/itemsStore";
import { storeToRefs } from "pinia";
import Item from "./Item.vue";
import EditIconButton from "../../../../components/EditIconButton.vue";
import FilledHeartIconSVG from "../../../../components/FilledHeartIconSVG.vue";
import DeleteIconButton from "../../../../components/DeleteIconButton.vue";
import EditIconButtonDisabled from "../../../../components/EditIconButtonDisabled.vue";

const DEFAULT_ERROR_MESSAGE = "Please add at least one character.";

// stores:
const listsStore = useListsStore();
const itemsStore = useItemsStore();

// states from the stores:
const { items } = storeToRefs(itemsStore);
const { selectedList } = storeToRefs(listsStore);

// component refs:
let newListItem = ref("");
let showErrorMsg = ref(false);
let errorMsg = ref(DEFAULT_ERROR_MESSAGE);
let showAllItems = ref(true);
let showOnlyUncompletedItems = ref(false);
let showOnlyCompletedItems = ref(false);
let showOnlyFavouritesItems = ref(false);
let showEditItemButtons = ref(false); // prop to children Item component
let listItemsIsEmpty = ref(false);

// call fetch items of current selected list with first component render:
onMounted(() => {
  showEditItemButtons.value = false;
  itemsStore.fetchListItems(selectedList.value.listId);
});

watch(items, () => {
  if (items.value.length === 0) {
    showEditItemButtons.value = false;
    listItemsIsEmpty.value = true;
  } else listItemsIsEmpty.value = false;
});

// call fetch items again whenever selectedList changes!:
watch(selectedList, async () => {
  console.log("Watch is called *******");
  if (selectedList.value) {
    try {
      const error = await itemsStore.fetchListItems(selectedList.value.listId);
      if (!error) {
        // reset all v-if refs:
        showOnlyCompletedItems.value = false;
        showOnlyUncompletedItems.value = false;
        showOnlyFavouritesItems.value = false;
        showAllItems.value = true;
      }
    } catch (error) {
      console.log(error);
    }
  }
});

// handle show all list items (title list onClick):
function handleShowAllListItems() {
  // reset all filters:
  showOnlyCompletedItems.value = false;
  showOnlyUncompletedItems.value = false;
  showOnlyFavouritesItems.value = false;
  showAllItems.value = true;
}

// handles only show UNCOMPLETED items:
const uncompletedItems = computed(() => {
  return items.value.filter((item) => item.is_completed == false);
});

function toggleShowOnlyUncompletedItems() {
  if (!showOnlyUncompletedItems.value) {
    // hide the rest of the v-if components:
    showAllItems.value = false;
    showOnlyCompletedItems.value = false;
    showOnlyFavouritesItems.value = false;
    // show the uncompleted items list:
    showOnlyUncompletedItems.value = true;
  } else {
    showAllItems.value = true;
    showOnlyUncompletedItems.value = false;
  }
}

// handles only show COMPLETED items:
const completedItems = computed(() => {
  return items.value.filter((item) => item.is_completed == true);
});

function toggleShowOnlyCompletedItems() {
  if (!showOnlyCompletedItems.value) {
    // hide the rest of the v-if components:
    showAllItems.value = false;
    showOnlyUncompletedItems.value = false;
    showOnlyFavouritesItems.value = false;
    // finally show the Completed items list:
    showOnlyCompletedItems.value = true;
  } else {
    showAllItems.value = true;
    showOnlyCompletedItems.value = false;
  }
}

// handles only show FAVOURITES items:
const favouritesItems = computed(() => {
  return items.value.filter((item) => item.is_favourite == true);
});

function toggleShowOnlyFavouritesItems() {
  if (!showOnlyFavouritesItems.value) {
    // hide the rest of the v-if components:
    showAllItems.value = false;
    showOnlyCompletedItems.value = false;
    showOnlyUncompletedItems.value = false;
    // finally show only the favourites items lists:
    showOnlyFavouritesItems.value = true;
  } else {
    showAllItems.value = true;
    showOnlyFavouritesItems.value = false;
  }
}

// handle show/hide the buttons to edit a single item:
function showItemsButtons() {
  showEditItemButtons.value = !showEditItemButtons.value;
}

// update the list in case the items changed:
function updateItems() {
  itemsStore.fetchListItems(selectedList.value.listId);
}

// function called by add new item form:
async function createNewListItem() {
  // set error message back to its default just in case was changed in last call:
  errorMsg.value = DEFAULT_ERROR_MESSAGE;

  // prevent user to send an empty string:
  if (newListItem.value.length === 0) {
    showErrorMsg.value = true;
    setTimeout(() => {
      showErrorMsg.value = false;
    }, "2000");
  }

  // if is not empty string, allow to create new item:
  if (newListItem.value.length > 0) {
    showErrorMsg.value = false;

    console.log(newListItem.value);

    try {
      const error = await itemsStore.addItemToList(newListItem.value);
      if (error) {
        errorMsg.value = error.message;
      }
      if (!error) {
        // if there is no error,
        // fetch again the items in order to display them in component:
        itemsStore.fetchListItems(selectedList.value.listId);
      }
    } catch (e) {
      console.log(e);
    }

    // clean input field:
    newListItem.value = "";
  }
}

function handleShowDeleteAllListItemsModal() {
  console.log(items);
  itemsStore.toggleAreListItemsSelectedToDelete();
}
</script>

<style scoped>
form {
  background-color: #ffe6e3;
  margin-top: 2em;
  margin-bottom: 1.4em;
  padding: 1em;
  border-radius: 1em;
}

h2 {
  cursor: pointer;
}

h3 {
  font-size: 1.2rem;
  padding-top: 1em;
}

@media (min-width: 1440px) {
  form {
    max-width: 70%;
  }
}

.list-title-container {
  display: flex;
  align-items: center;
  gap: 1em;
}

.input-and-button {
  display: flex;
}

#new-list-item {
  width: 100%;
  margin: 1em 0;
  padding: 0.4em;
}

.add-new-item-button {
  font-size: 1rem;
  height: 3rem;
  margin: 1em 0;
}

button {
  display: grid;
  place-items: center;
  padding: 0.5em;
}

img {
  min-width: 1rem;
  padding: 0.2em;
}

.error-msg {
  font-size: 0.9rem;
  padding: 0;
}

.list-of-items {
  padding: 0 2em 2em;
}

.list-title-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1em;
}

.hidden-list-title-button {
  visibility: hidden;
}
</style>
