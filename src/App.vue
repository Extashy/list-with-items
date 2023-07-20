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
          listName: "List 1",
          items: [
            { id: 1, quantity: 3, color: "#ff0000", isSelected: false },
            { id: 2, quantity: 2, color: "#00ff00", isSelected: false },
            { id: 3, quantity: 1, color: "#0000ff", isSelected: false },
            // Добавьте другие элементы по умолчанию для List 1
          ],
        },
        {
          id: 2,
          listName: "List 2",
          items: [
            { id: 4, quantity: 5, color: "#ffff00", isSelected: false },
            { id: 5, quantity: 2, color: "#ff00ff", isSelected: false },
            // Добавьте другие элементы по умолчанию для List 2
          ],
        },
        // Добавьте другие списки по умолчанию
      ],
      selectedItems: [], // Array to hold selected items
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
      this.selectedItems = selectedItems; // Update the selectedItems data property
    },
  },
};
</script>

<style lang="scss">
.app {
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-panel {
  flex: 1;
  margin-right: 20px;
}

.right-panel {
  flex: 1;
}
</style>
