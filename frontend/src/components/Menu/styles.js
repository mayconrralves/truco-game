import styled from "styled-components";

export const StyleMenu = styled.nav`
    width: 40vw;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
        padding: 20px;
        color: white;
        font-size: 1.2em;
        text-decoration: none;
        &:visited{
            color: white;
        }
        &:hover{
            text-decoration: underline;
        }
    }
    button {
        width: 100px;
        height: 35px;
        color: white;
        text-align: center;
        background-color: red;
        border-radius: 12px;
        font-size: 1.2em;
        border: 0;
        font-weight: bold;
    }
`;