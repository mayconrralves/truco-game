import styled from "styled-components";

export const LoginStyle = styled.div`
    width: 100%;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    form {
        display: flex;
        width: 50%;
        flex-direction: column;
        align-items: center;
        justify-content: center;


        input {
            height: 60px;
        }
        button {
            width: 100%;
            height: 60px;
            margin-top: 10px;
            font-size: 1.4em;
            
        }
    }
`;