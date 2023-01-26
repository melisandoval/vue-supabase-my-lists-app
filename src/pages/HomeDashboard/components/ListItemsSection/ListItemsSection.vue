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
    <h2>{{ selectedList.listName }}</h2>
    <ul class="list-of-items">
      <Item
        v-for="item in items"
        :key="item.item_id"
        :item="item"
        @itemChanged="updateItems"
      />
    </ul>
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useListsStore } from "../../../../piniaStores/listsStore";
import { useItemsStore } from "../../../../piniaStores/itemsStore";
import { storeToRefs } from "pinia";
import Item from "./Item.vue";

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
  itemsStore.fetchListItems(selectedList.value.listId);
});

// component refs:
let newListItem = ref("");
let showErrorMsg = ref(false);
let errorMsg = ref(DEFAULT_ERROR_MESSAGE);

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
</style>
