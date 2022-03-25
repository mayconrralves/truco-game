import styled from "styled-components";

export const StyledHeader= styled.header`
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    width: 100%;
    height: 30vh;
    div{
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        h1 {
            color: #a1ff0a;
            width: 300px;
            height: 50px;
            font-size: 3em;
            text-align: center;
        }
    }
    hr {
        border-top: white;
        width: 90%;
        margin: 0;
        
    }
`;
