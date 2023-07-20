<template>
  <div class="list">
    <div class="list-header" @click="toggleList">
      <input type="checkbox" v-model="isAllItemsSelected" @change="selectAllItems" @click.stop />
      {{ listName }}
    </div>
    <transition name="fade">
      <div v-if="isExpanded" class="list-items">
        <Item
          v-for="item in items"
          :key="item.id"
          :item="item"
          @itemSelected="onItemSelected"
          @itemDeleted="onItemDeleted"
        />
      </div>
    </transition>
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
      // Check if the click target is the checkbox. If it is, do not toggle the list.
      const targetElement = event.target;
      const isCheckboxClicked = targetElement.tagName === "INPUT" && targetElement.type === "checkbox";
      if (!isCheckboxClicked) {
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
}

.list-header {
  cursor: pointer;
}

.list-items {
  margin-top: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
