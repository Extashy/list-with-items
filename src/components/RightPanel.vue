<template>
  <div class="right-panel">
    <div v-for="(listItems, listIndex) in selectedItemsWithSquares" :key="listIndex" class="list-block">
      <h3>{{ listItems.listName }}</h3>
      <div class="item-block">
        <div v-for="item in listItems.selectedItems" :key="item.id" class="item">
          <div
            v-for="index in item.quantity"
            :key="index"
            class="color-square"
            :style="{ backgroundColor: item.color }"
            @click="deleteItem(listItems, item)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedItems: Array, // Array of selected items to display in the right panel
  },
  computed: {
    selectedItemsWithSquares() {
      return this.selectedItems.map(listItems => ({
        listName: listItems.listName,
        selectedItems: listItems.items.filter(item => item.isSelected),
      }));
    },
  },
  methods: {
    deleteItem(listItems, item) {
      // Decrease the "quantity" parameter of the selected item
      if (item.quantity > 0) {
        item.quantity--;
      }
      // If the quantity becomes 0, remove the item from the selected list
      if (item.quantity === 0) {
        const itemIndex = listItems.items.findIndex((i) => i.id === item.id);
        if (itemIndex !== -1) {
          listItems.items.splice(itemIndex, 1);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.right-panel {
  margin-left: 20px;
  
}

.list-block {
  margin-bottom: 20px;
}

.item-block {
  display: flex;
  flex-direction: column;
}

.item {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}

.color-square {
  width: 30px;
  height: 30px;
  margin-right: 5px;
  cursor: pointer;
}
</style>
