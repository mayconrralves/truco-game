import React from "react";
import { useParams } from "react-router-dom";
export default function Game(){
    const { room } = useParams();
    console.log(room);
    return (
        <div>Game</div>
    )
}