import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const exists = state.find((item) => item._id === action.payload._id);
      if (!exists) {
        state.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item._id !== action.payload);
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
