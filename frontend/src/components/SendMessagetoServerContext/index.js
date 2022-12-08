import React from "react";
import { useContext } from "react";
import { GameContext } from "../GameContext";

export const SendMessagetoServerContext = React.createContext(null);
export default function SendMessagetoServer({ children }) {
  const { socket } = useContext(GameContext);

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

  return (
    <SendMessagetoServerContext.Provider
      value={{
        sendTieMatch,
        sendWinMatch,
        sendNextMoveFirstPhase,
        sendNextMoveSecondPhase,
      }}
    >
      {children}
    </SendMessagetoServerContext.Provider>
  );
}
