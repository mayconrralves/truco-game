import React, { useState, useEffect } from "react";
import Card from "../Card";
import { StyleField } from "./styles";

export default function Field({
  socket,
  firstPlayer,
  secondPlayer,
  stateGame,
  currentMove,
  updateHand,
  phase,
}) {
  const [currentCard, setCurrentCard] = useState(null);

  useEffect(() => {
    if (stateGame?.field) {
      setCurrentCard(stateGame.field);
    }
  }, [stateGame]);
  const winFirst = (player1, opponent) => {
    if (player1.match === 0 && opponent.match === 0) {
      return true;
    }
    return false;
  };

  const handleDrop = (event) => {
    const data = event.dataTransfer.getData("text/plain");
    let player = null;
    const { hands, uuid } = stateGame;
    try {
      const c = JSON.parse(data);
      setCurrentCard(c);
      if (firstPlayer) {
        player = updateHand(hands.player1, c);
      } else if (secondPlayer) {
        player = updateHand(hands.player2, c);
      }
      const game = {
        ...stateGame,
        uuid,
        field: c,
        hands: {
          player1: firstPlayer ? player : hands.player1,
          player2: secondPlayer ? player : hands.player2,
        },
      };
      if (phase === "FIRST") {
        socket.emit("next_move_first", { game });
      } else if (phase === "SECOND") {
        let winner = "FIRST";
        if (c.rank > currentCard.rank) {
          if (winFirst(game.scores.player1, game.scores.player2)) {
            game.scores = {
              ...game.scores,
              player2: { winFirst: true, match: 1 },
            };
          } else {
            game.scores.match++;
          }
          winner = "SECOND";
        } else if (c.rank < currentCard.rank) {
          if (winFirst(game.scores.player1, game.scores.player2)) {
            game.scores = {
              ...game.scores,
              player1: { winFirst: true, match: 1 },
            };
          } else {
            game.scores.match++;
          }
        } else {
          winner = "SECOND";
        }
        socket.emit("next_move_second", { game, winner });
      }
    } catch (e) {
      console.error(e);
    }
  };
  const onDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  if (currentMove) {
    return (
      <StyleField onDragOver={onDragOver} onDrop={handleDrop}>
        {currentCard && <Card card={currentCard} />}
      </StyleField>
    );
  }
  return <StyleField>{currentCard && <Card card={currentCard} />}</StyleField>;
}
