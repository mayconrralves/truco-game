import React, { useContext, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { GameContext } from '../GameContext';
import { AuthContext } from '../AuthContext';
import ModalGame from "../ModalGame";
export default function Game(){
    const  {
        uuid,
        setStartGame, 
        setGoOutGame, 
        goOutGame,
        otherGoOutPlayer,
        userGoOut,
        startGame, 
        socket
     } = useContext(GameContext);
     
    const { user } = useContext(AuthContext);
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
    return (
        <div>
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