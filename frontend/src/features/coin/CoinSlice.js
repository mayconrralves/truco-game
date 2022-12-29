import { createSlice } from "@reduxjs/toolkit";

export const coinSlice = createSlice({
  name: "coin",
  initialState: {
    coin: null,
  },
  reducers: {
    addCoin(state, action) {
      return action.payload;
    },
    removeCoin(state) {
      return { coin: null };
    },
  },
});

export const { addCoin, removeCoin } = coinSlice.actions;

export default coinSlice.reducer;
