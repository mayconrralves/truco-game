import styled from "styled-components";

export const StyledHeader= styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid rgba(0,0,0, 0.2);
    div{
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        h1 {
            color: #54595F;
            width: 300px;
            font-size: 3em;
            text-align: center;
        }
    }
`;
