import React, { useState } from 'react';
import { ModalGameStyle } from './styles';

export default function ModalGame({ setNameRoom, setOpenModal, initGame }){

    const [room, setRoom ] = useState(null);

    const onChangeUsername = (event)=>{
        setRoom(event.target.value);
    }
    const onClickButton = ()=> {
       setNameRoom(room);
       setOpenModal(false);
       initGame();
    }
    return (
        <ModalGameStyle >
            <div>
                <input onChange={ onChangeUsername } placeholder='Nome da sala'/>
                <button onClick={onClickButton}>Adiciona nome</button>
            </div>
        </ModalGameStyle>
    )
}