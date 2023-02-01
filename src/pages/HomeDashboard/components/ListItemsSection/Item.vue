<template>
  <li class="item-component">
    <!-- bullet button -->
    <div class="item-button-container">
      <button
        :class="{
          'empty-bullet': !item.is_completed,
          'filled-bullet': item.is_completed,
        }"
        @click="toggleBullet"
      />
    </div>
    <!-- item text -->
    <p>{{ item.item_text }}</p>
    <!-- favorite button -->
    <div class="item-button-container">
      <button @click="toggleFavourite">
        <!-- filled heart icon if is favourite-->
        <FilledHeartIconSVG v-if="isFavourite" />
        <!-- unfilled heart icon if is not favourite-->
        <UnfilledHeartIconSVG v-else />
      </button>
    </div>
    <div
      :class="{
        'edit-item-buttons-hidden': !showEditItemButtons,
        'edit-item-buttons-visible': showEditItemButtons,
      }"
      class="edit-item-buttons"
    >
      <!-- delete button -->
      <DeleteIconButton @click="deleteItem" class="action-icon-button" />
    </div>
  </li>
</template>

<script setup>
import { ref, toRef } from "vue";
import { useItemsStore } from "../../../../piniaStores/itemsStore";
import DeleteIconButton from "../../../../components/DeleteIconButton.vue";
import FilledHeartIconSVG from "../../../../components/FilledHeartIconSVG.vue";
import UnfilledHeartIconSVG from "../../../../components/UnFilledHeartIconSVG.vue";

// props
const props = defineProps(["item", "showEditItemButtons"]);
const item = toRef(props, "item");
const showEditItemButtons = toRef(props, "showEditItemButtons");

// store
const itemsStore = useItemsStore();

const emit = defineEmits(["itemChanged"]);

// initial state of is favourite is the same as the item property in db:
let isFavourite = ref(item.value.is_favourite);

async function toggleBullet() {
  const error = await itemsStore.toggleItemIsCompleted(
    item.value.item_id,
    item.value.is_completed
  );

  // tell the parent component to render the list again
  // to update the list items with the order uncompleted first:
  if (!error) {
    emit("itemChanged");
  }
}

async function deleteItem() {
  const error = await itemsStore.deleteItem(item.value.item_id);

  if (error) {
    console.log(error);
  }

  if (!error) {
    emit("itemChanged");
  }
}

async function toggleFavourite() {
  // update the property in Supabase:
  const error = await itemsStore.toggleItemIsFavourite(
    item.value.item_id,
    isFavourite.value
  );

  if (error) {
    console.log(error);
  }

  if (!error) {
    // once is done uptate the heart icon button locally:
    isFavourite.value = !isFavourite.value;
    emit("itemChanged");
  }
}
</script>

<style scoped>
button {
  display: grid;
  place-items: center;
}
.item-component {
  display: flex;
  align-items: center;
}

.item-component p {
  padding-left: 0.6em;
  padding-right: 0.1em;
}

.heart-icon {
  width: 0.9rem;
  height: 0.9rem;
}

.delete-item-icon {
  cursor: pointer;
  padding: 0.2em;
  width: 0.9rem;
  height: 0.9rem;
  display: grid;
  place-items: center;
}

.delete-item-icon:hover {
  background-color: #ffe6e3;
  border-radius: 55%;
}
.edit-item-buttons {
  display: flex;
}

.edit-item-buttons-visible {
  visibility: visible;
}

.edit-item-buttons-hidden {
  visibility: hidden;
}
</style>
