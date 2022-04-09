import React, { useEffect } from "react";

export default function ListGames({ games}){
    

    const printListGame = () => {
        return games.map((game,i)=>{
            return (
                <li key={'list_games '+ i}>
                        <span>Name: </span><span>{game.name}</span>
                        <span>Game: </span><span>{game.room}</span>
                </li>
            )
        })
    }
    return  (
        <ul>
            { games.length ? printListGame() : <>Não há jogos</> }
        </ul>
    )
}