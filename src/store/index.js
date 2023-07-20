import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: [
      {
        id: 1,
        listName: "List 1",
        isExpanded: true,
        items: [
          { id: 1, quantity: 3, color: "#ff0000", isSelected: false },
          { id: 2, quantity: 2, color: "#00ff00", isSelected: false },
          { id: 3, quantity: 1, color: "#0000ff", isSelected: false },
          // Add other default items for List 1
        ],
      },
      {
        id: 2,
        listName: "List 2",
        isExpanded: true,
        items: [
          { id: 4, quantity: 5, color: "#ffff00", isSelected: false },
          { id: 5, quantity: 2, color: "#ff00ff", isSelected: false },
          // Add other default items for List 2
        ],
      },
      // Add other default lists
    ],
    isShuffled: false,
    shuffledItems: [],
  },
  mutations: {
    toggleList(state, listId) {
      const list = state.lists.find((list) => list.id === listId);
      if (list) {
        list.isExpanded = !list.isExpanded;
      }
    },
    toggleItem(state, { listId, itemId }) {
      const list = state.lists.find((list) => list.id === listId);
      if (list) {
        const item = list.items.find((item) => item.id === itemId);
        if (item) {
          item.isSelected = !item.isSelected;
        }
      }
    },
    updateItemQuantity(state, { listId, itemId, quantity }) {
      const list = state.lists.find((list) => list.id === listId);
      if (list) {
        const item = list.items.find((item) => item.id === itemId);
        if (item) {
          item.quantity = quantity;
        }
      }
    },
    updateItemColor(state, { listId, itemId, color }) {
      const list = state.lists.find((list) => list.id === listId);
      if (list) {
        const item = list.items.find((item) => item.id === itemId);
        if (item) {
          item.color = color;
        }
      }
    },
    deleteItem(state, { listId, itemId }) {
      const list = state.lists.find((list) => list.id === listId);
      if (list) {
        const itemIndex = list.items.findIndex((item) => item.id === itemId);
        if (itemIndex !== -1) {
          list.items.splice(itemIndex, 1);
        }
      }
    },
    shuffleSquares(state) {
      const allSelectedItems = state.lists.flatMap((listItems) => listItems.items.filter((item) => item.isSelected));
      state.shuffledItems = allSelectedItems.slice().sort(() => Math.random() - 0.5);
      state.isShuffled = true;
    },
    resetSquares(state) {
      state.shuffledItems = [];
      state.isShuffled = false;
    },
  },
  actions: {
    toggleList({ commit }, listId) {
      commit("toggleList", listId);
    },
    toggleItem({ commit }, { listId, itemId }) {
      commit("toggleItem", { listId, itemId });
    },
    updateItemQuantity({ commit }, { listId, itemId, quantity }) {
      commit("updateItemQuantity", { listId, itemId, quantity });
    },
    updateItemColor({ commit }, { listId, itemId, color }) {
      commit("updateItemColor", { listId, itemId, color });
    },
    deleteItem({ commit }, { listId, itemId }) {
      commit("deleteItem", { listId, itemId });
    },
    shuffleSquares({ commit }) {
      commit("shuffleSquares");
    },
    resetSquares({ commit }) {
      commit("resetSquares");
    },
  },
});
