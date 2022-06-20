import React, { useContext, useState, useEffect } from "react";
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
    useEffect(()=>{
        if(stateGame?.field){
            setCurrentCard(stateGame.field);
        }
    }, [ stateGame ] );
    const updateHand = (playerHand, currentCard) => {
       const hand =  playerHand.filter(
            (card)=> !(card.number === currentCard.number && 
                card.naipe === currentCard.naipe)
       );
            return hand;
    }
    const handleDrop = event => {
        const data = event.dataTransfer.getData('text/plain');
        try{
            const c = JSON.parse(data);
            setCurrentCard( c );
            const { hands, uuid } = stateGame;
            if(firstPlayer){
                socket.emit('next_move', { 
                    uuid,
                    field: c,
                    hands: {
                        ...hands,
                       player1:  updateHand(hands.player1, c),
                    }
                });
            } else if(secondPlayer){
                socket.emit('next_move', {
                    uuid,
                    field: c,
                    hands: {
                        ...hands,
                        player2: updateHand(hands.player2, c),
                    } 
               });
            }
        }catch(e){
            console.error(e);
         }
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