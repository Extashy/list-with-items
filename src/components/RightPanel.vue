<template>
  <div class="right-panel">
    <div class="color-squares">
      <div v-for="(listItems, listIndex) in selectedItemsWithSquares" :key="listIndex" class="list-block">
        <h3 class="list-title">{{ listItems.listName }}</h3>
        <button class="list-button" @click="toggleShuffle(listIndex)">
          {{ isShuffled[listIndex] ? 'Сортировать' : 'Перемешать' }}
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
      isShuffled: [],
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
      this.$set(this.isShuffled, listIndex, !this.isShuffled[listIndex]);

      if (this.isShuffled[listIndex]) {
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
    this.isShuffled = new Array(this.selectedItems.length).fill(false);
  },
};
</script>

<style lang="scss">
.right-panel {
  display: flex;
  flex-direction: column;
  align-items: center;

  .color-squares {
    display: flex;
    flex-direction: column;
    margin-left: 15px;

    .list-block {
      margin-bottom: 20px;
    }

    .list-title {
      font-size: 22px;
      margin-bottom: 0;
      font-family: sans-serif;
    }

    .list-button {
      width: 120px;
      height: 36px;
      padding: 0 16px;
      margin-top: 10px;
      font-size: .875rem;
      font-weight: bold;
      color: #96187d;
      border: 2px solid #da2fb8;
      border-radius: 4px;
      background-color: #ffd693;
      cursor: pointer;

      &:hover {
        background-color: #3e80cc;
        color: #1a1a1d;
        transition: 0.5s;
      }
    }

    .color-square {
      width: 30px;
      height: 30px;
      margin: 5px 5px 0 0;
      display: inline-block;
      cursor: pointer;
    }
  }
}
</style>
