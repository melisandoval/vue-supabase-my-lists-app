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
        <h2>{{ selectedList.listName }}</h2>
        <EditIconButton
          @click="showItemsButtons"
          class="action-icon-button"
          :class="{ 'edit-items-is-selected': showEditItemButtons }"
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
    <!-- list of ALL items -->
    <ul v-if="showAllItems" class="list-of-items">
      <Item
        v-for="item in items"
        :key="item.item_id"
        :item="item"
        @itemChanged="updateItems"
        :showEditItemButtons="showEditItemButtons"
      />
    </ul>
    <!-- list of only UNCOMPLETED items -->
    <ul v-if="showOnlyUncompletedItems" class="list-of-items">
      <Item
        v-for="item in uncompletedItems"
        :key="item.item_id"
        :item="item"
        @itemChanged="updateItems"
        :showEditItemButtons="showEditItemButtons"
      />
    </ul>
    <!-- list of only COMPLETED items -->
    <ul v-if="showOnlyCompletedItems" class="list-of-items">
      <Item
        v-for="item in completedItems"
        :key="item.item_id"
        :item="item"
        @itemChanged="updateItems"
        :showEditItemButtons="showEditItemButtons"
      />
    </ul>
    <!-- list of only FAVOURITES items -->
    <ul v-if="showOnlyFavouritesItems" class="list-of-items">
      <Item
        v-for="item in favouritesItems"
        :key="item.item_id"
        :item="item"
        @itemChanged="updateItems"
        :showEditItemButtons="showEditItemButtons"
      />
    </ul>
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

const DEFAULT_ERROR_MESSAGE = "Please add at least one character.";

// stores:
const listsStore = useListsStore();
const itemsStore = useItemsStore();

// states from the stores:
const { items } = storeToRefs(itemsStore);
const { selectedList } = storeToRefs(listsStore);

// call fetch items of current selected list with first component render:
onMounted(() => {
  itemsStore.fetchListItems(selectedList.value.listId);
});

// call fetch items again whenever selectedList changes!:
watch(selectedList, async () => {
  console.log("Watch is called *******");
  if (selectedList.value) {
    try {
      const error = await itemsStore.fetchListItems(selectedList.value.listId);
      if (!error) {
        // reset all v-if refs:
        showAllItems.value = true;
        showOnlyCompletedItems.value = false;
        showOnlyUncompletedItems.value = false;
        showOnlyFavouritesItems.value = false;
      }
    } catch (error) {
      console.log(error);
    }
  }
});

// component refs:
let newListItem = ref("");
let showErrorMsg = ref(false);
let errorMsg = ref(DEFAULT_ERROR_MESSAGE);
let showAllItems = ref(true);
let showOnlyUncompletedItems = ref(false);
let showOnlyCompletedItems = ref(false);
let showOnlyFavouritesItems = ref(false);
let showEditItemButtons = ref(false); // prop to children Item component

//BORRAR!!!
console.log(items.value);

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

// function called when children component emits @itemChanged:
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
</script>

<style scoped>
form {
  background-color: #ffe6e3;
  margin-top: 2em;
  margin-bottom: 1.4em;
  padding: 1em;
  border-radius: 1em;
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

h3 {
  font-size: 1.2rem;
  padding-top: 1em;
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
</style>
