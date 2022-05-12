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
   const [updateList, setUpdateList] = useState(false);   

   const startSocket = useCallback(()=>{
      const removeGame = (uuid)=>{
         if(games.length === 0) return;
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
            setUpdateList(false);
         });
         //game created by user another user
         connected.on('room_uuid', game=>{
            setGames(games=>[...games, game]);
         });
         //the user added to the room
         connected.on('success_join', data=>{
            console.log('success')
            setPlayersJoin(playersJoin=> [...playersJoin, data]);
         });
         connected.on('joined',data=>{
            setPlayersJoin(playersJoin=> [...playersJoin, data ]);
            setUpdateList(false);
            if(uuid){
               connected.emit('remove_room', { room: uuid });
               setUuid([]);
            }
            setGames([]);
         });
         connected.on('full_game', data=>{
           removeGame(data.room);
           console.log('full_game');
           setUpdateList(true);
         });
         //list of created games
         connected.on('list_games', data=>{
            setGames(data.games);
         });
         connected.on('start_game', data =>{
            setUuid(data.room);
            setStartGame(true);
            setGoOutGame(false);
            setOtherGoOutPlayer(false);
            setUserGoOut(null);
            removeGame(data.room);
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
            setUpdateList(true);
         });
         //updated list of rooms when a user closed your session
         connected.on('removed_uuid',(data)=>{
            removeGame(data.uuid);
            setUuid(null);
            setUpdateList(true);
         });
         setSocket(connected);
         }
   },[ socket, games, uuid ]);
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
       updateList,
    };
    return <GameContext.Provider value={values}>{children}</GameContext.Provider>
}