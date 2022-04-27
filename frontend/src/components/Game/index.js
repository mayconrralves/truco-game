import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GameContext } from '../GameContext';
export default function Game(){
    const  {setStartGame} = useContext(GameContext);
    const navigate = useNavigate();
    const { room } = useParams();
    
    useEffect(()=>{
        //capture an event when back button is clicked
        window.onpopstate = function (event){
            setStartGame(false);
            //navigate(-1);
        }
    },[navigate, setStartGame]);
    return (
        <div>Game</div>
    )
}