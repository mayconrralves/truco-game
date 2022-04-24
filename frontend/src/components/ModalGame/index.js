import React from 'react';
import { ModalGameStyle } from './styles';

export default function ModalGame({ setNameRoom, setOpenModal, initGame }){
   
    const onChangeUsername = (event)=>{
        setNameRoom(event.target.value);
    }
    
    const onClickButton = ()=> {
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