import React, { useContext } from "react";
import { GameContext } from "../GameContext";

export default function MyGame(){
     const { myGame, socket } = useContext(GameContext);
     const cancelledGame = ()=>{
         console.log('cancelled')
         socket.emit('cancelled_game');
     }
    return (
              <div>
                  <span>Meu jogo: {myGame.name}</span>
                  <button onClick = {cancelledGame }>Cancelar</button>
              </div>
    )
}