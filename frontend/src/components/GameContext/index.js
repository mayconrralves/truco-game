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
   const [myGame, setMyGame] = useState(null);
   const [coin, setCoin ] = useState(null);
   const [firstPlayer, setFirstPlayer ] = useState(false);
   const [secondPlayer, setSecondPlayer ] = useState(false);
   const [ shuffed, setShuffled ] = useState(false);
   const [stateGame, setStateGame ] = useState(null);


   const startSocket = useCallback(()=>{
      //events
      if(!socket){
         const connected = connect();
         connected.on('connect',()=>{
            setConnection(true);
         });
         //game created 
         connected.on('created_game', data=>{
            setUuid(data.room);
            setMyGame(data.game);
            setCoin(null);
            setShuffled(false);
            setStateGame(null);
         });
         //game created by user another user
         connected.on('room_uuid', game=>{
            setGames(games=>[...games, game]);
         });
         //the user added to the room
         connected.on('success_join', data=>{
            setPlayersJoin(playersJoin=> [...playersJoin, data]);
            setCoin(null);
         });
         connected.on('joined',data=>{
            setPlayersJoin(playersJoin=> [...playersJoin, data ]);
            //setUuid(data.room);
         });
         connected.on('full_game', data=>{
            setUpdateList(true);
         });
         //list of created games
         connected.on('list_games', data=>{
            setGames(data.games);
            setUpdateList(false);
         });
         connected.on('start_game', data =>{
            setUuid(data.uuid);
            setStartGame(true);
            setGoOutGame(false);
            setOtherGoOutPlayer(false);
            setUserGoOut(null);
            setUpdateList(false);
            setFirstPlayer(false);
            setSecondPlayer(false);
         });
         connected.on('opponent_coin', data=>{
            setCoin(data.coin);
         });
         connected.on('second_player',()=>{
            setCoin(null);
            setSecondPlayer(true);
         });
         connected.on('winner_coin', ()=>{
            setCoin(null);
            setFirstPlayer(true);
         });
         connected.on('go_out_player', data=>{
           setOtherGoOutPlayer(true);
           setStartGame(false);
           setUserGoOut(data.user);
           connected.emit('end_game', {uuid: data.uuid});
           setPlayersJoin([]);
           setUpdateList(true);
           setUuid(null);
           setCoin(null);
         });
         connected.on('end_game', ()=>{
            setPlayersJoin([]);
            setUuid(null);
            setUpdateList(true);
            setStartGame(false);
            setMyGame(null);
            setCoin(null);
            setShuffled(false);
            setStateGame(null);
         });
         //updated list of rooms when a user closed your session
         connected.on('removed_uuid',()=>{
            setUuid(null);
            setStartGame(false);
            setMyGame(null);
            setUpdateList(true);
            setCoin(null);
            setShuffled(false);
            setStateGame(null);
         });
         connected.on('game_cancelled', ()=>{
            setUpdateList(true);
            setCoin(null);
            setShuffled(false);
            setStateGame(null);
         });
         connected.on('success_cancelled',()=>{
            setUuid(null);
            setMyGame(null);
            setUpdateList(true);
            setCoin(null);
            setShuffled(false);
            setStateGame(null);
         });
         connected.on('shuffled_deck', data=>{
            setStateGame(data);
            setShuffled(true);
         });
         connected.on('draw_player1',data=>{
            const draftDeck = data.deck;
            const hand = draftDeck.splice(0,3);
            const state =  {
               deck: draftDeck,
               uuid:data.uuid,
               hands: {
                  ...data.hands,
                  player1: hand,
               },
               field: null,
            };
            setStateGame( state );
            connected.emit('drew_player1', {
               ...state
            });
         });
         connected.on('draw_player2', data=>{
            const draftDeck = data.deck;
            const hand = draftDeck.splice(0,3);
            const state = {
               deck: draftDeck,
               uuid: data.uuid,
               hands: {
                  ...data.hands,
                  player2: hand,
               },
               field: null,
            };
            setStateGame( state );
            connected.emit('drew_player2', {
               ...state
            });
         });
         connected.on('end_draw', data=>{
            setStateGame(data);
         });
         connected.on('update_state_game',data=> {
            setStateGame(data);
         });
         
         connected.on('error', (data)=>{
            console.log('error', data.msg, data.event);
         });
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
       myGame,
       coin,
       firstPlayer,
       secondPlayer,
       shuffed,
       stateGame,
    };
    return <GameContext.Provider value={values}>{children}</GameContext.Provider>
}