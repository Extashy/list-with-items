<template>
  <div class="app">
    <div class="left-panel">
      <List
        v-for="list in lists"
        :key="list.id"
        :listName="list.listName"
        :items="list.items"
        @itemSelected="toggleItem"
      />
    </div>

    <RightPanel :selectedItems="computedSelectedItems" @selectedItemsChanged="updateSelectedItems" />
  </div>
</template>

<script>
import List from "./components/List.vue";
import RightPanel from "./components/RightPanel.vue";

export default {
  components: {
    List,
    RightPanel,
  },
  data() {
    return {
      lists: [
        {
          id: 1,
          listName: 'Список 1',
          items: [
            { id: 1, quantity: 3, color: "#ff0000", isSelected: false },
            { id: 2, quantity: 2, color: "#00ff00", isSelected: false },
            { id: 3, quantity: 1, color: "#0000ff", isSelected: false },
            { id: 4, quantity: 1, color: "#ffff00", isSelected: false }
          ],
        },
        {
          id: 2,
          listName: 'Список 2',
          items: [
            { id: 5, quantity: 5, color: "#00ffff", isSelected: false },
            { id: 6, quantity: 2, color: "#ff00ff", isSelected: false },
            { id: 7, quantity: 4, color: "#cffc02", isSelected: false },
            { id: 8, quantity: 7, color: "#000000", isSelected: false },
          ],
        },
        {
          id: 3,
          listName: 'Список 3',
          items: [
            { id: 9, quantity: 1, color: "#808080", isSelected: false },
            { id: 10, quantity: 8, color: "#ff6666", isSelected: false },
            { id: 11, quantity: 4, color: "#800000", isSelected: false },
            { id: 12, quantity: 3, color: "#808000", isSelected: false },
          ],
        },
        {
          id: 4,
          listName: 'Список 4',
          items: [
            { id: 9, quantity: 9, color: "#000080", isSelected: false },
            { id: 10, quantity: 6, color: "#800080", isSelected: false },
            { id: 11, quantity: 1, color: "#008080", isSelected: false },
            { id: 12, quantity: 8, color: "#00ff00", isSelected: false },
          ],
        },
        {
          id: 5,
          listName: 'Список 5',
          items: [
            { id: 9, quantity: 3, color: "#00ffff", isSelected: false },
            { id: 10, quantity: 1, color: "#ff00ff", isSelected: false },
            { id: 11, quantity: 9, color: "#ffa500", isSelected: false },
            { id: 12, quantity: 5, color: "#4b0082", isSelected: false },
          ],
        }
      ],
      selectedItems: [],
    };
  },
  computed: {
    computedSelectedItems() {
      const selectedItems = [];
      this.lists.forEach((list) => {
        const selectedListItems = list.items.filter((item) => item.isSelected);
        if (selectedListItems.length > 0) {
          selectedItems.push({ listName: list.listName, items: selectedListItems });
        }
      });
      return selectedItems;
    },
  },
  methods: {
    toggleItem(itemId) {
      this.lists.forEach((list) => {
        const item = list.items.find((item) => item.id === itemId);
        if (item) {
          item.isSelected = !item.isSelected;
        }
      });
    },
    updateSelectedItems(selectedItems) {
      this.selectedItems = selectedItems;
    },
  },
};
</script>

<style lang="scss">
.app {
  display: flex;
  align-items: flex-start;
  justify-content: center;

  .left-panel {
    display: flex;
    flex-direction: column;
    width: 40%;
    border: 3px solid transparent;
    border-radius: 8px;
    background:
      linear-gradient(rgb(253, 254, 206), rgb(128, 128, 128)) padding-box,
      linear-gradient(
        45deg,
        #ff52e5,
        #f6d242
      ) border-box;
  }

  .right-panel {
    flex: 1;
    width: 40%;
    border: 3px solid transparent;
    border-radius: 8px;
    background:
      linear-gradient(rgb(253, 254, 206), rgb(128, 128, 128)) padding-box,
      linear-gradient(
        45deg,
        #ff52e5,
        #f6d242
      ) border-box;
  }
}
</style>
