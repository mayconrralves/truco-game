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
         //created game
         connected.on('created_game', data=>{
            console.log('data.room')
            setUuid(data.room);
         });
         // created game of other user
          connected.on('room_uuid', data=>{
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
      });
   //events
    const values = { socket, uuid, games, connection };
    return <GameContext.Provider value={values}>{children}</GameContext.Provider>
}