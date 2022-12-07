import React, { useContext, useState, useEffect } from "react";
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
  setCoin,
}) {
  const {
    goOutGame,
    otherGoOutPlayer,
    userGoOut,
    startGame,
    myGame,
    playersJoin,
    startMatch,
    winMatch,
    loseMatch,
  } = useContext(GameContext);
  const [matchModal, setMatchModal] = useState(true);
  const [openWarning, setOpenWarning] = useState(true);
  const openMatchModal = () => {
    if (matchModal && !matchModal) return;
    setTimeout(() => {
      setMatchModal(false);
    }, 1000);
  };

  useEffect(() => {
    if (!startMatch) {
      setMatchModal(true);
    }
  }, [startMatch]);
  useEffect(() => {
    if (coin) {
      setOpenWarning(false);
    }
  }, [coin]);

  const cancelledButton = () => {
    setGoOutGame(false);
    setMatchModal(false);
  };
  const closeWarning = () => {
    setOpenWarning(false);
  };
  return (
    <>
      {openModalPlayer && firstPlayer && !startMatch && (
        <ModalGame
          labelDescription="Você irá começar"
          onClickButton={start}
          buttonDescription="Ok"
        />
      )}
      {openModalPlayer && secondPlayer && !startMatch && (
        <ModalGame
          labelDescription={`${playersJoin[0].user?.toUpperCase()} 
                                        venceu na moeda. Você será o Segundo a jogar`}
          onClickButton={() => setOpenModalPlayer(false)}
          buttonDescription="Ok"
        />
      )}
      {startGame && coin && !myGame && !goOutGame && (
        <ModalGame
          labelDescription={`Seu lado da moeda é ${coin}`}
          onClickButton={() => setCoin(null)}
          buttonDescription="Ok"
        />
      )}
      {startGame && myGame && !coin && !startMatch && (
        <ModalGame
          labelDescription={"Escolhar par ou Impar"}
          component={<SelectCoin onSelectCoin={selectCoin} />}
        />
      )}
      {startGame && !myGame && openWarning && !coin && !startMatch && (
        <ModalGame
          labelDescription={"Seu oponente está escolhendo a moeda"}
          onClickButton={closeWarning}
          buttonDescription="Ok"
        />
      )}
      {otherGoOutPlayer && (
        <ModalGame
          labelDescription={`${userGoOut} saiu da sala.`}
          buttonDescription="Sair"
          onClickButton={returnConfigGame}
        />
      )}
      {startGame && goOutGame && (
        <ModalGame
          labelDescription="Você quer sair do jogo?"
          buttonDescription="Sair"
          onClickButton={goOutGameButton}
          onClickCancelled={cancelledButton}
        />
      )}
      {startMatch && matchModal && !goOutGame && (
        <ModalGame
          labelDescription="Iniciando Match"
          callback={openMatchModal}
        />
      )}

      {winMatch && <ModalGame labelDescription={"Você ganhou o Match"} />}
      {loseMatch && <ModalGame labelDescription={"Você Perdeu o Match"} />}
    </>
  );
}
