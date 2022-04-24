import React from "react";

import { ListGamesStyle } from "./styles";

export default function ListGames({ games, update, navigate}){
 
   
    const printListGame = () => {
        return games.map((game,i)=>{
            return (
                <li key={'list_games '+ i} id={game.room}>
                    <p>
                        <span onClick={()=>navigate(`/game/${game.room}`)} className='name-game'>{game.name}</span>
                        <span> por </span>
                        <span className='name-user'> {game.user} </span>
                    </p>
                </li>
            )
        })
    }
    return  (
        <ListGamesStyle>
            { games.length ? printListGame() : <li><p>Não há jogos.</p> <button onClick={update}>Atualize a lista</button></li> }
        </ListGamesStyle>
    )
}