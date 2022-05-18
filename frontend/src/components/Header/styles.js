import styled from "styled-components";

export const StyledHeader= styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid rgba(0,0,0, 0.2);
    padding: 12px 0;
    div{
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        h1 {
            width: 350px;
            font-size: 2.5em;
            text-align: center;
        }
    }
`;
