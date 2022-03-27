import React from 'react';
import Menu from '../Menu';
import { StyledHeader } from './styles';
export default function Header(){

    return (
        <StyledHeader>
            <div>
                <h1>Truco Mineiro</h1>
                <Menu/>
            </div>
        </StyledHeader>
    )
}