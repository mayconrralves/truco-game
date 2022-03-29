import { createGlobalStyle } from 'styled-components';

export const  GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    body {
       
        width: 100vw;
        height: 100vh;
        background: white;
    }
    a {
        color: #54595F;
        &:visited {
            color: #54595F;
        }
        &:hover{
            text-decoration: underline;
        }
    }
    input {
        color: #54595F;
        border-radius: 5px;
        border: 1px solid rgba(0,0,0, 0.1);
        font-size: 1.4em;
        margin: 8px 0;
        padding: 0 20px;
        width: 100%;
        &:focus {
            outline: none;
            border: 1px solid rgba(0,0,0, 0.5);
            box-shadow: 2px 2px rgba(0,0,0, 0.2);
        }
    }
    button {
        background-color: #e63946;
        color: white;
        font-size: 1.4em;
        font-weight: bold;
        border-radius: 5px;
        border: none;
    }
    h1, h2, h3 {
        color: #54595F;
    }
`;