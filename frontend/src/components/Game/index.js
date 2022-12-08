import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GameContext } from "../GameContext";
import { AuthContext } from "../AuthContext";

import Hand from "../Hand";
import Field from "../Field";
import { buildDeck } from "../../utils";
import { StyleGame } from "./styles";
import ConfigModalGame from "../ConfigModalGame";
import { SendMessagetoServerContext } from "../SendMessagetoServerContext";

export default function Game() {
  const {
    uuid,
    setStartGame,
    setGoOutGame,
    socket,
    coin: coinOpponent,
    secondPlayer,
    firstPlayer,
    stateGame,
    currentMove,
    phase,
  } = useContext(GameContext);

  const {
    sendWinMatch,
    sendTieMatch,
    sendNextMoveFirstPhase,
    sendNextMoveSecondPhase,
  } = useContext(SendMessagetoServerContext);

  const { user } = useContext(AuthContext);
  const [coin, setCoin] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [openModalPlayer, setOpenModalPlayer] = useState(true);
  const history = useHistory();
  useEffect(() => {
    if (coinOpponent) {
      setCoin(coinOpponent);
      socket.emit("what_winner_coin", {
        coin: coinOpponent,
        uuid,
      });
    }
  }, [coinOpponent, uuid, socket]);

  useEffect(() => {
    const listen = (location, action) => {
      if (action === "POP") {
        setGoOutGame(true);
      }
    };
    const clearListen = history.listen(listen);
    return clearListen;
  }, [history, setGoOutGame]);

  const goOutGameButton = () => {
    setStartGame(false);
    socket.emit("go_out_player", {
      uuid,
      user: user.name,
    });
    history.goBack();
  };
  const startMatch = () => {
    socket.emit("start_match", { uuid });
  };
  const startGame = () => {
    setOpenModalPlayer(false);
    const deck = buildDeck();
    socket.emit("shuffled_deck", {
      game: stateGame,
      deck,
      uuid,
    });
    startMatch();
  };
  //if a player leaves of game
  const returnConfigGame = () => {
    history.goBack();
  };
  const selectCoin = (coin) => {
    setCoin(coin);
    socket.emit("choose_coin", {
      coin,
      uuid,
    });
  };
  const handPlayer = () => {
    if (firstPlayer) {
      return stateGame.hands.player1;
    } else {
      return stateGame.hands.player2;
    }
  };
  const lengthHandOpponent = () => {
    if (secondPlayer) {
      return stateGame.hands.player1?.length || 0;
    } else {
      return stateGame.hands.player2?.length || 0;
    }
  };
  const updateHand = (playerHand, currentCard) => {
    const hand = playerHand.filter(
      (card) =>
        !(
          card.number === currentCard.number && card.naipe === currentCard.naipe
        )
    );
    return hand;
  };
  const checkTie = (game) => {
    if (
      game.matches === 3 &&
      game.scores.player1.match === game.scores.player2.match
    ) {
      sendTieMatch({ game, firstPlayer, secondPlayer });
    }
  };

  const checkWinner = (game) => {
    if (game.matches >= 2) {
      if (game.scores.player1.match > game.scores.player2.match) {
        sendWinMatch({ game, winPlayer: "FIRST" });
      } else if (game.scores.player2.match > game.scores.player1.match) {
        sendWinMatch({ game, winPlayer: "SECOND" });
      } else {
        checkTie(game);
      }
    }
  };

  const invertPlayerHands = ({ player, c, hands }) => {
    const game = {
      ...stateGame,
      field: c,
      hands: {
        player1: firstPlayer ? player : hands.player1,
        player2: secondPlayer ? player : hands.player2,
      },
    };
    return game;
  };

  const updateScores = (player, c, hands) => {
    const game = invertPlayerHands({ player, c, hands });

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

  return (
    <StyleGame>
      <ConfigModalGame
        coin={coin}
        selectCoin={selectCoin}
        openModalPlayer={openModalPlayer}
        returnConfigGame={returnConfigGame}
        goOutGameButton={goOutGameButton}
        start={startGame}
        setGoOutGame={setGoOutGame}
        firstPlayer={firstPlayer}
        secondPlayer={secondPlayer}
        setCoin={setCoin}
        setOpenModalPlayer={setOpenModalPlayer}
      />
      {(stateGame?.hands.player1 || stateGame?.hands.player2) && (
        <>
          <Hand
            opponent
            quantityCardsOpponentHand={lengthHandOpponent()}
            currentMove={currentMove}
          />
          <Field
            socket={socket}
            firstPlayer={firstPlayer}
            secondPlayer={secondPlayer}
            currentMove={currentMove}
            stateGame={stateGame}
            updateHand={updateHand}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
            updateScores={updateScores}
          />
          <Hand cards={handPlayer()} currentMove={currentMove} />
        </>
      )}
    </StyleGame>
  );
}
