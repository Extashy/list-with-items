<template>
  <div class="right-panel">
    <div class="color-squares">
      <div v-for="(listItems, listIndex) in selectedItemsWithSquares" :key="listIndex" class="list-block">
        <h3>{{ listItems.listName }}</h3>
        <!-- Use the standard template syntax to display dynamic button text -->
        <button @click="toggleShuffle(listIndex)">
          {{ isShuffled[listIndex] ? 'Reset Squares' : 'Shuffle Squares' }}
        </button>
        <div class="item-block">
          <div class="item">
            <div v-for="item in listItems.selectedItems" :key="item.id">
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
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedItems: Array,
  },
  data() {
    return {
      originalOrders: [],
      isShuffled: [], // New data property to store the shuffled state for each list
    };
  },
  computed: {
    selectedItemsWithSquares() {
      return this.selectedItems.map((listItems) => ({
        listName: listItems.listName,
        selectedItems: listItems.items.filter((item) => item.isSelected),
      }));
    },
  },
  methods: {
    deleteItem(listItems, item) {
      if (item.quantity > 0) {
        item.quantity--;
      }
      if (item.quantity === 0) {
        const itemIndex = listItems.items.findIndex((i) => i.id === item.id);
        if (itemIndex !== -1) {
          listItems.items.splice(itemIndex, 1);
        }
      }
    },
    toggleShuffle(listIndex) {
      // Use Vue.set to update the isShuffled property and maintain reactivity
      this.$set(this.isShuffled, listIndex, !this.isShuffled[listIndex]);

      if (this.isShuffled[listIndex]) {
        // Shuffle the squares
        const allSquares = document.querySelectorAll(`.list-block:nth-child(${listIndex + 1}) .color-square`);
        this.originalOrders[listIndex] = Array.from(allSquares).map((square) => square.style.backgroundColor);
        const shuffledSquares = Array.from(allSquares).sort(() => Math.random() - 0.5);
        allSquares.forEach((square, index) => {
          square.style.backgroundColor = shuffledSquares[index].style.backgroundColor;
        });
      } else {
        // Reset the squares
        const allSquares = document.querySelectorAll(`.list-block:nth-child(${listIndex + 1}) .color-square`);
        const originalColors = this.originalOrders[listIndex];
        allSquares.forEach((square, index) => {
          square.style.backgroundColor = originalColors[index];
        });
      }
    },
  },
  mounted() {
    // Initialize the isShuffled array with the default value for each list
    this.isShuffled = new Array(this.selectedItems.length).fill(false);
  },
};
</script>

<style lang="scss">
.right-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list-block {
  margin-bottom: 20px;
}

/* Force each list to be displayed below the other */
.color-squares {
  display: flex;
  flex-direction: column;
}

.item-block {
  display: flex;
}

.color-square {
  width: 30px;
  height: 30px;
  margin-right: 5px;
  display: inline-block; /* Display squares side by side */
}
</style>
