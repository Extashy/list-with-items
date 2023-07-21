<template>
  <div class="list">
    <div class="list-header">
      <input class="header-checkbox" type="checkbox" v-model="isAllItemsSelected" @change="selectAllItems" @click.stop />
      <span class="checkbox-dot" v-if="!isAllItemsSelected"></span>
      <span class="header-text" @click="toggleList">{{ listName }}</span>
    </div>
    <div v-if="isExpanded" class="list-items">
      <Item
        v-for="item in items"
        :key="item.id"
        :item="item"
        @itemSelected="onItemSelected"
        @itemDeleted="onItemDeleted"
      />
    </div>
  </div>
</template>

<script>
import Item from "./Item.vue";

export default {
  props: {
    listName: String,
    items: Array,
  },
  components: {
    Item,
  },
  data() {
    return {
      isExpanded: true,
    };
  },
  computed: {
    isAllItemsSelected() {
      return this.items.every((item) => item.isSelected);
    },
  },
  methods: {
    toggleList() {
      const targetElement = event.target;
      const isCheckboxOrDotClicked =
        (targetElement.tagName === "INPUT" && targetElement.type === "checkbox") ||
        targetElement.classList.contains("checkbox-dot");
      if (!isCheckboxOrDotClicked) {
        this.isExpanded = !this.isExpanded;
      }
    },
    selectAllItems() {
      const isSelected = this.isAllItemsSelected;
      this.items.forEach((item) => (item.isSelected = !isSelected));
    },
    onItemSelected(itemId) {
      const item = this.items.find((item) => item.id === itemId);
      if (item) {
        item.isSelected = !item.isSelected;
      }
    },
    onItemDeleted(itemId) {
      const itemIndex = this.items.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        this.items.splice(itemIndex, 1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  margin-bottom: 20px;

  .list-header {
    position: relative;
    font-size: 16px;
    font-weight: bold;
    font-family: sans-serif;
    display: flex;
    flex-direction: row;
    margin: 5px 0 0 5px;

    .header-text {
      margin-left: 5px;
      cursor: pointer;

      &:hover {
        background-color: #f0a34c;
      }
    }

    .header-checkbox {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      width: 16px;
      height: 16px;
      margin: 0;
      border: 2px solid #000;
      background-color: #fff;
      cursor: pointer;
      position: relative;
    }

    .header-checkbox::before {
      content: "";
      position: absolute;
      top: 2px;
      left: 2px;
      width: 8px;
      height: 8px;
      background-color: #000;
      opacity: 0;
    }

    .header-checkbox:checked::before {
      opacity: 1;
    }

    .checkbox-dot {
      position: absolute;
      pointer-events: none;
      top: 50%;
      left: 8px;
      transform: translate(-50%, -50%);
      width: 3px;
      height: 3px;
      border-radius: 0;
      background-color: #ff0000;
    }
  }

  .list-items {
    margin-top: 10px;
  }
}
</style>
