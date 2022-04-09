import React, {useContext, useEffect, useState} from 'react'

import { AuthContext } from '../AuthContext'; 
import { connect, initGame, listGames } from '../../services/socket';
import ListGames from '../ListGames';

export default function ConfigGame(){
    const [ uuid, setUuid] = useState(null);
    const { user } = useContext(AuthContext);
    const [ games, setGames ] = useState([]);
    const [connected, setConnected ] = useState(false);
    useEffect(()=>{
        connect(setConnected);
    },[]);

    const getUuid = (uuid)=>{
        setUuid(uuid);
    }
    const listActiveGames= (data)=> {
        if(data.games && data.games.length){
            setGames(data.games);
        }
    }
    return (
        <>
        <button onClick={()=>initGame(getUuid, user.id, user.name)}>click</button>
        <button onClick={()=>listGames(listActiveGames)}>list</button>
         {
            connected && <ListGames games={games} setGames={setGames}/>
         }
        </>
    );
}