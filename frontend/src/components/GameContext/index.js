import React, { useEffect, useState } from "react";
import { connect } from "../../services/socket";

export const GameContext = React.createContext(null);


export default function Game({children}){
   const [socket, setSocket ] = useState(null);
   const [uuid, setUuid] = useState(null);
   const [games, setGames ] = useState([]);

    useEffect(()=>{
       if(!socket){
         const connected = connect();
         setSocket(connected);
      }

      else{
         // create game
         socket.on('room_uuid', data=>{
            setUuid(data.game.room);
            setGames(games=>[...games, data.game]);
         });
         //list of games created
         socket.on('list_games', data=>{
            setGames(data.games);
         });
         socket.on('removed_uuid',({uuid})=>{
            const draftGames = games.filter((game)=> game.uuid !== uuid);
            setGames(draftGames);
            
         });
       }
   },[socket]);
   //events
    const values = {socket, uuid, games};
    return <GameContext.Provider value={values}>{children}</GameContext.Provider>
}