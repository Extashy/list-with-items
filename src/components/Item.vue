<template>
  <div class="item">
    <input class="item-checkbox" type="checkbox" :checked="isSelected" @change="selectItem" />
    <input class="item-number" type="number" v-model="quantity" min="0" @change="updateQuantity" />
    <input class="item-color" type="color" v-model="color" @change="updateColor" />
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
        this.$emit("itemSelected", this.item.id, value);
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
      this.$emit("itemSelected", this.item.id, event.target.checked);
    },
    updateQuantity() {
      this.$emit("quantityChanged", this.item.id, this.item.quantity);
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

  .item-checkbox {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 12px;
    height: 12px;
    margin-left: 25px;
    border: 1px solid #000;
    background-color: #fff;
    cursor: pointer;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 4px;
      height: 4px;
      background-color: #000;
      opacity: 0;
    }

    &:checked::before {
      opacity: 1;
    }
  }

  .item-number {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    background-color: transparent;
    font-size: inherit;
    width: 40px;
    text-align: center;
    font-weight: bold;

    &:focus {
      outline: none;
    }
  }

  .item-color {
    width: 30px;
    height: 30px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
}
</style>
