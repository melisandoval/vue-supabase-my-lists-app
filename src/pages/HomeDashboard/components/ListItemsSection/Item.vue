<template>
  <li class="item-component">
    <!-- bullet button -->
    <div class="favourite-button-container">
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
    <div
      :class="{
        'edit-item-buttons-hidden': !showEditItemButtons,
        'edit-item-buttons-visible': showEditItemButtons,
      }"
      class="edit-item-buttons"
    >
      <!-- favorite button -->
      <div class="favourite-button-container">
        <button @click="toggleFavourite">
          <!-- filled heart icon if is favourite-->
          <FilledHeartIconSVG v-if="isFavourite" />
          <!-- unfilled heart icon if is not favourite-->
          <UnfilledHeartIconSVG v-else />
        </button>
      </div>
      <!-- delete button -->
      <DeleteIconButton @handleClick="deleteItem" class="action-icon-button" />
    </div>
  </li>
</template>

<script setup>
import { ref, toRef } from "vue";
import { useItemsStore } from "../../../../piniaStores/itemsStore";
import DeleteIconButton from "../../../../components/DeleteIconButton.vue";
import FilledHeartIconSVG from "../../../../components/FilledHeartIconSVG.vue";
import UnfilledHeartIconSVG from "../../../../components/UnFilledHeartIconSVG.vue";

// store
const itemsStore = useItemsStore();

// props
const props = defineProps(["item", "showEditItemButtons"]);
const item = toRef(props, "item");
const showEditItemButtons = toRef(props, "showEditItemButtons");

const emit = defineEmits(["itemChanged"]);

// TEMPORAL!! CAMBIAR LUEGO POR LO QUE VIENE DE LA DB:
let isFavourite = ref(false);

async function toggleBullet() {
  const error = await itemsStore.toggleItemIsCompleted(
    item.value.item_id,
    item.value.is_completed
  );

  if (!error) {
    emit("itemChanged");
  }
}

async function deleteItem() {
  console.log(item);
}

// TO-DO!!!!
// function toggleFavourite() {
//   isFavourite.value = !isFavourite.value;
// }
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

.favourite-button-container {
  width: 1.6rem;
  height: 1.6rem;
  display: grid;
  place-items: center;
  border: 2px solid white;
  border-radius: 50%;
}

.favourite-button-container:hover {
  border: 2px solid #ffe6e3;
  border-radius: 50%;
  background-color: #ffe6e3;
}

.empty-bullet {
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid #fe8684;
  border-radius: 50%;
  background-color: white;
}

.filled-bullet {
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid #fe8684;
  background-color: #fe8684;
  border-radius: 50%;
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
