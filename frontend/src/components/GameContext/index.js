import React, { useEffect, useState, useCallback } from "react";
import { connect } from "../../services/socket";

export const GameContext = React.createContext(null);


export default function Game({children}){
   const [socket, setSocket ] = useState(null);
   const [uuid, setUuid] = useState(null);
   const [connection, setConnection ] = useState(false);
   const [games, setGames ] = useState([]);
   const [playersJoin, setPlayersJoin ] = useState([]);
   const [ startGame, setStartGame ] = useState(false);
   const [endGame, setEndGame ] = useState(false);
   

   const startSocket = useCallback(()=>{
      //events
      if(!socket){
         const connected = connect();
         connected.on('connect',()=>{
            setConnection(true);
         });
         //created game
         connected.on('created_game', data=>{
            setUuid(data.room);
         });
         // created game of other user
          connected.on('room_uuid', data=>{
            setGames(games=>[...games, data.game]);
         });
         //added user on room
         connected.on('success_join', data=>{
            setPlayersJoin(playersJoin=> [...playersJoin, data]);
         });
         connected.on('joined',data=>{
            setPlayersJoin(playersJoin=> [...playersJoin, data ]);
         });
         //list of games created
         connected.on('list_games', data=>{
            setGames(data.games);
         });
         connected.on('start_game', (data )=>{
            setUuid(data.uuid);
            setStartGame(true);
            setEndGame(false);
         });
         //updated list of rooms when a user closed your session
         connected.on('removed_uuid',({uuid})=>{
            const draftGames = games.filter((game)=> game.uuid !== uuid);
            setGames(draftGames);
         });
            setSocket(connected);
         }
   },[ socket, games ]);
   useEffect(()=>{
      startSocket();   
   },[startSocket]);
    const values = { 
       socket, 
       uuid, 
       games, 
       connection, 
       playersJoin, 
       startGame, 
       setStartGame,
       endGame,
       setEndGame
    };
    return <GameContext.Provider value={values}>{children}</GameContext.Provider>
}