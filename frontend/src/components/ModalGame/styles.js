import styled from 'styled-components';

export const ModalGameStyle = styled.div`
    width: 100vw;
    height: 100vh;
    z-index: 1;
    position: absolute;
    display: flex;
    justify-content: center;
    background-color: rgba(0,0,0,0.2);
    div {
        width: 60%;
        height: 35vh;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: white;
        align-items: center;
        border-radius: 12px;
        input {
            height: 45px;
            width: 50%;
            color: rgba(0,0,0,0.6);
            font-size: 1.4em;
            border: none;
            border-bottom: solid 1px rgba(0,0,0,0.2);
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            &:focus {
                box-shadow: none;
                border-bottom: solid 2px rgba(0,0,0,0.3);
             }
        }
        button {
            height: 60px;
            width: 40%;
            &:focus {
                outline-color: white;
                width: 38%;
                height: 57px;
            }
        }

    }

`;