import React from 'react';
import { ModalGameStyle } from './styles';

export default function ModalGame({ 
                                        confirm, 
                                        placeholder, 
                                        setState,
                                        onClickCancelled,
                                        onClickButton, 
                                        buttonDescription, 
                                        labelDescription 
                                                        }){
   
    const onChangeInput = (event)=>{
        setState(event.target.value);
    };
    
    
    return (
        <ModalGameStyle >
            <div>
                { confirm && <label>{labelDescription}</label> }
                { !confirm && <input onChange={ onChangeInput } placeholder={placeholder} /> }
                <div>
                      <button onClick={ onClickButton }>{ buttonDescription }</button>
                      { confirm && <button onClick={ onClickCancelled }>Cancelar</button>}
                </div>
            </div>
        </ModalGameStyle>
    )
}