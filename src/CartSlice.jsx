
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addItem: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.id === product.id ||
          (!item.id && !product.id && item.name === product.name)
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
    },

    removeItem: (state, action) => {
      const productId =
        typeof action.payload === 'object'
          ? action.payload.id ?? action.payload.name
          : action.payload;

      state.items = state.items.filter(
        (item) => item.id !== productId && item.name !== productId
      );
    },

    updateQuantity: (state, action) => {
      const { id, name, quantity } = action.payload;

      const item = state.items.find(
        (product) =>
          (id !== undefined && product.id === id) ||
          (name !== undefined && product.name === name)
      );

      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter(
          (product) => product !== item
        );
      } else {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } =
  CartSlice.actions;

export default CartSlice.reducer;
