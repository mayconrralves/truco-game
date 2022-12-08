import React from "react";
import { useContext } from "react";
import { GameContext } from "../GameContext";

export const SendMessagetoServerContext = React.createContext(null);
export default function SendMessagetoServer({ children }) {
  const { socket } = useContext(GameContext);

  const sendWhatWinnerCoin = ({ coin, uuid }) => {
    socket.emit("what_winner_coin", { coin, uuid });
  };
  const sendWinMatch = ({ game, winPlayer }) => {
    socket.emit("win_match", { game, winPlayer });
  };
  const sendTieMatch = ({ game, firstPlayer, secondPlayer }) => {
    socket.emit("tie_match", { game, firstPlayer, secondPlayer });
  };
  const sendNextMoveFirstPhase = ({ game }) => {
    socket.emit("next_move_first_phase", { game });
  };
  const sendNextMoveSecondPhase = ({ game, winner }) => {
    socket.emit("next_move_second_phase", { game, winner });
  };
  const sendGoOutPlayer = ({ uuid, user }) => {
    socket.emit("go_out_player", { uuid, user });
  };
  const sendStartMatch = ({ uuid }) => {
    socket.emit("start_match", { uuid });
  };
  const sendShuffledDeck = ({ game, deck, uuid }) => {
    socket.emit("shuffled_deck", { game, deck, uuid });
  };
  const sendChooseCoin = ({ coin, uuid }) => {
    socket.emit("choose_coin", { coin, uuid });
  };

  return (
    <SendMessagetoServerContext.Provider
      value={{
        sendWhatWinnerCoin,
        sendTieMatch,
        sendWinMatch,
        sendNextMoveFirstPhase,
        sendNextMoveSecondPhase,
        sendGoOutPlayer,
        sendStartMatch,
        sendShuffledDeck,
        sendChooseCoin,
      }}
    >
      {children}
    </SendMessagetoServerContext.Provider>
  );
}
