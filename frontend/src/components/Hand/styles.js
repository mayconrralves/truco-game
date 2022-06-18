import styled from "styled-components";

export const StyleHand = styled.ul`
    width: 80vw;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    list-style-type: none;
    li {
        width: auto;
        height: auto;
        opacity: ${props=>props.opacity};
    }
`;