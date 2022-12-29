import { createSlice, current } from "@reduxjs/toolkit";

/*
      name: nameRoom,
      user: user.name,
      userId: user.id,
*/
const initialState = {
  uuid: null,
  game: {
    name: null,
    user: null,
    userId: null,
  },
};
export const createGameSlice = createSlice({
  name: "createGame",
  initialState,
  reducers: {
    addUuid(state, action) {
      //console.log("addUiid state", current(state), action);
      state.uuid = action.payload.uuid;
    },
    removeUuid(state) {
      state.uuid = null;
    },
    resetState(state) {
      return initialState;
    },
  },
});

export const { addUuid, removeUuid } = createGameSlice.actions;
export default createGameSlice.reducer;
