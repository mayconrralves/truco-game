import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { GameContext } from '../GameContext';
import { AuthContext } from '../AuthContext';
import ModalGame from "../ModalGame";
import SelectCoin from "../SelectCoin";
import Hand from "../Hand";
import Field from "../Field";
import { buildDeck } from "../../utils";
export default function Game(){
    const  {
        uuid,
        setStartGame, 
        setGoOutGame, 
        goOutGame,
        otherGoOutPlayer,
        userGoOut,
        startGame,
        myGame,
        socket,
        coin: coinOpponent,
        secondPlayer,
        firstPlayer,
        playersJoin,
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
               game: {
                    deck,
                    hands: {
                        player1: null,
                        player2: null,
                    },
                    field: null,
                    uuid,
               },
               firstPlayer,
            });
    }
    //if a player leaves of game
    const returnConfigGame=()=>{
        history.goBack();
    }
    const cancelledButton = ()=> {
        setGoOutGame(false);
    }
    const selectCoin = (coin)=> {
        setCoin(coin);
        socket.emit('choose_coin', {
            coin,
            uuid,
        })
    }
    return (
        <div>
            {
                (openModalPlayer && firstPlayer) && <ModalGame 
                labelDescription='Você irá começar'
                onClickButton={ start }
                buttonDescription='Ok'
            />
            }
             {
                (openModalPlayer && secondPlayer) && <ModalGame 
                labelDescription={`${
                                        playersJoin[0].name.toUpperCase()} 
                                        venceu na moeda. Você será o Segundo a jogar`
                                    }
                onClickButton={ ()=> setOpenModalPlayer(false) }
                buttonDescription='Ok'
            />
            }
            {
                (startGame && coin && !myGame) && <ModalGame 
                    labelDescription={`Seu lado da moeda é ${coin}`}
                    onClickButton={()=> setCoin(null) }
                    buttonDescription='Ok'
                />
            }
             {(startGame && myGame && !coin) && <ModalGame 
                                                labelDescription={'Escolhar par ou Impar'}
                                                component={<SelectCoin  onSelectCoin={selectCoin}/>}
                                            />
            }
            {otherGoOutPlayer && <ModalGame  
                                labelDescription={`${userGoOut} saiu da sala.`}
                                buttonDescription='Sair'
                                onClickButton={returnConfigGame}
                          />
            }
            {(startGame && goOutGame) && <ModalGame
                                labelDescription='Você quer sair do jogo?'
                                buttonDescription='Sair'
                                onClickButton={goOutGameButton}
                                onClickCancelled={cancelledButton}
                          />
            }
            {(firstPlayer || secondPlayer) && <Hand opponent/>}
            {(firstPlayer || secondPlayer) && <Field />}
            {(firstPlayer || secondPlayer) && <Hand />}
        </div>
    )
}