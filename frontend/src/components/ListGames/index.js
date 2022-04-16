import React from "react";
import { ListGamesStyle } from "./styles";

export default function ListGames({ games, update}){
    
   
    const printListGame = () => {
        return games.map((game,i)=>{
            return (
                <li key={'list_games '+ i} id={game.room}>
                    {game.room} por {game.name}
                </li>
            )
        })
    }
    return  (
        <ListGamesStyle>
            { games.length ? printListGame() : <li>Não há jogos. <button onClick={update}>Atualize a lista</button></li> }
        </ListGamesStyle>
    )
}