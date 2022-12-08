import React, { useEffect } from "react";
import Card from "../Card";
import { StyleField } from "./styles";

export default function Field({
  firstPlayer,
  secondPlayer,
  stateGame,
  currentMove,
  updateHand,
  currentCard,
  setCurrentCard,
  updateScores,
}) {
  useEffect(() => {
    if (stateGame?.field) {
      setCurrentCard(stateGame.field);
    }
  }, [stateGame, setCurrentCard]);

  const handleDrop = (event) => {
    const data = event.dataTransfer.getData("text/plain");
    let player = null;
    const { hands } = stateGame;
    try {
      const c = JSON.parse(data);
      setCurrentCard(c);
      if (firstPlayer) {
        player = updateHand(hands.player1, c);
      } else if (secondPlayer) {
        player = updateHand(hands.player2, c);
      }
      updateScores(player, c, hands);
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
