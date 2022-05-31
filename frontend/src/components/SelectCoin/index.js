import React from "react";
import {StyleSelectCoin } from './styles';

export default function SelectCoin({ onSelectCoin }){
    return(
        <StyleSelectCoin>
            <label onClick={() => onSelectCoin('heads')}>Cara</label>
            <label onClick={()=> onSelectCoin('tails')}>Coroa</label>
        </StyleSelectCoin>
    ) 
}