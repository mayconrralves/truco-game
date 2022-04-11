import React, {useContext, useEffect, useState } from 'react'
import { AuthContext } from '../AuthContext'; 
import { GameContext } from '../GameContext';
import ListGames from '../ListGames';

export default function ConfigGame(){
    const { user } = useContext(AuthContext);
    const { socket, uuid, games } = useContext(GameContext);
    const [loaded, setLoaded ] = useState(false);
    useEffect(()=>{
        console.log('executou')
        if(!loaded) socket.emit('list_created_games');
        else setLoaded(true);
    
    }, [loaded]);
 

    const initGame = () =>{
        socket.emit('create_game', {
            id: user.id,
            name: user.name
        });
    }
    console.log(games);
    return (
        <>
            <button onClick={initGame}>click</button>
         {
           // connected && <ListGames games={games} />
         }
        </>
    );
}