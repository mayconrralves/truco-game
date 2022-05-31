import React, { useContext } from "react";
import { GameContext } from "../GameContext";
import {StyleMyGame } from "./styles";
export default function MyGame(){
     const { myGame, socket } = useContext(GameContext);

     const cancelledGame = ()=>{
         socket.emit('cancelled_game');
     }

    return (
              <StyleMyGame>
                  <span><strong>Meu jogo:</strong> {myGame.name}</span>
                  <button onClick = { cancelledGame }>Cancelar</button>
              </StyleMyGame>
    )
}