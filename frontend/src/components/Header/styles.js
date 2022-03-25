import styled from "styled-components";

export const StyledHeader= styled.header`
    display: flex;
    flex-direction: column;
    padding: 0 20px;
   
    div{
        width: 100%;
        width: inherit;
        height: inherit;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        h1 {
            color: #a1ff0a;
            width: 300px;
            font-size: 3em;
            text-align: center;
            margin: 60px;
        }

    }
    hr {
        border-top: white;
        width: 90%;
        
    }
`;
