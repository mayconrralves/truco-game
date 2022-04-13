import React, { useEffect, useState } from "react";
import { connect } from "../../services/socket";

export const GameContext = React.createContext(null);


export default function Game({children}){
   const [socket, setSocket ] = useState(null);
   const [uuid, setUuid] = useState(null);
   const [connection, setConnection ] = useState(false);
   const [games, setGames ] = useState([]);
    useEffect(()=>{
       if(!socket){
         const connected = connect();
         connected.on('connect',()=>{
            setConnection(true);
         });
         // create game
         connected.on('room_uuid', data=>{
            setUuid(data.game.room);
            setGames(games=>[...games, data.game]);
         });
         //list of games created
         connected.on('list_games', data=>{
            setGames(data.games);
         });
         connected.on('removed_uuid',({uuid})=>{
            const draftGames = games.filter((game)=> game.uuid !== uuid);
            setGames(draftGames);
         });
            setSocket(connected);
      }
      
   },[socket]);
   //events
    const values = { socket, uuid, games, connection };
    return <GameContext.Provider value={values}>{children}</GameContext.Provider>
}