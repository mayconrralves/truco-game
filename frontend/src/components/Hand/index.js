import React, { useContext, useState } from "react";
import { StyleField } from "../Field/styles";
import { GameContext } from "../GameContext";


export default function Hand ({ deck, setDeck, opponent }){
    const { socket } = useContext(GameContext);
    const [hand, setHand ] = useState(null);
    const drawCard = ()=>{
        const draftDeck = hand;
        setHand(draftDeck.splice(0,3));
        setDeck(Hand);
    }
    return (
            <StyleField>

            </StyleField>
    )
}