import React, { useContext } from "react";
import { GameContext } from "../GameContext";
import ModalGame from "../ModalGame";
import SelectCoin from "../SelectCoin";
export default function ConfigModalGame({ 
                                            openModalPlayer, 
                                            coin, 
                                            selectCoin,  
                                            returnConfigGame, 
                                            goOutGameButton,
                                            setGoOutGame,
                                            firstPlayer,
                                            start,
                                            secondPlayer,
                                            setOpenModalPlayer,
                                            setCoin
                                        }){
    const {
        goOutGame,
        otherGoOutPlayer,
        userGoOut,
        startGame,
        myGame,
        playersJoin,
    } = useContext(GameContext);
    const cancelledButton = ()=> {
        setGoOutGame(false);
    }
    return <>
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
                                        playersJoin[0].user.toUpperCase()} 
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
    
    </>
}