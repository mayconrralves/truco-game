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
            margin: 8px 0;
            padding: 0 20px;
            width: 100%;
            height: 60px;
            border-radius: 5px;
            border: 1px solid rgba(0,0,0, 0.4);
            font-size: 1.3em;
        }
        button {
            width: 100%;
            height: 60px;
            margin-top: 10px;
            border-radius: 8px;
            border: none;
            font-size: 1.4em;
            background-color: #e63946;
            color: white;
            font-size: 1.4em;
            font-weight: bold;
        }
    }
`;