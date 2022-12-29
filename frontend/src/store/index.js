import { configureStore } from "@reduxjs/toolkit";
import createGameReducer from "../features/game/createGame";
import coinGameReducer from "../features/coin/CoinSlice";

console.log(coinGameReducer);
const store = configureStore({
  reducer: {
    createGame: createGameReducer,
    coinGame: coinGameReducer,
  },
});

export { store };
