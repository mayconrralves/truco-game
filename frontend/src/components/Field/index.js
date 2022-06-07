import React, { useContext } from "react";
import { GameContext } from '../GameContext';
import { StyleField } from "./styles";

export default function Field (){
    const { 
        socket,
        firstPlayer, 
        secondPlayer,
        stateGame,
    } = useContext(GameContext);

    return (
        <StyleField>
            
        </StyleField>
    )
}