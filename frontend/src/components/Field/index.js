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

  const verifyWinner = (game) => {
    if (game.matches >= 2) {
      if (game.scores.player1.match > game.scores.player2.match) {
        socket.emit("win_match", { game, winPlayer: "FIRST" });
      } else if (game.scores.player2.match > game.scores.player1.match) {
        socket.emit("win_match", { game, winPlayer: "SECOND" });
      }
    } else if (game.matches > 3) {
      if (game.scores.player1.match === game.scores.player2.match) {
        if (game.scores.player1.winFirst) {
          socket.emit("win_match", { game, winPlayer: "FIRST" });
        } else if (game.scores.player2.winFirst) {
          socket.emit("win_match", {
            game,
            winPlayer: "SECOND",
          });
        }
      }
    }
  };

  const updateScores = (player, uuid, c, hands) => {
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
      socket.emit("next_move_first_phase", { game });
    } else if (phase === "SECOND") {
      let winner = "FIRST";
      if (c.rank > currentCard.rank) {
        winner = "SECOND";
        if (secondPlayer) {
          game.scores.player2.match++;
        } else {
          game.scores.player1.match++;
        }
      } else if (c.rank < currentCard.rank) {
        winner = "FIRST";
        if (secondPlayer) {
          game.scores.player1.match++;
        } else {
          game.scores.player2.match++;
        }
      }

      game.matches++;
      socket.emit("next_move_second_phase", { game, winner });
      verifyWinner(game);
    }
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
      updateScores(player, uuid, c, hands);
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
