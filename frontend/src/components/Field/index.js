import React, {  useState, useEffect } from "react";
import Card from "../Card";
import { StyleField } from "./styles";

export default function Field ({ socket, firstPlayer, secondPlayer, stateGame, currentMove, updateHand }){

    const [currentCard, setCurrentCard ] = useState(null);
    useEffect(()=>{
        if(stateGame?.field){
            setCurrentCard(stateGame.field);
        }
    }, [ stateGame ] );
    const winFirst = (player1, opponent)=>{
        if(player1.match === 0 && opponent.match === 0){
           return true;
        }
        return false;
    }
    const handleDrop = event => {
        const data = event.dataTransfer.getData('text/plain');
        try{
            const c = JSON.parse(data);
            setCurrentCard( c );
            const { hands, uuid } = stateGame;
            if(firstPlayer){
                socket.emit('next_move', { 
                    game: {
                        ...stateGame,
                        uuid,
                        field: c,
                        hands: {
                            ...hands,
                            player1:  updateHand(hands.player1, c),
                        },
                    },
                    next: false,
                });
            } else if(secondPlayer){
                const { player1, player2 } = stateGame.scores;
                //define who is next
                let next = false;
                if(c.rank > currentCard.rank){
                    if(winFirst(stateGame.scores.player2, stateGame.scores.player1)){
                        stateGame.scores.player2.winFirst = true;
                    }
                    stateGame.scores.player2.match++;
                    next = true;
                } 
                else if(c.rank < currentCard.rank){
                    if(winFirst(stateGame.scores.player1, stateGame.scores.player2)){
                        stateGame.scores.player1.winFirst = true;
                    }
                    stateGame.scores.player1.match++;
                } 
                else {
                    if( player1.winFirst ){
                        player1.match++;
                    }else if( player2.winFirst ){
                        player2.match++;
                    }
                }
                socket.emit('next_move', {
                    game: {
                        ...stateGame,
                        uuid,
                        field: c,
                        hands: {
                            ...hands,
                            player2: updateHand(hands.player2, c),
                        },
                        scores: {
                            ...stateGame.scores,
                            player1,
                            player2
                        }
                    },
                    next,
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
                {  currentCard && <Card card={ currentCard } /> }
            </StyleField>
        )
    
}