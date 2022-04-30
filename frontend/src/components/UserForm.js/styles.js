import styled from "styled-components";

export const UserFormStyle = styled.main`
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    form {
        display: flex;
        flex-direction: column;
        width: 50%;
        height: 70vh;
        justify-content: center;
        span {
            color: red;
            font-size: 1em;
            text-align: center;
        }
        input {
            height: 60px;
        }
        button {
            height: 60px;
            border: none;
            border-radius: 5px;
            margin-top: 20px;
            font-size: 1.2em;
        }
        
    }
`;