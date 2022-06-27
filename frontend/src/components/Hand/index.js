import React, { useState } from "react";
import Card from "../Card";
import { StyleHand } from "./styles";


export default function Hand ({ cards, opponent, quantityCardsOpponentHand, currentMove }){
    const [selectCard, setSelectCard ] = useState(null);
    const onHandleDragStart = (event, card, id) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', JSON.stringify(card));
        setSelectCard(id);
    }
    const onHandleDragEnd = event => {
        setSelectCard(null);
    }
  

    const printHand = ()=>{
        return cards.map((card, i)=>{
            const idCard = 'my_hand_'+ i;
            if(currentMove){
               return (
                <li key={idCard}
                    id={idCard}
                    draggable={ true }
                    onDragStart={event=>onHandleDragStart(event, card, idCard)} 
                    onDragEnd={onHandleDragEnd}
                >
                    <Card card={card} />
                </li>
               )
            }
            return (
                <li key={idCard}
                    id={idCard}
                >
                    <Card card={card} />
                </li>
            )
        });
    }
    const printVerso = ()=> {
        const list = [];
        for(let i=0; i < quantityCardsOpponentHand; i++){
            list.push(
                        <li key={'opponent_hand_'+i}>
                            <Card card='verso' />
                        </li>
            );
        }
        return list;
    }
   
    if(opponent){
        return (
            <StyleHand >
                { printVerso() }
            </StyleHand>
        )
    }
    return (
            <StyleHand id_card={selectCard} >
                { printHand() }
            </StyleHand>
    )
}