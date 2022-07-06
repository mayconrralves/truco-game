import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { GameContext } from '../GameContext';
import { AuthContext } from '../AuthContext';

import Hand from "../Hand";
import Field from "../Field";
import { buildDeck } from "../../utils";
import { StyleGame } from "./styles";
import ConfigModalGame from "../ConfigModalGame";

export default function Game(){
    const  {
        uuid,
        setStartGame, 
        setGoOutGame, 
        socket,
        coin: coinOpponent,
        secondPlayer,
        firstPlayer,
        stateGame,
        currentMove
     } = useContext(GameContext);
     
    const { user } = useContext(AuthContext);
    const [ coin, setCoin ] = useState(null);
    const [openModalPlayer, setOpenModalPlayer] = useState(true);
    const history = useHistory();
    useEffect(()=>{
        if(coinOpponent){
            setCoin(coinOpponent);
            socket.emit('what_winner_coin', {
                coin: coinOpponent,
                uuid,
            });
        }
    },[coinOpponent, uuid, socket]);
    
    useEffect(()=>{
        const listen = (location, action)=>{
            if(action === 'POP'){
                setGoOutGame(true);
            }
        }
        const clearListen = history.listen(listen);
        return clearListen;
    },[history, setGoOutGame]);
  
    const goOutGameButton = () => {
        setStartGame(false);
        socket.emit('go_out_player', {
            uuid,
            user: user.name,
        });
        history.goBack();
    }
    const start = ()=>{
        setOpenModalPlayer(false);
        const deck = buildDeck();
            socket.emit('shuffled_deck', {
                    deck,
                    hands: {
                        player1: null,
                        player2: null,
                    },
                    scores: {
                        player1: {
                            match: 0,
                            game: 0,
                            winFirst: false,
                        },
                        player2: {
                            match: 0,
                            game: 0,
                            winFirst: false,
                        },
                    },
                    field: null,
                    uuid,
                    firstPlayer,
            });
    }
    //if a player leaves of game
    const returnConfigGame=()=>{
        history.goBack();
    }
    const selectCoin = (coin)=> {
        setCoin(coin);
        socket.emit('choose_coin', {
            coin,
            uuid,
        })
    }
    const handPlayer = () => {
        if(firstPlayer){
            return stateGame.hands.player1;
        }
        else {
            return stateGame.hands.player2;
        }
    }
    const lengthHandOpponent = ()=> {
        if(secondPlayer){
            return stateGame.hands.player1?.length || 0;
        } else {
            return stateGame.hands.player2?.length || 0;
        }
    }
    const updateHand = (playerHand, currentCard) => {
        const hand =  playerHand.filter(
             (card)=> !(card.number === currentCard.number && 
                 card.naipe === currentCard.naipe)
        );
             return hand;
     }
    
    return (
        <StyleGame>
            <ConfigModalGame 
                    coin={coin} 
                    selectCoin={selectCoin} 
                    openModalPlayer={openModalPlayer}
                    returnConfigGame={returnConfigGame}
                    goOutGameButton={goOutGameButton}
                    start={start}
                    setGoOutGame={setGoOutGame}
                    firstPlayer={firstPlayer}
                    secondPlayer={secondPlayer}
                    setCoin={setCoin}
                    setOpenModalPlayer={setOpenModalPlayer}
            />
            {(stateGame?.hands.player1 || stateGame?.hands.player2)  && <>
                    <Hand 
                        opponent 
                        quantityCardsOpponentHand={lengthHandOpponent()}
                        currentMove={currentMove}
                    />
                    <Field 
                        socket={socket}
                        firstPlayer={firstPlayer}
                        secondPlayer={secondPlayer}
                        currentMove={currentMove}
                        stateGame={stateGame}
                        updateHand={updateHand}
                    />
                    <Hand cards={handPlayer()} currentMove={currentMove} />
                </>
            }
          
        </StyleGame>
    )
}