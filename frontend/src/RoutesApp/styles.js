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
    }
`;