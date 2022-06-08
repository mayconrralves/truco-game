import React from 'react'
import { printCard } from '../../utils';
import { StyleCard } from './styles';
 
 
export default function Card({ card }) {
    return (
        <StyleCard>
            { <img src={printCard( card )} /> } 
        </StyleCard>
    )
}