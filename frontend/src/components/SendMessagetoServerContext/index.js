import React from "react";
import { useContext } from "react";
import { GameContext } from "../GameContext";

export const SendMessagetoServerContext = React.createContext(null);
export default function SendMessagetoServer({ children }) {
  const { socket } = useContext(GameContext);

  const winMatch = ({ game, winPlayer }) => {
    console.log("socket", game, winPlayer);
    socket.emit("win_match", { game, winPlayer });
  };

  return (
    <SendMessagetoServerContext.Provider value={{ winMatch }}>
      {children}
    </SendMessagetoServerContext.Provider>
  );
}
