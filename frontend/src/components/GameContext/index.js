import React, { useEffect, useState, useCallback } from "react";
import { connect } from "../../services/socket";
import { connect as connectRedux } from "react-redux";
import { addUuid, removeUuid } from "../../features/game/createGame";
import { addCoin, removeCoin } from "../../features/coin/CoinSlice";

export const GameContext = React.createContext(null);

const INITIAL_STATE_GAME = {
  deck: null,
  game: 0,
  hands: {
    player1: null,
    player2: null,
  },
  matches: 0,
  truco: 1,
  scores: {
    player1: {
      points: 0,
      match: 0,
      winFirst: false,
    },
    player2: {
      points: 0,
      match: 0,
      winFirst: false,
    },
  },
  field: null,
  uuid: null,
};

export function Game({ children, addUuid, removeUuid, addCoin, removeCoin }) {
  const [socket, setSocket] = useState(null);
  const [connection, setConnection] = useState(false);
  const [games, setGames] = useState([]);
  const [playersJoin, setPlayersJoin] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [goOutGame, setGoOutGame] = useState(false);
  const [otherGoOutPlayer, setOtherGoOutPlayer] = useState(false);
  const [userGoOut, setUserGoOut] = useState(null);
  const [updateList, setUpdateList] = useState(false);
  const [myGame, setMyGame] = useState(null);
  const [firstPlayer, setFirstPlayer] = useState(false);
  const [secondPlayer, setSecondPlayer] = useState(false);
  const [shuffed, setShuffled] = useState(false);
  const [stateGame, setStateGame] = useState(null);
  const [currentMove, setCurrentMove] = useState(null);
  const [startMatch, setStartMatch] = useState(false);
  const [winMatch, setWinMatch] = useState(false);
  const [loseMatch, setLoseMatch] = useState(false);
  const [winGame, setWinGame] = useState(false);
  const [loseGame, setLoseGame] = useState(false);
  const [phase, setPhase] = useState("FIRST");

  const startSocket = useCallback(() => {
    //events
    if (!socket) {
      const connected = connect();
      connected.on("connect", () => {
        setConnection(true);
      });
      //game created
      connected.on("created_game", (data) => {
        setMyGame(data.game);
        removeCoin();
        setShuffled(false);
        setStateGame(null);
        setCurrentMove(false);
        addUuid({ uuid: data.room });
      });
      //game created by user another user
      connected.on("room_uuid", (game) => {
        setGames((games) => [...games, game]);
      });
      //the user added to the room
      connected.on("success_join", (data) => {
        setPlayersJoin((playersJoin) => [...playersJoin, data]);
        removeCoin();
      });
      connected.on("joined", (data) => {
        setPlayersJoin((playersJoin) => [...playersJoin, data]);
      });
      connected.on("full_game", (data) => {
        setUpdateList(true);
      });
      //list of created games
      connected.on("list_games", (data) => {
        setGames(data.games);
        setUpdateList(false);
      });
      connected.on("start_game", (data) => {
        addUuid({ uuid: data.uuid });
        setStartGame(true);
        setGoOutGame(false);
        setOtherGoOutPlayer(false);
        setUserGoOut(null);
        setUpdateList(false);
        setFirstPlayer(false);
        setSecondPlayer(false);
        setWinGame(false);
        setLoseGame(false);
        setStartMatch(false);
        setStateGame(INITIAL_STATE_GAME);
      });
      connected.on("opponent_coin", (data) => {
        addCoin({ coin: data.coin });
      });
      connected.on("second_player", () => {
        removeCoin();
        setSecondPlayer(true);
      });
      connected.on("winner_coin", () => {
        removeCoin();
        setFirstPlayer(true);
        setCurrentMove(true);
        setPhase("FIRST");
      });
      connected.on("go_out_player", (data) => {
        setOtherGoOutPlayer(true);
        setStartGame(false);
        setUserGoOut(data.user);
        connected.emit("end_game", { uuid: data.uuid });
        setPlayersJoin([]);
        setUpdateList(true);
        removeUuid();
        removeCoin();
      });
      connected.on("end_game", () => {
        setPlayersJoin([]);
        removeUuid();
        setUpdateList(true);
        setStartGame(false);
        setMyGame(null);
        removeCoin();
        setShuffled(false);
        setStateGame(null);
      });
      connected.on("win_game", () => {
        setWinGame(true);
      });
      connected.on("lose_game", () => {
        setLoseGame(true);
      });
      //updated list of rooms when a user closed your session
      connected.on("removed_uuid", () => {
        setStartGame(false);
        setMyGame(null);
        setUpdateList(true);
        removeCoin();
        setShuffled(false);
        setStateGame(null);
        setCurrentMove(false);
      });
      connected.on("game_cancelled", () => {
        setUpdateList(true);
        removeCoin();
        setShuffled(false);
        setStateGame(null);
      });
      connected.on("success_cancelled", () => {
        removeUuid();
        setMyGame(null);
        setUpdateList(true);
        removeCoin();
        setShuffled(false);
        setStateGame(null);
        setCurrentMove(false);
      });
      connected.on("start_match", () => {
        setWinMatch(false);
        setLoseMatch(false);
        setStartMatch(true);
      });

      connected.on("shuffled_deck", (data) => {
        setStateGame(data);
        setShuffled(true);
      });
      connected.on("draw_player1", (data) => {
        const draftDeck = data.deck;
        const hand = draftDeck.splice(0, 3);
        const state = {
          ...data,
          deck: draftDeck,
          uuid: data.uuid,
          hands: {
            ...data.hands,
            player1: hand,
          },
          field: null,
        };
        setStateGame(state);
        connected.emit("drew_player1", {
          ...state,
        });
      });
      connected.on("draw_player2", (data) => {
        const draftDeck = data.deck;
        const hand = draftDeck.splice(0, 3);
        const state = {
          ...data,
          deck: draftDeck,
          uuid: data.uuid,
          hands: {
            ...data.hands,
            player2: hand,
          },
          field: null,
        };
        setStateGame(state);
        connected.emit("drew_player2", {
          ...state,
        });
      });
      connected.on("end_draw", (data) => {
        setStateGame(data);
      });
      connected.on("first_phase", () => {
        setPhase("FIRST");
      });
      connected.on("second_phase", () => {
        setPhase("SECOND");
      });
      connected.on("active_player", () => {
        setCurrentMove(true);
      });
      connected.on("inactive_player", () => {
        setCurrentMove(false);
      });
      connected.on("update_move", (data) => {
        setStateGame(data.game);
      });
      connected.on("win_match", (data) => {
        const { winPlayer, game } = data;
        const { player1, player2 } = game.scores;
        if (winPlayer === "FIRST") {
          player1.match = 0;
          player1.winFirst = false;
          player1.points = player1.points + 2 * game.truco;
          player2.match = 0;
          player2.winFirst = false;
        } else if (winPlayer === "SECOND") {
          player1.match = 0;
          player1.winFirst = false;
          player2.match = 0;
          player2.winFirst = false;
          player2.points = player2.points + 2 * game.truco;
        }
        setStateGame({
          ...game,
          scores: {
            ...game.scores,
            player1,
            player2,
          },
        });
        setWinMatch(true);
        connected.emit("lose_match", { game });
      });
      connected.on("lose_match", (data) => {
        const { game } = data;
        setLoseMatch(true);
        setStateGame(game);
      });
      connected.on("error", (data) => {
        console.log("error", data.msg, data.event);
      });
      setSocket(connected);
    }
  }, [socket]);
  useEffect(() => {
    startSocket();
  }, [startSocket]);
  const values = {
    socket,
    games,
    connection,
    playersJoin,
    startGame,
    goOutGame,
    otherGoOutPlayer,
    userGoOut,
    updateList,
    myGame,
    firstPlayer,
    secondPlayer,
    shuffed,
    stateGame,
    currentMove,
    winGame,
    winMatch,
    loseGame,
    loseMatch,
    startMatch,
    phase,
    setStartGame,
    setStartMatch,
    setGoOutGame,
    setOtherGoOutPlayer,
  };
  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
}

const actionCreators = {
  addUuid,
  removeUuid,
  addCoin,
  removeCoin,
};

const connectedGameWithRedux = connectRedux(null, actionCreators)(Game);

export default connectedGameWithRedux;
