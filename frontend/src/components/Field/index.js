import React, { useState, useEffect, useContext } from "react";
import Card from "../Card";
import { SendMessagetoServerContext } from "../SendMessagetoServerContext";
import { StyleField } from "./styles";

export default function Field({
  firstPlayer,
  secondPlayer,
  stateGame,
  currentMove,
  updateHand,
  phase,
}) {
  const [currentCard, setCurrentCard] = useState(null);
  const {
    sendWinMatch,
    sendTieMatch,
    sendNextMoveFirstPhase,
    sendNextMoveSecondPhase,
  } = useContext(SendMessagetoServerContext);
  useEffect(() => {
    if (stateGame?.field) {
      setCurrentCard(stateGame.field);
    }
  }, [stateGame]);

  const checkWinner = (game) => {
    if (game.matches >= 2) {
      if (game.scores.player1.match > game.scores.player2.match) {
        sendWinMatch({ game, winPlayer: "FIRST" });
      } else if (game.scores.player2.match > game.scores.player1.match) {
        sendWinMatch({ game, winPlayer: "SECOND" });
      } else if (
        game.matches === 3 &&
        game.scores.player1.match === game.scores.player2.match
      ) {
        sendTieMatch({ game, firstPlayer, secondPlayer });
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
      sendNextMoveFirstPhase({ game });
    } else if (phase === "SECOND") {
      let winner = "FIRST";
      if (c.rank > currentCard.rank) {
        winner = "SECOND";
        if (secondPlayer) {
          game.scores.player2.winFirst = game.matches === 0 ? true : false;
          game.scores.player2.match++;
        } else {
          game.scores.player1.winFirst = game.matches === 0 ? true : false;
          game.scores.player1.match++;
        }
      } else if (c.rank < currentCard.rank) {
        if (secondPlayer) {
          game.scores.player1.winFirst = game.matches === 0 ? true : false;
          game.scores.player1.match++;
        } else {
          game.scores.player2.winFirst = game.matches === 0 ? true : false;
          game.scores.player2.match++;
        }
      }
      game.matches++;
      sendNextMoveSecondPhase({ game, winner });
      checkWinner(game);
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
