import React, {useContext, useEffect, useState} from 'react'
import { connect, initGame, disconnect,listGames } from '../../services/socket';
import { buildDeck } from '../../utils';
import { AuthContext } from '../AuthContext'; 

export default function Field() {
    const [ uuid, setUuid] = useState(null);
    const { user } = useContext(AuthContext);
    useEffect(()=>{
        connect();
        return disconnect;
    },[]);

    const getUuid = (uuid)=>{
        setUuid(uuid);
    }
    const listActiveGames= (data)=> {
        console.log(data);
    }
    return (
        <>
            <button onClick={()=>initGame(getUuid, user.id)}>click</button>
            <button onClick={()=>listGames(listActiveGames)}>click</button>
        </>
    )
}