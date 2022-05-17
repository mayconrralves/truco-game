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
      //events
      if(!socket){
         const connected = connect();
         connected.on('connect',()=>{
            console.log('connect')
            setConnection(true);
         });
         //game created 
         connected.on('created_game', data=>{
            setUuid(data.room);
            setUpdateList(false);
            console.log('created_game', data)
         });
         //game created by user another user
         connected.on('room_uuid', game=>{
            console.log('room_uuid', game);
            setGames(games=>[...games, game]);
         });
         //the user added to the room
         connected.on('success_join', data=>{
            console.log('success_join',data)
            setPlayersJoin(playersJoin=> [...playersJoin, data]);
         });
         connected.on('joined',data=>{
            console.log('joined')
            setPlayersJoin(playersJoin=> [...playersJoin, data ]);
            setUuid(data.room);
           
         });
         connected.on('full_game', data=>{
            console.log('full_game')
           setUpdateList(true);
         });
         //list of created games
         connected.on('list_games', data=>{
            console.log('list_game');
            setGames(data.games);
            setUpdateList(false);
         });
         connected.on('start_game', data =>{
            console.log('start_game', data)
            setUuid(data.uuid);
            setStartGame(true);
            setGoOutGame(false);
            setOtherGoOutPlayer(false);
            setUserGoOut(null);
            setUpdateList(false);

         });
         connected.on('go_out_player', data=>{
            console.log('go_out_player')
           setOtherGoOutPlayer(true);
           setStartGame(false);
           setUserGoOut(data.user);
           connected.emit('end_game', {uuid: data.uuid});
           console.log('end_game', data.uuid)
           setPlayersJoin([]);
           setUpdateList(true);
          // setUuid(null);
         });
         connected.on('full_game', data=>{
            console.log('full_game');
            setUpdateList(true);
         });
         connected.on('end_game', ()=>{
            console.log('end_game');
            setPlayersJoin([]);
            setUuid(null);
            setUpdateList(true);
         });
         //updated list of rooms when a user closed your session
         connected.on('removed_uuid',()=>{
            console.log('removed_uuid');
            setUpdateList(true);
            setUuid(null);
         });
         connected.on('error', (data)=>{
            console.log('error', data.msg, data.event);
         })
         setSocket(connected);
         }
   },[ socket ]);
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