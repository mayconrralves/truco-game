import React, { useState } from "react";
import Card from "../Card";
import { StyleHand } from "./styles";


export default function Hand ({ cards, opponent, quantityCardsOpponentHand }){
    const [ opacity,  setOpacity ] = useState('1');
    const onHandleDragStart = (event, card) => {
        setOpacity('0.4');
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', JSON.stringify(card));
    }
    const onHandleDragEnd = event => {
        setOpacity('1');
    }

    const printHand = ()=>{
        return cards.map((card, i)=>{
            return (
                <li key={'my_hand_'+ i}
                    opacity={ opacity } 
                    draggable={ true }
                    onDragStart={event=>onHandleDragStart(event, card)} 
                    onDragEnd={onHandleDragEnd}
                >
                    <Card card={card} />
                </li>
            )
        });
    }
    const printVerso = ()=> {
        const list = [];
        for(let i=0; i< quantityCardsOpponentHand; i++){
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
            <StyleHand>
                { printVerso() }
            </StyleHand>
        )
    }
    return (
            <StyleHand opacity={opacity} >
                { printHand() }
            </StyleHand>
    )
}