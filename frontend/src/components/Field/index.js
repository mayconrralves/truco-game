import React, {useEffect} from 'react'
import { connect, initGame } from '../../services';
import { buildDeck } from '../../utils';
 
export default function Field() {
    useEffect(()=>{
        connect();
    },[]);
    return <button onClick={initGame}>click</button>
}