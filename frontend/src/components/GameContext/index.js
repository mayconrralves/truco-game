import React, { useEffect, useState, useCallback } from "react";
import { connect } from "../../services/socket";

export const GameContext = React.createContext(null);

export default function Game({ children }){
   const [socket, setSocket ] = useState(null);
   const [uuid, setUuid] = useState(null);
   const [connection, setConnection ] = useState(false);
   const [games, setGames ] = useState([]);
   const [playersJoin, setPlayersJoin ] = useState([]);
   const [startGame, setStartGame ] = useState(false);
   const [goOutGame, setGoOutGame ] = useState(false);
   const [otherGoOutPlayer, setOtherGoOutPlayer] = useState(false);
   const [userGoOut, setUserGoOut] = useState(null);   

   const startSocket = useCallback(()=>{
      const removeGame = (uuid)=>{
         const draftGames = games.filter((game)=> game.uuid !== uuid);
         setGames(draftGames);
      }
      //events
      if(!socket){
         const connected = connect();
         connected.on('connect',()=>{
            setConnection(true);
         });
         //game created 
         connected.on('created_game', data=>{
            setUuid(data.room);
         });
         //game created by user another user
         connected.on('room_uuid', game=>{
            
            setGames(games=>[...games, game]);
         });
         //the user added to the room
         connected.on('success_join', data=>{
            setPlayersJoin(playersJoin=> [...playersJoin, data]);
         });
         connected.on('joined',data=>{
            setPlayersJoin(playersJoin=> [...playersJoin, data ]);
         });
         //list of created games
         connected.on('list_games', data=>{
            setGames(data.games);
         });
         connected.on('start_game', data =>{
            setUuid(data.uuid);
            setStartGame(true);
            setGoOutGame(false);
            setOtherGoOutPlayer(false);
            setUserGoOut(null);
         });
         connected.on('go_out_player', data=>{
           setOtherGoOutPlayer(true);
           setStartGame(false);
           setUserGoOut(data.user);
           connected.emit('end_game', {uuid: data.uuid});
           setPlayersJoin([]);
           setUuid(null);
           removeGame(data.uuid);
         });
         connected.on('end_game', ()=>{
            setPlayersJoin([]);
            setUuid(null);
         });
         //updated list of rooms when a user closed your session
         connected.on('removed_uuid',(data)=>{
            removeGame('removed_uuid',data.uuid);
            setUuid(null);
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
       goOutGame,
       setGoOutGame,
       otherGoOutPlayer,
       setOtherGoOutPlayer,
       userGoOut,
    };
    return <GameContext.Provider value={values}>{children}</GameContext.Provider>
}