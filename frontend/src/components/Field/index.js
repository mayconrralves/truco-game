import React, { useContext, useState } from "react";
import Card from "../Card";
import { GameContext } from '../GameContext';
import { StyleField } from "./styles";

export default function Field ({card}){
    const { 
        socket,
        firstPlayer, 
        secondPlayer,
        stateGame,
    } = useContext(GameContext);
    const [currentCard, setCurrentCard ] = useState(null);
    const handleDrop = event => {
        const data = event.dataTransfer.getData('text/plain');
        try{
            const c = JSON.parse(data);
            setCurrentCard( c );
        }catch(e){ }
    }
    const onDragOver = event => {
        event.preventDefault(); 
        event.stopPropagation(); 
        return false;
    }
    const chooseCard = ()=> {
        if(card ) return card;
        if(currentCard) return currentCard;
    }
    return (
        <StyleField
            onDragOver={onDragOver}
            onDrop={handleDrop}
        >
           { ( card || currentCard ) && <Card card={ chooseCard() } /> }
        </StyleField>
    )
}