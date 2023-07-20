<template>
  <div class="item">
    <input type="checkbox" :checked="isSelected" @change="selectItem" />
    <input type="number" v-model="quantity" min="0" @change="updateQuantity" />
    <input type="color" v-model="color" @change="updateColor" />
    <div class="color-square" :style="{ backgroundColor: color }"></div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  computed: {
    isSelected: {
      get() {
        return this.item.isSelected;
      },
      set(value) {
        this.$emit("itemSelected", this.item.id, value); // Emit the isSelected value as well
      },
    },
    quantity: {
      get() {
        return this.item.quantity;
      },
      set(value) {
        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue)) {
          this.item.quantity = Math.max(parsedValue, 0);
        }
      },
    },
    color: {
      get() {
        return this.item.color;
      },
      set(value) {
        this.item.color = value;
      },
    },
  },
  methods: {
    selectItem(event) {
      // Use event.target.checked to get the checkbox status
      this.$emit("itemSelected", this.item.id, event.target.checked);
    },
    updateQuantity() {
      this.$emit("quantityChanged", this.item.id);
    },
    updateColor() {
      this.$emit("colorChanged", this.item.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.color-square {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}
</style>
