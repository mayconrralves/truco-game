import React, { useContext, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { GameContext } from '../GameContext';
import ModalGame from "../ModalGame";
export default function Game(){
    const  {setStartGame, setEndGame, endGame } = useContext(GameContext);
    const history = useHistory();
    useEffect(()=>{
        const listen = (location, action)=>{
            if(action === 'POP'){
                setEndGame(true);
            }
            
        }
        
        const clearListen = history.listen(listen);
        return clearListen;
    },[history, setEndGame]);
   
    const leaveGameButton = () => {
        setStartGame(false);
        history.goBack();
    }
    const cancelledButton = ()=> {
        setEndGame(false);
    }
    return (
        <div>
            {endGame && <ModalGame
                                confirm
                                labelDescription='Você quer sair do jogo?'
                                buttonDescription='Sair'
                                onClickButton={leaveGameButton}
                                onClickCancelled={cancelledButton}
                          />
            }
            GameGame
        </div>
    )
}