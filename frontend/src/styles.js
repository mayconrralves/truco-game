import { createGlobalStyle } from 'styled-components';

export const  GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        box-sizing: border-box;
        padding: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(40,41,43,1) 100%);
    }
`;