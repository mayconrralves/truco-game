import React from 'react';
import { ModalGameStyle } from './styles';

export default function ModalGame({  
                                        placeholder, 
                                        onChangeInput,
                                        onClickCancelled,
                                        onClickButton, 
                                        buttonDescription, 
                                        labelDescription,
                                        component
                                  }){ 
    
    return (
        <ModalGameStyle >
            <div>
                { labelDescription && <label>{labelDescription}</label> }
                { component }
                { onChangeInput && <input onChange={ onChangeInput } placeholder={placeholder} /> }
                <div>
                     {buttonDescription && <button onClick={ onClickButton }>{ buttonDescription }</button>}
                      { onClickCancelled && <button onClick={ onClickCancelled }>Cancelar</button>}
                </div>
            </div>
        </ModalGameStyle>
    )
}