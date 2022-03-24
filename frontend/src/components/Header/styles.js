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
            width: 250px;
            font-size: 2.5em;
            text-align: center;
        }

    }
    hr {
        border-top: white;
        width: 90%;
        
    }
`;
