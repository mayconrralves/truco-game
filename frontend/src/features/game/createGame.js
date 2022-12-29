import { createSlice, current } from "@reduxjs/toolkit";

export const createGameSlice = createSlice({
  name: "createGame",
  initialState: {
    uuid: null,
  },
  reducers: {
    addUuid(state, action) {
      //console.log("addUiid state", current(state), action);
      return action.payload;
    },
    removeUuid(state) {
      return { uuid: null };
    },
  },
});

export const { addUuid, removeUuid } = createGameSlice.actions;
export default createGameSlice.reducer;
