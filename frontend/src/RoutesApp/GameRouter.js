import { Routes, Route } from 'react-router-dom';
import ConfigGame from '../components/ConfigGame';
import Game from   '../components/Game';

export default function GameRouter(){
    return (
        <Routes>
            <Route path='/' element={ <ConfigGame /> } />
            <Route path=':room' element={ <Game /> } />
        </Routes>
    )
}