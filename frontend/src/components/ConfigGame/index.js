import React, {useContext, useEffect, useState } from 'react'
import { AuthContext } from '../AuthContext'; 
import { GameContext } from '../GameContext';
import ListGames from '../ListGames';
import { ConfigGameStyle } from './styles';


const emitEventListCreatedGames = (socket, uuid)=>{
    socket.emit('list_created_games', { uuid });
}
export default function ConfigGame(){
    const { user } = useContext(AuthContext);
    const { socket, uuid, games, connection } = useContext(GameContext);
    const [loaded, setLoaded] = useState(false);
    console.log(uuid)
    useEffect(()=>{
        if(connection && !loaded){ 
            setLoaded(true);
        } else if(loaded ) {
            console.log('teste')
            emitEventListCreatedGames(socket, uuid);
        }
        
    }, [connection, loaded]);
    
    const initGame = () =>{
        socket.emit('create_game', {
            id: user.id,
            name: user.name
        });
    }
    return (
        <ConfigGameStyle o>
            <h2>Salas</h2>
           { !uuid && <button onClick={initGame}>Criar uma sala</button>}
            <div className='list-games'>
                {loaded && <ListGames games={games} update={()=>emitEventListCreatedGames(socket)}/>}
            </div>
        </ConfigGameStyle>
    );
}