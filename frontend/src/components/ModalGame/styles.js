import styled from 'styled-components';

export const ModalGameStyle = styled.div`
    width: 100vw;
    height: 100vh;
    z-index: 1;
    position: absolute;
    top:0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.2);
    div {
        width: 60%;
        height: 55vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: white;
        align-items: center;
        border-radius: 12px;
        label {
                width: 90%;
                font-size: 2em;
                color: rgba(0,0,0,0.6);
                text-align: center;
                margin-bottom: 14px;
            }
        input {
            height: 45px;
            width: 50%;
            color: rgba(0,0,0,0.6);
            margin-top: 0;
            font-size: 1.4em;
            text-align: center;
            border: none;
            border-bottom: solid 1px rgba(0,0,0,0.2);
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            &:focus {
                box-shadow: none;
                border-bottom: solid 2px rgba(0,0,0,0.3);
             }
        }
        div{
            width: 100%;
            height: 10vh;
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-top: 8px;
            button {
                height: 47px;
                width: 32%;
                margin: 0 6px;
                &:focus {
                    outline-color: white;
                    width: 31%;
                    height: 50px;
                }
            }
        }

    }

`;