import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { GameContext } from '../GameContext';
import { AuthContext } from '../AuthContext';
import ModalGame from "../ModalGame";
import SelectCoin from "../SelectCoin";
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
        socket
     } = useContext(GameContext);
     
    const { user } = useContext(AuthContext);
    const [ coin, setCoin ] = useState(null);
    const history = useHistory();
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
    //if a player leaves of game
    const returnConfigGame=()=>{
        history.goBack();
    }
    const cancelledButton = ()=> {
        setGoOutGame(false);
    }
    const selectCoin = (coin)=> {
        setCoin(coin)
    }
    return (
        <div>
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
            GameGame
        </div>
    )
}