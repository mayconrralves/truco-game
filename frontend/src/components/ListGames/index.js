import React from "react";

import { ListGamesStyle } from "./styles";

export default function ListGames({ games, update, joinGame }) {
  const printListGame = () => {
    return games.map((game, i) => {
      return (
        <li key={"list_games " + i} id={game.room}>
          <p>
            <span className="name-game">{game.name}</span>
            <span className="name-user"> {game.user} </span>
            <button
              onClick={() => {
                joinGame(game.room);
              }}
            >
              Join
            </button>
          </p>
        </li>
      );
    });
  };
  return (
    <ListGamesStyle>
      {games.length ? (
        printListGame()
      ) : (
        <li>
          <p>Não há jogos.</p>{" "}
          <button onClick={update}>Atualize a lista</button>
        </li>
      )}
    </ListGamesStyle>
  );
}
