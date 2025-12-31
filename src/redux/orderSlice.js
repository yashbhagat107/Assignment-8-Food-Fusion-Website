import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orderHistory: JSON.parse(localStorage.getItem('orders')) || [],
  },
  reducers: {
    placeOrder: (state, action) => {
      state.orderHistory.unshift(action.payload);
      localStorage.setItem('orders', JSON.stringify(state.orderHistory));
    },
  },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;