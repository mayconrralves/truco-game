import React, { useContext } from "react";
import Card from "../Card";
import { StyleField } from "../Field/styles";
import { GameContext } from "../GameContext";


export default function Hand ({ cards, opponent, quantityCardsOpponentHand }){
    const { socket } = useContext(GameContext);
    const printHand = ()=>{
        return cards.map((card, i)=>{
            return (
                <li key={'my_hand_'+ i}>
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
            <StyleField>
                { printVerso() }
            </StyleField>
        )
    }
    return (
            <StyleField>
                {printHand()}
            </StyleField>
    )
}