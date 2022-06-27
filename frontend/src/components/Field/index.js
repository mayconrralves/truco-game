import React, {  useState, useEffect } from "react";
import Card from "../Card";
import { StyleField } from "./styles";

export default function Field ({ socket, firstPlayer, secondPlayer, stateGame, currentMove }){

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

    if(currentMove){
        return (
            <StyleField
                onDragOver={onDragOver}
                onDrop={handleDrop}
            >
               { currentCard  && <Card card={ currentCard } /> }
            </StyleField>
        )

    } 
        return(
            <StyleField>
                {  currentCard && <Card card={ currentCard} /> }
            </StyleField>
        )
    
}