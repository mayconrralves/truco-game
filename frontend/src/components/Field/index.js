import React, {useEffect, useState} from 'react'
import { connect, initGame, disconnect } from '../../services/socket';
import { buildDeck } from '../../utils';

export default function Field() {
    const [ uuid, setUuid] = useState(null);
    useEffect(()=>{
        connect();
        return disconnect;
    },[]);

    const getUuid = (uuid)=>{
        setUuid(uuid);
    }
    return <button onClick={()=>initGame(getUuid)}>click</button>
}